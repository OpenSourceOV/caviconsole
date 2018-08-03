import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';
import { ConfigService } from './config.service';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class PiService {

  public light: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public capturing: BehaviorSubject<boolean> = new BehaviorSubject(null);
  public processing: BehaviorSubject<boolean> = new BehaviorSubject(null);
  public reprocessing: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public streamingPreview: BehaviorSubject<boolean> = new BehaviorSubject(null);
  public latestCapturedImages: BehaviorSubject<any[]> = new BehaviorSubject([]);
  public storageList: BehaviorSubject<any[]> = new BehaviorSubject(null);

  constructor(
    private socketService: SocketService,
    private configService: ConfigService
  ) { 
    this.setupSocketEvents();
    configService.configLoaded.subscribe((loaded) => {
      if(loaded === true) {
        // this.getLightStatus();
        this.getStorageList();
        this.getCaptureStatus();
        this.getProcessingStatus();
        this.getPreviewStatus();
      }
    })
  }

  setupSocketEvents() {
    this.socketService.socket.on('pi:lightStatus', (status) => {
      this.light.next(status);
    })
    this.socketService.socket.on('storage:list', (list) => {
      this.storageList.next(list);
      this.checkConfigStorage();
    })
    this.socketService.socket.on('capture:started', () => {
      this.capturing.next(true);
    })
    this.socketService.socket.on('capture:finished', () => {
      this.capturing.next(false);
    })
    this.socketService.socket.on('process:started', () => {
      this.processing.next(true);
    })
    this.socketService.socket.on('reprocessing:started', () => {
      this.reprocessing.next(true);
    })
    this.socketService.socket.on('process:finished', () => {
      this.processing.next(false);
      if(this.reprocessing.getValue() == true) {
        this.reprocessing.next(false);
      }
    })
    this.socketService.socket.on('capture:status', (status) => {
      this.capturing.next(status);
    })
    this.socketService.socket.on('process:status', (status) => {
      this.processing.next(status);
    })
    this.socketService.socket.on('camera:previewStatus', (status) => {
      this.streamingPreview.next(status);
    })
    this.socketService.socket.on('capture:latestImages', (images) => {
      this.latestCapturedImages.next(JSON.parse(images));
    })
    this.socketService.socket.on('config:unloaded', () => {    
      this.getStorageList();
    });
    this.socketService.socket.on('storage:unmounted', () => {    
      console.log("Storage unmounted");
      this.getStorageList();
    });

  }

  checkConfigStorage() {
    let config = this.configService.config.getValue();
    if(!this.storageList.getValue().find(item => item == config.capture.external_storage)) {
      config.capture.external_storage = "";
      config.capture.output_dir = "";
      this.configService.config.next(config);
    }
  }

  unmountStorage(device: string) {
    this.socketService.socket.emit('storage:unmount', device);
  }

  getStorageList() {
    this.socketService.socket.emit('storage:list');
  }

  getLightStatus() {
    this.socketService.socket.emit('pi:readLightStatus');    
  }

  getPreviewStatus() {
    this.socketService.socket.emit('camera:getPreviewStatus');    
  }

  getCaptureStatus() {
    this.socketService.socket.emit('capture:status');    
  }

  getProcessingStatus() {
    this.socketService.socket.emit('process:status');    
  }

  toggleLight() { 
    if(this.socketService.connected.getValue() === false) return;
    if(this.light.getValue() === null) return;
    this.socketService.socket.emit('pi:light', !this.light.getValue());
  }
  
  lightOff() {
    this.socketService.socket.emit('pi:light', false);
  }

  restartPi(){ 
    if(this.socketService.connected.getValue() === false) return;
    this.socketService.socket.emit('pi:restart');
  }
  
  shutdownPi(){ 
    if(this.socketService.connected.getValue() === false) return;
    this.socketService.socket.emit('pi:shutdown');
  }

  generatePreview() {
    this.socketService.socket.emit('crop:generatePreview');
  }

  stopPreview() {
    this.socketService.socket.emit('camera:stopPreview');
  }

  startCapture() {
    if(this.capturing.getValue() !== true) {
      this.stopPreview();
      this.lightOff();
      setTimeout(() => {
        this.socketService.socket.emit('capture:start')
      }, 1000)
    }
  }

  stopCapture() {
    if(this.capturing.getValue() === true) {
      this.socketService.socket.emit('capture:stop');
    }
  }

  startProcessing() {
    if(this.processing.getValue() !== true) {
      this.socketService.socket.emit('process:start')
    }
  }

  startReprocessing() {
    if(this.processing.getValue() === true) {
      this.stopProcessing();
      setTimeout(() => {
        this.socketService.socket.emit('process:reprocess')
      }, 3000);
    } else {
      this.socketService.socket.emit('process:reprocess')
    }
  }


  startReprocessingAreas() {
    if(this.processing.getValue() === true) {
      this.stopProcessing();
      setTimeout(() => {
        this.socketService.socket.emit('process:reprocess:areas')
      }, 3000);
    } else {
      this.socketService.socket.emit('process:reprocess:areas')
    }
  }



  stopProcessing() {
    if(this.processing.getValue() === true) {
      this.socketService.socket.emit('process:stop');
    }
  }

  togglePreviewStreaming() { 
    if(this.socketService.connected.getValue() === false) return;
    if(this.streamingPreview.getValue() === null) return;
    if(this.streamingPreview.getValue() === false) {
      this.socketService.socket.emit('camera:startPreview');
    } else {
      this.socketService.socket.emit('camera:stopPreview');
    }
  }
  

}
