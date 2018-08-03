import { Component, OnInit, OnDestroy } from '@angular/core';
import { PiService } from '../pi.service';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { AppConstants } from '../app.constants';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'modal-content',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.scss']
})
export class LiveComponent implements OnInit, OnDestroy {

  public streaming: boolean = false;
  public streamingURL: string
  public light: boolean = false;
  private componentDestroyed: Subject<boolean> = new Subject<boolean>();

  constructor(
    public piService: PiService,   
    public bsModalRef: BsModalRef,
    private appConstants: AppConstants
  ) { 
    this.streamingURL = `${this.appConstants.previewURL}/?action=stream`
    this.piService.streamingPreview.takeUntil(this.componentDestroyed.asObservable()).subscribe((streaming) => {
      this.streaming = streaming;
    })
    piService.light.takeUntil(this.componentDestroyed.asObservable()).subscribe((light: boolean) => {
      this.light = light;
    })
  }

  ngOnInit() {
  }

  toggleStreaming() {
    this.piService.togglePreviewStreaming();
  }

  ngOnDestroy() {
    this.componentDestroyed.next(true);
    this.componentDestroyed.complete();
  }


}
