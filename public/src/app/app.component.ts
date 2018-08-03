import { Component } from '@angular/core';
import { ConfigService } from './config.service';
import { SocketService } from './socket.service';
import { PiService } from './pi.service';
import { DataService } from './data.service';
import { LogService } from './log.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  connected: boolean = false;
  dbConnected: boolean = false;
  connectionAttempts: number = 0;
  configLoaded: boolean = false;
  light: boolean = false;
  capturing: boolean = false;

  constructor(
    public configService: ConfigService,
    private socketService: SocketService,
    public piService: PiService,
    private dataService: DataService,
    private logService: LogService
  ){
    socketService.connected.subscribe((connected) => {
      this.connected = connected;
    })
    socketService.reconnectionAttempts.subscribe((n) => {
      this.connectionAttempts = n;
    })
    configService.configLoaded.subscribe((isLoaded:boolean) => {
      this.configLoaded = isLoaded;
    })
    piService.light.subscribe((light: boolean) => {
      this.light = light;
    })
    dataService.dbConnected.subscribe((connected) => {
      this.dbConnected = connected
    });
    piService.capturing.subscribe((capturing: boolean) => {
      this.capturing = capturing;
    })
  }
}