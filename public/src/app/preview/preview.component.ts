import { Component, OnInit, OnDestroy } from '@angular/core';
import { PiService } from '../pi.service';
import { SocketService } from '../socket.service';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import * as moment from 'moment';

import { AppConstants } from '../app.constants';

@Component({
  selector: 'modal-content',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit, OnDestroy {

  public imagePreviewSrc: string;
  private componentDestroyed: Subject<boolean> = new Subject<boolean>();

  constructor(
    private piService: PiService,
    private socketService: SocketService,
    public bsModalRef: BsModalRef,
    public appConstants: AppConstants
  ) { 
  }


  ngOnInit() {
    this.socketService.socket.on('crop:previewGenerated', () => {
      console.log("Preview generated");
      this.imagePreviewSrc = `${this.appConstants.serverURL}/capture/preview?${moment().format('MMDDYYYYHHmmss')}`
    })    
    this.piService.generatePreview();
  }

  ngOnDestroy() {
    this.componentDestroyed.next(true);
    this.componentDestroyed.complete();
  }

}
