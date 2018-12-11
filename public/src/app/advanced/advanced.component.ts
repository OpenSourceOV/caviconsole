import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../config.service';
import { Config } from '../models/config';
import { WifiConfig } from '../models/wifi-config';
import { PiService } from '../pi.service';

@Component({
  selector: 'app-advanced',
  templateUrl: './advanced.component.html',
  styleUrls: ['./advanced.component.scss']
})
export class AdvancedComponent implements OnInit {

  config: Config
  wifiConfig: WifiConfig
  capturing: boolean = false;

  constructor(
    public configService: ConfigService,
    private piService: PiService
  ) { 
    configService.config.subscribe((config) => {
      if(config) {
        this.config = Object.assign({}, config);
      }
    })
    configService.wifiConfig.subscribe((config) => {
      this.wifiConfig = Object.assign({}, config);
    })
    piService.capturing.subscribe((capturing: boolean) => {
      this.capturing = capturing;
    })
    
  }

  doWifiAP() {
    console.log("Doing wifi AP")
    this.wifiConfig.mode = 'AP'; 
    this.updateWifi();
  }
  
  doWifiNetwork() {
    console.log("Doing wifi network")
    this.wifiConfig.mode = 'network'; 
  }

  updateConfig() {
    this.configService.updateConfig(this.config);
  }

  updateWifi() {
    this.configService.updateWifiConfig(this.wifiConfig);
  }

  ngOnInit() {
  }

}
