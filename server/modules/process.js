'use strict';
module.exports = (app, configModule, io) => {

  var dateFormat = require('dateformat');
  var fs = require('fs');
  var csv = require('csv-parser');
  var ini = require('ini');
  var path = require("path");
  var { spawn } = require('child_process');

  var module = {}

  app.set('processing', false);

  module.processProc = false
  
  module.initSocket = (socket) => {
    socket.on('process:start', function() {
      module.startProcessing();
    })
    socket.on('process:reprocess', function() {
      module.startReprocessing();
    })
    socket.on('process:reprocess:areas', function() {
      module.startReprocessingAreas();
    })

    socket.on('process:stop', function() {
      module.stopProcessing();
    })
    socket.on('process:status', function() {
      io.emit('process:status', app.get('processing'));
    })
  }  
  module.startReprocessingAreas = () => {
    console.log("Starting reprocessing areas...");
    let args = ["--roiareas"]
    io.emit('reprocessing:started');
    if(app.get('processing')) {
      module.stopProcessing();
      setTimeout(() => {
        module.startProcessing(args);
      }, 2000);
    } else {
      module.startProcessing(args);
    }  
  }

  module.startProcessing = (addArgs) => {

    console.log("Starting processing...");

    var args = [
      "-u", app.caviConfig.process.processor, "--config", configModule.configFilePath
    ];
    
    if(addArgs) {
      args = args.concat(addArgs);
    }

    app.set('processing', true);
    io.emit('process:started');

    module.processProc = spawn("python", args);

    module.processProc.stdout.on('data', function(data) {
      data = String(data).replace(/[\n\r]+/g, '');
      let dataPart = data.split("|");
      if(dataPart.length >= 2) {
        let dataType = dataPart[0];
        let dataValue = dataPart[1];
        io.emit(`process:${dataType.trim()}`, dataValue);
        // if(module.iniWritten == false) {
        //   configModule.updateConfig(app.caviConfig, `${module.sequencePath}/config.ini`);
        //   module.iniWritten = true;
        // }
      }
    });

    module.processProc.on('close', function (code) {
      console.log("Processing finished");
      io.emit('process:finished');
      app.set('processing', false);
      io.emit('process:info', `child process exited with code ${code}`);
    });
    module.processProc.stderr.on('data', function(data) {
      io.emit('process:finished');
      app.set('processing', false);
      io.emit('process:error', String(data).replace(/[\n\r]+/g, ''));
      console.log(`stderr: ${data}`);
    });
    
  }

  module.startReprocessing = () => {
    console.log("Starting reprocessing...");
    io.emit('reprocessing:started');
    let args = ["--reprocess"]
    if(app.get('processing')) {
      module.stopProcessing();
      setTimeout(() => {
        module.startProcessing(args);
      }, 2000);
    } else {
      module.startProcessing(args);
    }
  }

  module.stopProcessing = () => {
    if(module.processProc) {
      module.processProc.kill('SIGINT');
      app.set('processing', false);
      io.emit('process:finished');
    }
  }

  return module;
};
