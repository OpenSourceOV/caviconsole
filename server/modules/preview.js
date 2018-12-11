'use strict';
module.exports = (app, configModule, io) => {
  var { spawn } = require('child_process');
  const exec = require('child_process').exec;
  var fs = require('fs');
  var proc;
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

  module.emitPreviewStatus = () => {
    io.emit('camera:previewStatus', module.streamingActive)
  }

  module.startStreaming = () => {
    
    if(module.streamingActive == true)
      return; // already streaming
  
    if(!app.caviConfig)
      return; // need the config to preview

    console.log("Init streaming...");

    var streamerServerArgs = [
      "-i",
      "/home/pi/mjpg-streamer/input_uvc.so -f 10 -r 640x480 -n -y",
      "-o",
      "/home/pi/mjpg-streamer/output_http.so -w /home/pi/mjpg-streamer/www -p 8181"
    ];

    module.streamingProc = spawn('/home/pi/mjpg-streamer/mjpg_streamer', streamerServerArgs);
    console.log("Streaming server command: ", '/home/pi/mjpg-streamer/mjpg_streamer ' + streamerServerArgs.join(" "));

    setTimeout(() => {
      module.streamingActive = true;
      module.emitPreviewStatus();
    }, 3000)

    module.streamingProc.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`);
    });

    module.streamingProc.on('close', (code) => {
      console.log("Streaming stopped.");
      // console.log(`child process exited with code ${code}`);
      module.streamingActive = false;
      module.emitPreviewStatus();
    });
    
  }

  module.stopStreaming = () => {
    
    if(module.streamingActive == false) 
      return; // not streaming
    
    if (module.streamingProc) {
      console.log("Stopping streaming...");
      module.streamingProc.kill();
    }
    
    module.streamingActive = false;
    module.emitPreviewStatus();
  }
  

  return module;
};
