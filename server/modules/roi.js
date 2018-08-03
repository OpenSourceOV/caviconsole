'use strict';
module.exports = (app, configModule, captureModule) => {
  var module = {}

  module.initSocket = (socket) => {
    console.log("Initing socket");
    socket.on('roi:getPreviewImageURL', function() {
      socket.emit('roi:previewImageURL', module.getROIPreviewImageURL());      
    });

  }

  module.getROIPreviewImageURL = () => {
    return "/acacia_stem/20170730-131752.png";
  }

  return module;
};
