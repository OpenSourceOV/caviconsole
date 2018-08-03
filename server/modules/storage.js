'use strict';
module.exports = (app, configModule, process, io) => {
  var fsModule = require(app.paths.modules + '/fs')(app);
  var module = {}
  const { exec } = require('child_process');

  module.initSocket = (socket) => {
    
    socket.on('storage:list', function() {
      if(process.platform == 'darwin') 
        io.emit('storage:list', fsModule.getDirectories('/'));
      else
        io.emit('storage:list', fsModule.getDirectories('/media/pi'));
    })
    
    socket.on('storage:unmount', function(device) {
      console.log("Sending unmount event (waiting for db conn close");
      app.eventEmitter.emit('storage:unmounting');
      setTimeout(() => {
        console.log("Unmounting storage " + '/media/pi/' + device);
        exec('umount /media/pi/' + device, (error, stdout, stderr) => {
          if (error) {
            console.log(`stderr: ${stderr}`);
            io.emit('capture:error', "Unable to unmount " + device + ": " + JSON.stringify(stderr));
            return;
          }
          io.emit('capture:info', JSON.stringify(stdout));
          io.emit('storage:unmounted');
        });
      }, 2000);
    })
  }

  return module;
};
