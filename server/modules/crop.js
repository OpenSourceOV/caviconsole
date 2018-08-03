'use strict';
module.exports = (app, configModule, captureModule, io) => {
  var module = {}
  var { spawn } = require('child_process');

  module.initSocket = (socket) => {
    socket.on('crop:generatePreview', function() {
      module.generatePreview();
      console.log("Generatign preview...");
      // socket.emit('roi:previewImageURL', module.getROIPreviewImageURL());      
    });

  }

  module.generatePreview = () => {
    if(app.get('capturing') == true || !app.caviConfig) {
      return;
    }
    
    app.set('capturing', true);
    io.emit('crop:generatingPreview');

    var args = [
      "-u", 
      "/home/pi/cavicapture/cavicapture.py", 
      "--config", 
      configModule.configFilePath, 
      "--preview"
    ];
    module.captureProc = spawn("python", args);
    module.captureProc.on('close', function (code) {
      io.emit('crop:previewGenerated');
      app.set('capturing', false);
    });
  }

  return module;
};
