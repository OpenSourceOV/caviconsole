import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import { DataService, DataItem, DataPoint } from '../data.service';
import { SocketService } from '../socket.service';
import { ConfigService } from '../config.service';
import * as moment from 'moment';
import { AppConstants } from '../app.constants';

interface PreviewImage {
  dataItem: DataItem,
  timestamp: any,
  image: any,
  processedImage: any,
  original: boolean,
  visible: boolean,
  src: string,
  processedSrc: string,
}

interface IndexRange {
  start: number,
  end: number
}

@Component({
  selector: 'modal-content',
  templateUrl: './point-editor.component.html',
  styleUrls: ['./point-editor.component.scss']
})
export class PointEditorComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('canvas') canvas: ElementRef;

  @HostListener('window:keydown', ['$event'])
  
  onKeyDown(event) {
    if(this.loading) {
      return;
    }
    switch(event.key) {
      case "ArrowUp":
      case "ArrowRight":
        this.swipe(this.SWIPE_ACTION.LEFT);
        break;
      case "ArrowDown":
      case "ArrowLeft":
        this.swipe(this.SWIPE_ACTION.RIGHT);
        break;
    }    
  }

  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
  PREVIEW_RANGE = 2

  public loading: boolean = true;
  private componentDestroyed: Subject<boolean> = new Subject<boolean>();
  private context: any;
  private dataItem: DataItem;
  private _dataItemIndex: number;
  private _totalNumImages: number;
  public _currentIndex: number;
  private _dataIndexRange: IndexRange;
  public currentDataItem: DataItem;
  public captureDimensions: any;
  public area: number;
  public processed: boolean = false;

  public images:PreviewImage[] = []

  constructor(
    private dataService: DataService,
    public bsModalRef: BsModalRef,
    private socketService: SocketService,
    public configService: ConfigService,
    private appConstants: AppConstants
  ) { 
    
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this._dataItemIndex = this.bsModalRef.content.dataItemIndex;
      this.dataItem = this.dataService.data[this._dataItemIndex];
      this.loadImages();
    });
  }

  loadImages() {
    this.images = []
    this._dataIndexRange = {
      start: this._dataItemIndex > this.PREVIEW_RANGE ? this._dataItemIndex - this.PREVIEW_RANGE : 0,
      end: (this._dataItemIndex + this.PREVIEW_RANGE) <= (this.dataService.data.length - 1) ? (this._dataItemIndex + this.PREVIEW_RANGE) : this.dataService.data.length - 1, 
    }
    let imageLoaded = () => {
      this._totalNumImages = this._totalNumImages - 1
      if(this._totalNumImages == 0) {
        this.loading = false;
      }
    }
    this._totalNumImages = (this._dataIndexRange.end - this._dataIndexRange.start + 1) * 2;
    for(let i = this._dataIndexRange.start; i <= this._dataIndexRange.end; i++) {
      let previewImage: PreviewImage = {
        image: new Image(),
        processedImage: new Image(),
        dataItem: this.dataService.data[i],
        timestamp: moment(this.dataService.data[i].timestamp, "YYYYMMDD-HHmmss").format('MM/DD/YYYY HH:mm:ss'),
        original: this.dataService.data[i].id == this.dataItem.id, 
        visible: this.dataService.data[i].id == this.dataItem.id,
        src: `${this.appConstants.serverURL}/captured-image/${this.dataService.data[i].filename}`,
        processedSrc: `${this.appConstants.serverURL}/processed-image/${this.dataService.data[i].filename}`
      }
      previewImage.image.src = previewImage.src
      previewImage.processedImage.src = previewImage.processedSrc
      previewImage.image.onload = imageLoaded
      previewImage.processedImage.onload = imageLoaded
      this.images.push(previewImage)
    }
    this._currentIndex = this.images.findIndex((item) => item.visible);
    this.currentDataItem = this.images[this._currentIndex].dataItem
    this.area = this.currentDataItem.area
  }

  swipe(action) {

    if (action === this.SWIPE_ACTION.LEFT) {
      if(this._currentIndex == (this.images.length - 1)) {
        return
      }
      this._currentIndex++;
    }

    // swipe left, previous avatar
    if (action === this.SWIPE_ACTION.RIGHT) {
      if(this._currentIndex == 0) {
        return
      }
      this._currentIndex--;
    }

    this.images.forEach((x, i) => x.visible = (i === this._currentIndex));
    this.currentDataItem = this.images[this._currentIndex].dataItem
    this.area = this.currentDataItem.area
  }

  updateArea() {
    this.currentDataItem.area = this.area
    this.dataService.updateData(this.currentDataItem);
  }

  ngOnInit() {
    this.captureDimensions = this.configService.getCaptureDimensions()
  }

  ngOnDestroy() {
    this.componentDestroyed.next(true);
    this.componentDestroyed.complete();
  }

}
