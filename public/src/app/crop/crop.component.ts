import { Component, OnInit, OnDestroy } from '@angular/core';
import { PiService } from '../pi.service';
import { SocketService } from '../socket.service';
import { ConfigService } from '../config.service';
import { Config } from '../models/config';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import { ROI } from '../models/roi';
import * as moment from 'moment';

import { AppConstants } from '../app.constants';

@Component({
  selector: 'modal-content',
  templateUrl: './crop.component.html',
  styleUrls: ['./crop.component.scss']
})
export class CropComponent implements OnInit, OnDestroy {

  public imagePreviewSrc: string;
  public newROI: boolean = false;
  private roi: ROI
  private componentDestroyed: Subject<boolean> = new Subject<boolean>();
  private config: Config

  constructor(
    private piService: PiService,
    private socketService: SocketService,
    private configService: ConfigService,
    public bsModalRef: BsModalRef,
    public appConstants: AppConstants
  ) { 
  }

  roiChanged(roi: ROI) {
    this.roi = roi;
    this.newROI = true;
  }

  saveCrop() {
    this.config.capture.crop = [
        this.roi.hRelImageHeight, 
        this.roi.wRelImageWidth,
        this.roi.topRelImageHeight,
        this.roi.leftRelImageWidth
      ].join(",");
    console.log("Saving ROI", this.config);
    this.configService.updateConfig(this.config);
    this.newROI = false;
    this.bsModalRef.hide()
  }
  

  ngOnInit() {
    this.socketService.socket.on('crop:previewGenerated', () => {
      this.imagePreviewSrc = `${this.appConstants.serverURL}/capture/preview?${moment().format('MMDDYYYYHHmmss')}`
    })    
    this.configService.config.takeUntil(this.componentDestroyed.asObservable()).subscribe((config) => {
      if(!config) return;
      this.config = Object.assign({}, config);
      let parsedCrop = this.config.capture.crop.split(",");
      if(!parsedCrop.length) return;
      this.roi = <ROI>{
        hRelImageHeight: parseFloat(parsedCrop[0]),
        wRelImageWidth: parseFloat(parsedCrop[1]),
        topRelImageHeight: parseFloat(parsedCrop[2]),
        leftRelImageWidth: parseFloat(parsedCrop[3]) 
      }
      console.log("config ROI", this.roi);
    })
    console.log("here?");
    this.piService.generatePreview();
  }

  ngOnDestroy() {
    this.componentDestroyed.next(true);
    this.componentDestroyed.complete();
  }

}
