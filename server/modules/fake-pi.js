'use strict';

module.exports = function (app, io) {

  var module = {}

  module.lightOn = false;

  module.initSocket = (socket) => {
    socket.on('pi:restart', function() {
      console.log("Pi restarted");
    });    

    socket.on('pi:wifi:config', function() {
      socket.emit('pi:wifi:config', {
        mode: 'AP',
        SSID: '12345',
        password: '2334453'
      })
    });
  
    socket.on('pi:wifi:update', function(config) {
      console.log("Updating wifi config", config);
      if(config.mode == 'network') {
        console.log("Setting wifi mode to network")
      }else if(config.mode == 'AP') {
        console.log("Setting wifi mode to AP")
      }
    });
  
    socket.on('pi:shutdown', function() {
      module.shutdownPi();
    });
  
    socket.on('pi:light', (lightOn) => {
      module.light(lightOn);
      io.emit('pi:lightStatus', lightOn);    
    });
  
    socket.on('pi:readLightStatus', (lightOn) => {
      module.readLightStatus().then((lightStatus) => {
        io.emit('pi:lightStatus', lightStatus);      
      }).catch((err) => {
        console.log("Failed", err);
      });
    });
  
  }

  module.light = function(lightOn) {
    if(!!lightOn) {
      console.log("Turning light on")
      module.lightOn = true;
    } else {
      console.log("Turning light off")
      module.lightOn = true;
    }
  }

  module.restartPi = () => {
    console.log("Restarting pi");
  }

  module.shutdownPi = () => {
    console.log("Shutting down pi");
  }

  module.readLightStatus = function() {
    return new Promise(function(resolve, reject) {
      if(!(app.caviConfig && app.caviConfig.pi.GPIO_light_channel)) {
        return reject();
      }
      resolve(module.lightOn);
    });
  }

  return module;
};
