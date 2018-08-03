'use strict';
module.exports = (app, configModule, io) => {

  var dateFormat = require('dateformat');
  var fs = require('fs');
  var fsModule = require(app.paths.modules + '/fs')(app);
  var path = require("path");
  var csv = require('csv-parser');
  var ini = require('ini')
  var { spawn } = require('child_process');

  var module = {}

  app.set('capturing', false);

  module.captureProc = false
  module.logFileTail = false
  module.areasFileTail = false
  module.sequenceName = false
  module.sequenceConfig = false
  module.sequencePath = ''
  
  module.initSocket = (socket) => {
    socket.on('capture:start', function() {
      module.startCapture();
    })

    socket.on('capture:stop', function() {
      module.stopCapture();
    })

    socket.on('capture:status', function() {
      console.log("Getting capture status");
      io.emit('capture:status', app.get('capturing'));
    })

    socket.on('capture:data:reload', function() {
      module.getAllData();
    })

    socket.on('capture:data:requery', function() {
      console.log("Requerying data");
      module.requeryData();
    })

    socket.on('capture:latestImages', function(n) {
      let images = module.getLatestImages(n);
      socket.emit('capture:latestImages', JSON.stringify(images));
    })
  }  

  module.getCaptureImagePath = (filename) => {
    var sequenceFolder;

    if(module.sequenceName) {
      sequenceFolder = `${app.caviConfig.capture.output_dir}/${module.sequenceName}`
    } else {
      if(app.caviConfig.capture.sequence_name == 'auto') {
        return; // can't find the directory
      } else {
        sequenceFolder = `${app.caviConfig.capture.output_dir}/${app.caviConfig.capture.sequence_name}`
      }
    }
    return path.resolve(sequenceFolder + '/' + filename);
  }

  module.getLatestImages = (n) => {
    var sequenceFolder;

    if(module.sequenceName) {
      sequenceFolder = `${app.caviConfig.capture.output_dir}/${module.sequenceName}`
    } else {
      if(app.caviConfig.capture.sequence_name == 'auto') {
        return; // can't find the directory
      } else {
        sequenceFolder = `${app.caviConfig.capture.output_dir}/${app.caviConfig.capture.sequence_name}`
      }
    }
    let images = fsModule.getFiles(sequenceFolder);
    console.log("Reading files in " + sequenceFolder);
    // return ['asdasd/asdasd.gif', 'asdasdas/dfdfd.gif']
    return images.reverse().slice(0, n);
  }

  module.startCapture = () => {

    console.log("Starting capture...");
    module.iniWritten = false;

    var args = [
      "-u", scriptFilePath, "--config", configModule.configFilePath, "--verbose"
    ];
    module.sequenceName = app.caviConfig.capture.sequence_name
    module.sequencePath = `${app.caviConfig.capture.output_dir}/${module.sequenceName}`

    // We'll also write a copy of the config to the capture folder
    
    app.set('capturing', true);
    io.emit('capture:started');

    module.mockDataStream = setInterval(() => {
      console.log("Emitting fake data");
      let fakeData = {
        start_time: dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss"),
        end_time: dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss"),
        filename: 'filename.png',
        area: Math.random() * 100
      }
      io.emit('capture:data', JSON.stringify(fakeData));
    }, 2000)
  }

  module.getAllData = () => {
    var csvFilePath;

    if(module.sequenceName) {
      csvFilePath = `${app.caviConfig.capture.output_dir}/${module.sequenceName}/processed/areas.csv`
    } else {
      if(app.caviConfig.capture.sequence_name == 'auto') {
        return; // can't find the directory
      } else {
        csvFilePath = `${app.caviConfig.capture.output_dir}/${app.caviConfig.capture.sequence_name}/processed/areas.csv`
      }
    }
    
    console.log("Reading all data from ", csvFilePath);

    if(!fs.existsSync(csvFilePath)) {
      console.log("File not found");
      return;
    }
    var items = [];
    fs.createReadStream(csvFilePath)
      .pipe(csv({
        headers: ['start_time', 'end_time', 'filename', 'area']
      }))
      .on('data', function (data) {
        items.push(data);
      })
      .on('end', function () {
        io.emit('capture:data:all', JSON.stringify(items));
        // We are done
      })
  }

  module.requeryData = () => {
    var csvFilePath;

    if(module.sequenceName) {
      csvFilePath = `${app.caviConfig.capture.output_dir}/${module.sequenceName}/processed/areas.csv`
    } else {
      if(app.caviConfig.capture.sequence_name == 'auto') {
        return; // can't find the directory
      } else {
        csvFilePath = `${app.caviConfig.capture.output_dir}/${app.caviConfig.capture.sequence_name}/processed/areas.csv`
      }
    }
    
    console.log("Requering data from ", csvFilePath);

    if(!fs.existsSync(csvFilePath)) {
      console.log("File not found");
      return;
    }
    var items = [];
    fs.createReadStream(csvFilePath)
      .pipe(csv({
        headers: ['start_time', 'end_time', 'filename', 'area']
      }))
      .on('data', function (data) {
        items.push(data);
      })
      .on('end', function () {
        io.emit('capture:data:all', JSON.stringify(items));
        // We are done
      })
  }

  module.stopCapture = () => {
    app.set('capturing', false);
    io.emit('capture:finished');
    console.log("Stopping capture");
    if(module.mockDataStream) {
      clearInterval(module.mockDataStream)
    }
    module.logFileTail = false
    module.areasFileTail = false
  }

  return module;
};
