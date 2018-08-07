import { Injectable, Inject } from '@angular/core';
import { Location } from '@angular/common';

@Injectable()
export class AppConstants {    
    
    // public serverURL: string = 'http://pi-2.local:6060'; 
    // public previewURL: string = 'http://pi-2.local:8181';  
    // public serverURL: string = 'http://localhost:6060'; 
    // public previewURL: string = 'http://localhost:8181';  
    public serverURL: string
    public previewURL: string

    constructor(
      @Inject(Window) private _window: Window
    ) {
      this.serverURL = `http://${this._window.location.hostname}:${this._window.location.port}`;
      this.previewURL = `http://${this._window.location.hostname}:8181`;

      // console.log("Esadasddas", this._window.location.hostname, this._window.location.port, this._window.location);
    }
};
