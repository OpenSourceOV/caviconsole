import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import { ROI } from '../models/roi';
import { ConfigService } from '../config.service';
import { Config } from '../models/config';
import { DataService, QueueSummary } from '../data.service';
import { PiService } from '../pi.service';
import { SocketService } from '../socket.service';
import { DataRoiComponent } from '../data-roi/data-roi.component';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { ProcessLogComponent } from '../process-log/process-log.component';


@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit, OnDestroy {

  public reloadData: Subject<any> = new Subject();
  private componentDestroyed: Subject<boolean> = new Subject<boolean>();
  private config: Config
  public imagePreviewSrc: Subject<string> = new Subject<string>();
  public queueSummary: QueueSummary;
  roiModalRef: BsModalRef;
  logModalRef: BsModalRef;  
  
  constructor(
    private configService: ConfigService,
    private dataService: DataService,
    private piService: PiService,
    private socketService: SocketService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.configService.config.takeUntil(this.componentDestroyed.asObservable()).subscribe((config) => {
      if(config) {
        this.config = Object.assign({}, config);
      }
    })
    this.dataService.queueSummary.takeUntil(this.componentDestroyed.asObservable()).subscribe((summary: QueueSummary) => {
      console.log("Updating summary");
      this.queueSummary = summary;
      setTimeout(() => {
        this.dataService.getQueueSummary();
      }, 2000);
    })      
  }

  reprocess() {
    console.log("Starting reprocessing");
    this.configService.updateConfig(this.config);
    this.piService.startReprocessing();
    this.showLog();
  }

  ngOnDestroy() {
    this.componentDestroyed.next(true);
    this.componentDestroyed.complete();
  }

  reload() {
    this.reloadData.next(true); 
  }

  showLog() {
    this.logModalRef = this.modalService.show(ProcessLogComponent, {class: 'modal-lg'});
  }

  showROI() {
    this.roiModalRef = this.modalService.show(DataRoiComponent, {class: 'modal-lg'});
  }

}
