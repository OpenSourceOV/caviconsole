import { Component, OnInit, Output, ViewChild, ElementRef, EventEmitter, Input, OnDestroy } from '@angular/core';
import { DataService, DataItem, DataPoint } from '../../../data.service';
import { PiService } from '../../../pi.service';
import { SocketService } from '../../../socket.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import { ROI } from '../../../models/roi';

@Component({
  selector: 'roi-selector',
  template: `
    <div #container class="roi-container clearfix"
      [style.cursor]="cursorType"
      (mousemove)="doMouseMove($event)"
      (mousedown)="doMouseDown($event)"
      (touchstart)="doTouchStart($event)"
      (mouseup)="doMouseUp($event)"
      (window:resize)="onResize($event)">
      <img 
        (load)="doImageLoaded($event)" 
        [src]="imagePreviewSrc" 
        class="img-fluid" 
        *ngIf="imagePreviewSrc" />
      <div 
        #marquee 
        [style.top]="marq.top + 'px'" 
        [style.left]="marq.left + 'px'"
        [style.width]="marq.width + 'px'"
        [style.height]="marq.height + 'px'"
        class="marquee"></div>
    </div>
  `,
  styles: [`
    img {
      -webkit-user-drag: none;
    }
    .btn { 
      position: absolute; top: -46px; right: 0px;
      z-index: 100;
    }
    .roi-container {
      position: relative;
      float: left;
    }
    .marquee {
      position: absolute;
      border: 2px solid lime;
      z-index: 98;
    }
  `]
})
export class RoiSelectorComponent implements OnInit, OnDestroy {
  
  @ViewChild('container') 
  container: ElementRef;
  
  @Output() 
  roiChange: EventEmitter<ROI> = new EventEmitter();
  
  @Input() 
  roi: ROI;

  @Input()
  imagePreviewSrc: string;

  public marq = {
    top: 0,
    left: 0,
    height: 0,
    width: 0,
    hRelImageHeight: 0,
    wRelImageWidth: 0,
    topRelImageHeight: 0,
    leftRelImageWidth: 0
  }

  public cursorType: string = "crosshair"

  private componentDestroyed: Subject<boolean> = new Subject<boolean>();
  private mouseDown: boolean = false;
  private touching: boolean = false;
  private touchDisabled: boolean = false;
  private containerDimensions

  constructor(
    private dataService: DataService,
    private piService: PiService,
    private socketService: SocketService
  ) { 
  }

  ngOnInit() {
  }  

  doImageLoaded(event) {
    if(this.roi) {
      console.log("Image loaded with roi", this.roi);
      this.marq.hRelImageHeight = this.roi.hRelImageHeight;
      this.marq.wRelImageWidth = this.roi.wRelImageWidth;
      this.marq.topRelImageHeight = this.roi.topRelImageHeight;
      this.marq.leftRelImageWidth =this.roi.leftRelImageWidth;
      this.getContainerDimensions();
      this.updateMarqueePosition();
    }
  }

  onResize(event) {
    this.getContainerDimensions();
    this.updateMarqueePosition();
  }

  getMouseRelPos(event) {
    let containerXPos = this.containerDimensions.left
    let containerYPos = this.containerDimensions.top
    let mouseYPos = event.clientY
    let mouseXPos = event.clientX
    return {
      yRelHeight: (mouseYPos - containerYPos) / this.containerDimensions.height,
      xRelWidth: (mouseXPos - containerXPos) / this.containerDimensions.width
    }
  }
  
  getContainerDimensions() {
    this.containerDimensions = this.container.nativeElement.getBoundingClientRect();
  }

  doMouseDown(event) {
    if(this.touchDisabled == true || this.touching == true) {
      event.preventDefault();
      return;
    }        
    this.mouseDown = true;
    this.getContainerDimensions();
    let pos = this.getMouseRelPos(event);
    this.marq.hRelImageHeight = 0
    this.marq.wRelImageWidth = 0
    this.marq.topRelImageHeight = pos.yRelHeight
    this.marq.leftRelImageWidth = pos.xRelWidth
    this.updateMarqueePosition();
  }

  doMouseMove(event) {
    if(this.touchDisabled == true || this.touching == true) {
      event.preventDefault();
      return;
    }    
    if(this.mouseDown == true) {
      this.getContainerDimensions();
      let pos = this.getMouseRelPos(event);
      this.marq.hRelImageHeight = ((pos.yRelHeight * this.containerDimensions.height) - this.marq.top) / this.containerDimensions.height;
      this.marq.wRelImageWidth = ((pos.xRelWidth * this.containerDimensions.width) - this.marq.left) / this.containerDimensions.width;
      this.updateMarqueePosition();
    }
  }

  doMouseUp(event) {
    if(this.touchDisabled == true || this.touching == true) {
      event.preventDefault();
      return;
    }    
    this.mouseDown = false;
    this.roiChange.emit(<ROI>{
      hRelImageHeight: this.marq.hRelImageHeight,
      wRelImageWidth: this.marq.wRelImageWidth,
      topRelImageHeight: this.marq.topRelImageHeight,
      leftRelImageWidth: this.marq.leftRelImageWidth
    });
  }
  
  getTouchRelPos(event) {
    let containerXPos = this.containerDimensions.left
    let containerYPos = this.containerDimensions.top
    let touch = event.touches[0]
    let touchYPos = touch.clientY
    let touchXPos = touch.clientX
    return {
      yRelHeight: (touchYPos - containerYPos) / this.containerDimensions.height,
      xRelWidth: (touchXPos - containerXPos) / this.containerDimensions.width
    }
  }
  
  doTouchStart(event) {
    if(this.touchDisabled == true) {
      event.preventDefault();
      return;
    }
    this.touchDisabled = true;
    setTimeout(() => this.touchDisabled = false, 800);
    this.getContainerDimensions();
    if(this.touching == true) {
      let pos = this.getTouchRelPos(event);
      this.marq.hRelImageHeight = ((pos.yRelHeight * this.containerDimensions.height) - this.marq.top) / this.containerDimensions.height;
      this.marq.wRelImageWidth = ((pos.xRelWidth * this.containerDimensions.width) - this.marq.left) / this.containerDimensions.width;
      this.updateMarqueePosition();
      this.roiChange.emit(<ROI>{
        hRelImageHeight: this.marq.hRelImageHeight,
        wRelImageWidth: this.marq.wRelImageWidth,
        topRelImageHeight: this.marq.topRelImageHeight,
        leftRelImageWidth: this.marq.leftRelImageWidth
      });
      this.touching = false;
    } else {
      this.touching = true;
      let pos = this.getTouchRelPos(event);
      this.marq.hRelImageHeight = 0
      this.marq.wRelImageWidth = 0
      this.marq.topRelImageHeight = pos.yRelHeight
      this.marq.leftRelImageWidth = pos.xRelWidth
      this.updateMarqueePosition();
    }
      
  }

  // doTouchMove(event) {
  //   if(this.touching == true) {
  //     this.getContainerDimensions();
  //     let pos = this.getTouchRelPos(event);
  //     this.marq.hRelImageHeight = ((pos.yRelHeight * this.containerDimensions.height) - this.marq.top) / this.containerDimensions.height;
  //     this.marq.wRelImageWidth = ((pos.xRelWidth * this.containerDimensions.width) - this.marq.left) / this.containerDimensions.width;
  //     this.updateMarqueePosition();
  //   }
  // }

  // doTouchEnd(event) {
  //   this.touching = false;
  //   this.roiChange.emit(<ROI>{
  //     hRelImageHeight: this.marq.hRelImageHeight,
  //     wRelImageWidth: this.marq.wRelImageWidth,
  //     topRelImageHeight: this.marq.topRelImageHeight,
  //     leftRelImageWidth: this.marq.leftRelImageWidth
  //   });
  // }


  updateMarqueePosition() {
    this.containerDimensions = this.container.nativeElement.getBoundingClientRect();
    this.marq.height = this.marq.hRelImageHeight * this.containerDimensions.height
    this.marq.width = this.marq.wRelImageWidth * this.containerDimensions.width
    this.marq.left = this.marq.leftRelImageWidth * this.containerDimensions.width
    this.marq.top = this.marq.topRelImageHeight * this.containerDimensions.height
  }

  ngOnDestroy() {
    this.componentDestroyed.next(true);
    this.componentDestroyed.complete();
  }

}
