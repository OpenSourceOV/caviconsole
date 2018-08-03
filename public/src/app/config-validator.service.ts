import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ConfigService } from './config.service';
import { PiService } from './pi.service';

@Injectable()
export class ConfigValidatorService {

  public configValid: BehaviorSubject<boolean> = new BehaviorSubject(false)

  constructor(
    private configService: ConfigService,
    private piService: PiService,
  ) { 
    configService.configLoaded.subscribe(() => {
      this.validateConfig();
    })    
    piService.storageList.subscribe(() => {
      this.validateConfig();
    });
  }

  public validateConfig() {
    let valid = true;
    if(this.configService.configLoaded.getValue() !== true) {
      valid = false;  
    } 

    let storageList = this.piService.storageList.getValue()
    let config = this.configService.config.getValue();
    
    if(!storageList) {
      valid = false
    } else if(storageList.length === 0) {
      valid = false
    } else if(config.capture.external_storage.length === 0) {
      valid = false
    } else {
      if(!storageList.find(item => item == config.capture.external_storage)) {
        valid = false
      }
    }

    if(this.configValid.getValue() !== valid) {
      this.configValid.next(valid);
    }

  }

}
