import { Component, OnInit, OnDestroy } from '@angular/core';
import { PiService } from '../pi.service';
import { AppConstants } from '../app.constants';
import { DataService } from '../data.service';
import { ConfigService } from '../config.service';
import { Config } from '../models/config';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import { ROI } from '../models/roi';
import * as moment from 'moment';

@Component({
  selector: 'modal-content',
  templateUrl: './data-roi.component.html',
  styleUrls: ['./data-roi.component.scss']
})
export class DataRoiComponent implements OnInit, OnDestroy {

  public imagePreviewSrc: string;
  public newROI: boolean = false;
  private roi: ROI
  private componentDestroyed: Subject<boolean> = new Subject<boolean>();
  private config: Config

  constructor(
    private piService: PiService,
    private appConstants: AppConstants,
    private configService: ConfigService,
    private dataService: DataService,
    public bsModalRef: BsModalRef,

  ) { 
  }

  roiChanged(roi: ROI) {
    this.roi = roi;
    this.newROI = true;
  }

  saveROI() {
    this.config.process.roi = [
        this.roi.hRelImageHeight, 
        this.roi.wRelImageWidth,
        this.roi.topRelImageHeight,
        this.roi.leftRelImageWidth
      ].join(",");
    console.log("Saving ROI", this.config);
    this.configService.updateConfig(this.config);
    this.newROI = false;
    setTimeout(() => this.piService.startReprocessingAreas());
    this.bsModalRef.hide()
  }
  
  ngOnInit() {
    this.configService.config.takeUntil(this.componentDestroyed.asObservable()).subscribe((config) => {
      if(!config) return;
      this.config = Object.assign({}, config);
      let parsedROI = this.config.process.roi.split(",");
      if(!parsedROI.length) return;
      this.roi = <ROI>{
        hRelImageHeight: parseFloat(parsedROI[0]),
        wRelImageWidth: parseFloat(parsedROI[1]),
        topRelImageHeight: parseFloat(parsedROI[2]),
        leftRelImageWidth: parseFloat(parsedROI[3]) 
      }
    })
    // Get the most recent captured image
    console.log("Last data item: ", this.dataService.data[this.dataService.data.length - 1]);
    let lastDataItem = this.dataService.data[this.dataService.data.length - 1]
    this.imagePreviewSrc = `${this.appConstants.serverURL}/captured-image/${lastDataItem.filename}`;
    
    // this.piService.latestCapturedImages.asObservable().takeUntil(this.componentDestroyed.asObservable()).filter(images => images.length > 0).subscribe((images) => {
    //   console.log("Images...", images);
    //   console.log("Setting preview src to ", this.imagePreviewSrc);
    // })
    // this.piService.getLatestCapturedImages(1);
  }

  ngOnDestroy() {
    this.componentDestroyed.next(true);
    this.componentDestroyed.complete();
  }

}
