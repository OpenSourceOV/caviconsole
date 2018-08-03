'use strict';
module.exports = (app, configModule, io) => {

  var dateFormat = require('dateformat');
  var fsModule = require(app.paths.modules + '/fs')(app);
  var fs = require('fs');
  var csv = require('csv-parser');
  var ini = require('ini');
  var path = require("path");
  var { spawn } = require('child_process');
  
  var module = {}

  app.set('capturing', false);

  module.captureProc = false
  
  module.initSocket = (socket) => {
    socket.on('capture:start', function() {
      module.startCapture();
    })

    socket.on('capture:stop', function() {
      module.stopCapture();
    })

    socket.on('capture:status', function() {
      io.emit('capture:status', app.get('capturing'));
    })

  }  

  module.startCapture = () => {

    module.iniWritten = false

    console.log("Starting capture...");

    var args = [
      "-u", '/home/pi/cavicapture/cavicapture.py', "--config", configModule.configFilePath
    ];

    app.set('capturing', true);
    io.emit('capture:started');

    module.captureProc = spawn("python", args);

    module.captureProc.stdout.on('data', function(data) {
      data = String(data).replace(/[\n\r]+/g, '');
      let dataPart = data.split("|");
      if(dataPart.length >= 2) {
        let dataType = dataPart[0];
        let dataValue = dataPart[1];
        io.emit(`capture:${dataType.trim()}`, dataValue);
        // if(module.iniWritten == false) {
        //   configModule.updateConfig(app.caviConfig, `${app.caviConfig.sequencePath}/config.ini`);
        //   module.iniWritten = true;
        // }
      }
    });

    module.captureProc.stderr.on('data', function(data) {
      console.log("Capture stopped.");
      io.emit('capture:finished');
      app.set('capturing', false);
      io.emit('capture:error', String(data).replace(/[\n\r]+/g, ''));
      console.log(`stderr: ${data}`);
    });

    module.captureProc.on('close', function (code) {
      console.log("Capturing finished.");
      io.emit('capture:finished');
      app.set('capturing', false);
      io.emit('capture:info', `child process exited with code ${code}`);
    });
  }

  module.stopCapture = () => {
    if(module.captureProc) {
      console.log("Stopping capture...");
      module.captureProc.kill('SIGINT');
      app.set('capturing', false);
      io.emit('capture:finished');
    }
  }

  module.getCaptureImagePath = (filename) => {
    let sequenceFolder = `${app.caviConfig.capture.output_dir}/${app.caviConfig.capture.sequence_name}`
    return path.resolve(sequenceFolder + '/' + filename);
  }

  module.getProcessedImagePath = (filename) => {
    let sequenceFolder = `${app.caviConfig.capture.output_dir}/${app.caviConfig.capture.sequence_name}`
    return path.resolve(sequenceFolder + '/processed/' + filename);
  }

  return module;
};
