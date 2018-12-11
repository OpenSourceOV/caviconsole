import { Component, OnInit, ViewChild, OnChanges, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfigService } from '../config.service';
import { Config } from '../models/config';
import { PiService } from '../pi.service';
import { ConfigValidatorService } from '../config-validator.service';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import { LiveComponent } from '../live/live.component';
import { PreviewComponent } from '../preview/preview.component';
import { CropComponent } from '../crop/crop.component';
import { CaptureLogComponent } from '../capture-log/capture-log.component';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

@Component({
  selector: 'app-capture',
  templateUrl: './capture.component.html',
  styleUrls: ['./capture.component.scss']
})
export class CaptureComponent implements OnInit, OnChanges, OnDestroy {

  @ViewChild('configForm') public configForm: NgForm;

  liveModalRef: BsModalRef;
  previewModalRef: BsModalRef;
  cropModalRef: BsModalRef;
  logModalRef: BsModalRef;
  configLoaded: boolean = false;
  config: Config
  capturing: boolean = false;
  configVisible: boolean = false;
  configValid: boolean = false;
  outputPath: string = '';
  private componentDestroyed: Subject<boolean> = new Subject<boolean>();

  constructor(
    public configService: ConfigService,
    private piService: PiService,
    private modalService: BsModalService,
    private configValidatorService: ConfigValidatorService
  ) { 

  }

  ngOnInit() {
    this.configService.configLoaded.takeUntil(this.componentDestroyed.asObservable()).subscribe((isLoaded:boolean) => {
      this.configLoaded = isLoaded;
    })
    this.configService.config.takeUntil(this.componentDestroyed.asObservable()).subscribe((config) => {
      if(config) {
        this.config = Object.assign({}, config);
        if (this.config.capture.crop_enabled == null) {
          this.config.capture.crop_enabled = "Off";
        }
        if (this.config.process.roi_enabled == null) {
          this.config.process.roi_enabled = "Off";
        }
        if(this.configForm){
          setTimeout(() => {
            this.configForm.form.markAsPristine()
          })
        }
      }
    })
    this.piService.capturing.takeUntil(this.componentDestroyed.asObservable()).subscribe((capturing: boolean) => {
      this.capturing = capturing;
    })
    this.configForm.valueChanges.takeUntil(this.componentDestroyed.asObservable()).subscribe((change) => {
      console.log("Change!", change);
      // this.configForm.form.markAsDirty();
    })
  }

  ngOnChanges(changes) {
    // console.log("Changes!!!!", changes);
  }

  ngOnDestroy() {
    this.componentDestroyed.next(true);
    this.componentDestroyed.complete();
  }

  updateOutputDir() {
    if(this.config.capture.external_storage) {
      this.config.capture.output_dir = '/media/pi/' + this.config.capture.external_storage
    } else {
      this.config.capture.output_dir = ''
    }
    // if(this.config.capture.output_dir && this.config.capture.sequence_name) {
    //   this.outputPath = this.config.capture.output_dir + '/' + this.config.capture.sequence_name
    // } else {
    //   this.outputPath = ''
    // }
  }

  ejectExternalStorage() {
    this.piService.unmountStorage(this.config.capture.external_storage);
  }

  readConfig() {
    this.configService.readConfig();
  }

  updateConfig() {
    this.configService.updateConfig(this.config);
  }

  stopCapture() {
    console.log("Stopping capture");
    this.piService.stopCapture();
  }

  startCapture() {
    console.log("Starting capture");
    this.piService.startCapture();
  }

  showLive() {
    this.liveModalRef = this.modalService.show(LiveComponent, {class: 'modal-lg'});
  }

  showPreview() {
    this.previewModalRef = this.modalService.show(PreviewComponent, {class: 'modal-lg'});
  }

  showLog() {
    this.logModalRef = this.modalService.show(CaptureLogComponent, {class: 'modal-lg'});
  }

  showCrop() {
    this.cropModalRef = this.modalService.show(CropComponent, {class: 'modal-lg'});
  }


}
