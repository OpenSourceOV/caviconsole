import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';
import { ConfigService } from './config.service';
import { PiService } from './pi.service';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export interface LogEntry {
  type: string,
  value: any
}

@Injectable()
export class LogService {

  public captureLog: BehaviorSubject<LogEntry[]> = new BehaviorSubject([]);
  private _captureLog: LogEntry[] = []

  public processLog: BehaviorSubject<LogEntry[]> = new BehaviorSubject([]);
  private _processLog: LogEntry[] = []

  constructor(
    private socketService: SocketService,
    private configService: ConfigService,    
    private piService: PiService    
  ) { 
    this.setupSocketEvents();
  }

  setupSocketEvents() {
    this.socketService.socket.on('process:info', (data) => {
      this.addProcessEntry({ type: 'info', value: data });
    })
    this.socketService.socket.on('process:error', (data) => {
      this.addProcessEntry({ type: 'error', value: data });
    })
    this.socketService.socket.on('capture:info', (data) => {
      this.addCaptureEntry({ type: 'info', value: data });
    })
    this.socketService.socket.on('capture:error', (data) => {
      this.addCaptureEntry({ type: 'error', value: data });
    })
  }  

  addCaptureEntry(entry: LogEntry) {
    this._captureLog.push(entry)
    if(this._captureLog.length > 100) {
      this._captureLog.shift();
    }
    this.captureLog.next(this._captureLog);    
  }

  addProcessEntry(entry: LogEntry) {
    this._processLog.push(entry)
    if(this._processLog.length > 100) {
      this._processLog.shift();
    }
    this.processLog.next(this._processLog);    
  }

}
