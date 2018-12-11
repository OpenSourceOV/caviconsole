import { Injectable, Inject } from '@angular/core';
import { WindowService } from './window.service';

@Injectable()
export class AppConstants {    
    
    // public serverURL: string = 'http://pi-2.local:6060'; 
    // public previewURL: string = 'http://pi-2.local:8181';  
    // public serverURL: string = 'http://localhost:6060'; 
    // public previewURL: string = 'http://localhost:8181';  
    public serverURL: string
    public previewURL: string

    constructor(
      private windowService: WindowService
    ) {
      let location = this.windowService.nativeWindow.location
      this.serverURL = `http://${location.hostname}:${location.port}`;
      this.previewURL = `http://${location.hostname}:8181`;
    }
};
