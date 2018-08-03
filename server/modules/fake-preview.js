'use strict';
module.exports = (app, configModule, io) => {
  var fs = require('fs');
  var module = {}

  module.streamingProc = false
  module.streamingActive = false
  
  module.initSocket = (socket) => {
    socket.on('camera:startPreview', function() {
      module.startStreaming();
    });

    socket.on('camera:stopPreview', function() {
      module.stopStreaming();
    });

    socket.on('camera:getPreviewStatus', function() {
      module.emitPreviewStatus();
    });
  }

  module.stopStreaming = () => {
    console.log("Stopping streaming");    
    if(module.streamingActive == false) 
      return; // not streaming
    
    module.streamingActive = false;
    module.emitPreviewStatus();
  }

  module.emitPreviewStatus = () => {
    io.emit('camera:previewStatus', module.streamingActive)
  }

  module.startStreaming = () => {
    console.log("Starting streaming");    
    if(module.streamingActive == true)
      return; // already streaming
  
    if(!app.caviConfig)
      return; // need the config to preview

    setTimeout(() => {
      module.streamingActive = true;
      module.emitPreviewStatus();
    }, 2000)
    
  }

  return module;
};
