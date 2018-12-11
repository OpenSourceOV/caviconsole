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
  }

  public validateConfig() {
    let valid = true;
    if(this.configService.configLoaded.getValue() !== true) {
      valid = false;  
    } 

    let config = this.configService.config.getValue();

    if(this.configValid.getValue() !== valid) {
      this.configValid.next(valid);
    }
    true;
  }

}
