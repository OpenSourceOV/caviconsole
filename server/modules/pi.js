'use strict';

module.exports = function (app, io) {
  var wpi = require('wiringpi-node');
  var exec = require('child_process').exec;
  var wifiModule = require(app.paths.modules + '/wifi')(app); 
  // wifiModule.setup();

  wpi.setup('phys')

  var module = {}

  module.lightOn = false;

  module.initSocket = (socket) => {
    socket.on('pi:restart', function() {
      module.restartPi();
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
        wifiModule.enableWifiMode({ wifi_ssid: config.SSID, wifi_passcode: config.password}, (err) => {
          if(!err) {
            module.restartPi();
          }
        })
      }else if(config.mode == 'AP') {
        console.log("Setting wifi mode to AP")
        wifiModule.enableAPMode((err) => {
          if(!err) {
            module.restartPi();
          }
        });
      }
    });
  
    socket.on('pi:shutdown', function() {
      module.shutdownPi();
    });
  
    socket.on('pi:setTime', function(timestamp) {
      let currentTime = new Date(timestamp);
      console.log("Setting time");
      let timeCmd = `sudo date -s "${currentTime.toString()}"`
      console.log(timeCmd);
      exec(timeCmd);
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
    wpi.pinMode(app.caviConfig.pi.GPIO_light_channel, wpi.OUTPUT);
    if(!!lightOn) {
      console.log("Turning light on")
      wpi.digitalWrite(app.caviConfig.pi.GPIO_light_channel, wpi.HIGH);
    } else {
      console.log("Turning light off")
      wpi.digitalWrite(app.caviConfig.pi.GPIO_light_channel, wpi.LOW);
    }
  }

  module.restartPi = () => {
    exec('sudo shutdown -r now');
  }

  module.shutdownPi = () => {
    exec('sudo shutdown now');
  }

  module.readLightStatus = function() {
    return new Promise(function(resolve, reject) {
      if(!(app.caviConfig && app.caviConfig.pi.GPIO_light_channel)) {
        reject();
        return;
      }
      wpi.pinMode(app.caviConfig.pi.GPIO_light_channel, wpi.INPUT);
      module.lightOn = !!wpi.digitalRead(app.caviConfig.pi.GPIO_light_channel);
      resolve(module.lightOn);
    });
  }

  return module;
};
