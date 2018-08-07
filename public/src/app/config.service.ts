import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SocketService } from './socket.service';
import { Config } from './models/config';
import { WifiConfig } from './models/wifi-config';

@Injectable()
export class ConfigService {

  public configLoaded: BehaviorSubject<boolean> = new BehaviorSubject(false)
  
  // public configFile: string = '/home/pi/cavicapture/config.ini';
  // public configFile: string = './dummy_pi_fs/config.ini';
  public configFile: string = '/home/pi/caviconsole/default-config.ini';
  public scriptPath: string = '/home/pi/cavicapture/cavicapture.py'
  public processorPath: string = '/home/pi/caviprocess/caviprocess.py'

  public config: BehaviorSubject<Config> = new BehaviorSubject(null)
  public wifiConfig: BehaviorSubject<WifiConfig> = new BehaviorSubject(null)

  constructor(
    private socketService: SocketService
  ) { 
    console.log("Config service constructor");
    this.setupSocketEvents();
  }

  setupSocketEvents() {
    this.socketService.connected.subscribe((connected) => {
      if(connected) {
        this.socketService.socket.emit("pi:wifi:config");
        this.socketService.socket.emit("config:get:current");
        this.socketService.socket.emit("config:get:file");
      } else {
        this.configLoaded.next(false);
      }
    });
    this.socketService.socket.on('config:current', (config) => {
      console.log("Current config", config);
      this.setConfig(config);
    })
    // this.socketService.socket.on('config:updated', (config) => {
    //   console.log("Config updated", config);
    //   this.setConfig(config);
    // })
    this.socketService.socket.on('config:file', (configFilePath) => {
      console.log("Config file", configFilePath);
      this.configFile = configFilePath;
    })
    this.socketService.socket.on('config:unloaded', () => {
      if(this.configLoaded.getValue() !== false) {
        this.configLoaded.next(false);
        this.config.next(null);
      }
    })
    this.socketService.socket.on('pi:wifi:config', (config) => {
      console.log("Wifi config", config);
      this.setWifiConfig(config);
    })
  }

  setConfig(config) {
    console.log("Setting config", config);
    this.config.next(config);
    if(this.configLoaded.getValue() !== true) {
      this.configLoaded.next(true);
    }
  }

  setWifiConfig(config) {
    this.wifiConfig.next(config);
  }

  updateWifiConfig(config:WifiConfig) {
    this.socketService.socket.emit("pi:wifi:update", config);        
  }

  readConfig() {
    if(!this.configFile) {
      return;
    }
    this.socketService.socket.emit('config:read', this.configFile);
  }
  
  updateConfig(config:Config) {
    if(!this.configFile) {
      return;
    }
    this.socketService.socket.emit("config:update", config, this.configFile);        
  }

  getCaptureDimensions() {
    console.log("Resolution ", this.config.getValue().capture.resolution);
    console.log("Crop ", this.config.getValue().capture.crop);

    return {
      height: 400,
      width: 600
    }
  }

}
