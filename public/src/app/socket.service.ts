import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from '@angular/router';
import { AppConstants } from './app.constants';

@Injectable()
export class SocketService {

  public socket;
  public connected: BehaviorSubject<boolean> = new BehaviorSubject(false)
  public reconnectionAttempts: BehaviorSubject<any> = new BehaviorSubject(null)
  private _reconnectionAttempts: number = 0;

  constructor(
    private router: Router,
    private appConstants: AppConstants

  ) { 

    this.socket = io(this.appConstants.serverURL);

    this.socket.on('connected', (socket) => {
      this.connected.next(true);
      this._reconnectionAttempts = 0;
      this.reconnectionAttempts.next(null);
    });

    this.socket.on('disconnect', (socket) => {
      this.connected.next(false);
      this.router.navigate(['capture']);
    });

    this.socket.on('reconnect_attempt', (socket) => {
      this._reconnectionAttempts++;
      this.reconnectionAttempts.next(this._reconnectionAttempts);
    });

  }

}
