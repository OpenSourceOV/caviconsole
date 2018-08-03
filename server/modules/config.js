'use strict';
module.exports = (app, process, io) => {

  var fs = require('fs')
  var ini = require('ini')
  var module = {}
  var path = require("path");

  module.configFilePath = null;

  module.initSocket = (socket) => {

    socket.on('config:update', (config, configFile) => {
      console.log('config:update');

      if(!fs.existsSync(configFile)) {
        // Check if the containing folder exists
        let folder = path.dirname(configFile);
        if(!fs.existsSync(path.dirname(configFile))){
          io.emit('capture:error', "Unable to update config file: file and containing folder does not exist");
          console.log("File and containing folder does not exist - unable to read or create config file");
          return;
        }
        io.emit('capture:info', "Creating config file " + configFile);
      }
      app.caviConfig = module.updateConfig(config, configFile);
      io.emit('config:current', app.caviConfig);
      app.eventEmitter.emit('configUpdated');
    });
  
    socket.on('config:get:current', (config, configFile) => {
      console.log('config:get:current');
      if(app.caviConfig) {
        // Check the config file still exists:
        if(!fs.existsSync(module.configFilePath)) {
          io.emit('capture:error', "Unable to get current config file: file not found (" + module.configFilePath + ")");
          app.caviConfig = null;
          module.configFilePath = null;  
          io.emit('config:unloaded');
          return;
        };
        app.caviConfig = module.getConfig(module.configFilePath);        
        socket.emit('config:current', app.caviConfig);
      }
    });
  
    socket.on('config:get:file', () => {
      console.log('config:get:file');
      console.log("Getting current config file")
      if(app.caviConfig && module.configFilePath)
        socket.emit('config:file', module.configFilePath);
    });
  
    socket.on('config:read', (configFilePath) => {
      console.log('config:read');
      console.log("Reading current config")
      if(!fs.existsSync(configFilePath)) {
        io.emit('capture:error', "Unable to read config file: couldn't find " + configFilePath);
        return;
      }
      module.configFilePath = configFilePath
      app.caviConfig = module.getConfig(module.configFilePath);
      io.emit('config:current', app.caviConfig);
      app.eventEmitter.emit('configReady');
    });
    // -----------------------------------------
  
  }

  module.updateConfig = (config, configFile) => {
    fs.writeFileSync(configFile, ini.stringify(config))
    return config;
  }

  module.getConfig = (configFile) => {
    var config = ini.parse(fs.readFileSync(configFile, 'utf-8'))
    // Some of the values need to be converted to numbers
    config.camera.ISO = parseInt(config.camera.ISO);
    config.camera.shutter_speed = parseInt(config.camera.shutter_speed);
    config.capture.duration = parseFloat(config.capture.duration);
    config.capture.interval = parseInt(config.capture.interval);
    config.pi.GPIO_light_channel = parseInt(config.pi.GPIO_light_channel);
    config.process.filter_threshold = parseInt(config.process.filter_threshold);
    return config;
  }

  module.getCapturePath = (filename) => {
    let sequenceFolder = `${app.caviConfig.capture.output_dir}/${app.caviConfig.capture.sequence_name}`
    return path.resolve(sequenceFolder + '/' + filename);
  }
  
  module.sequencePath = () => {
    let sequenceFolder = `${app.caviConfig.capture.output_dir}/${app.caviConfig.capture.sequence_name}`
    return path.resolve(sequenceFolder);
  }


  app.caviConfig = false;
  
  return module;
};
