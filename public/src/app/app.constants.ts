import { Injectable } from '@angular/core';

@Injectable()
export class AppConstants {    
    
    // public serverURL: string = 'http://pi-2.local:6060'; 
    // public previewURL: string = 'http://pi-2.local:8181';  
    public serverURL: string = 'http://localhost:6060'; 
    public previewURL: string = 'http://localhost:8181';  

    constructor() {
    }
};
