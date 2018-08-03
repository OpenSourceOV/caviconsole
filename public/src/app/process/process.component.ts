import { Component, OnInit, ViewChild, OnDestroy  } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import { ConfigService } from '../config.service';
import { Config } from '../models/config';
import { PiService } from '../pi.service';
import { DataService } from '../data.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { ProcessLogComponent } from '../process-log/process-log.component';
import { ProcessQueueComponent } from '../process-queue/process-queue.component';
import { DataRoiComponent } from '../data-roi/data-roi.component';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss']
})
export class ProcessComponent implements OnInit, OnDestroy {

  @ViewChild('processForm') public processForm: NgForm;
  
  config: Config
  capturing: boolean = false;
  processing: boolean = false;
  configVisible: boolean = false;
  configLoaded: boolean = false;
  logModalRef: BsModalRef;
  roiModalRef: BsModalRef;
  queueModalRef: BsModalRef;

  private componentDestroyed: Subject<boolean> = new Subject<boolean>();

  constructor(
    public configService: ConfigService,
    private piService: PiService,
    private modalService: BsModalService,
    private dataService: DataService
  ) { 
    this.piService.processing.takeUntil(this.componentDestroyed.asObservable()).subscribe((processing: boolean) => {
      this.processing = processing;
    })
  }

  setROI() {
    this.roiModalRef = this.modalService.show(DataRoiComponent, {class: 'modal-lg'});
  }

  updateConfig() {
    this.configService.updateConfig(this.config);
  }

  startProcessing() {
    console.log("Starting processing");
    this.piService.startProcessing();
  }

  stopProcessing() {
    console.log("Stopping processing");
    this.piService.stopProcessing();
  }

  exportData() {
    console.log("Exporting data");
    this.dataService.exportData();
  }

  ngOnDestroy() {
    this.componentDestroyed.next(true);
    this.componentDestroyed.complete();
  }

  reprocess() {
    console.log("Starting reprocessing");
    this.configService.updateConfig(this.config);
    this.piService.startReprocessing();
  }

  showLog() {
    this.logModalRef = this.modalService.show(ProcessLogComponent, {class: 'modal-lg'});
  }

  showQueue() {
    this.queueModalRef = this.modalService.show(ProcessQueueComponent, {class: 'modal-lg'});
  }

  ngOnInit() {
    this.configService.configLoaded.takeUntil(this.componentDestroyed.asObservable()).subscribe((isLoaded:boolean) => {
      this.configLoaded = isLoaded;
    })    
    this.processForm.valueChanges.takeUntil(this.componentDestroyed.asObservable()).subscribe((change) => {
      console.log("Change!", change);
      this.processForm.form.markAsDirty();
    })
    this.configService.config.takeUntil(this.componentDestroyed.asObservable()).subscribe((config) => {
      if(config) {
        this.config = Object.assign({}, config);
        if(this.processForm){
          setTimeout(() => {
            this.processForm.form.markAsPristine()
          })
        }
      }
    })

  }


}
