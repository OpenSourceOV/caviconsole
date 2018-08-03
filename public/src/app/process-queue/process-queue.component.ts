import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { DataService, QueueSummary } from '../data.service';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';


@Component({
  selector: 'modal-content',
  templateUrl: './process-queue.component.html',
  styleUrls: ['./process-queue.component.scss']
})
export class ProcessQueueComponent implements OnInit, OnDestroy {

  private componentDestroyed: Subject<boolean> = new Subject<boolean>();
  public queueSummary: QueueSummary;
  queueCaller

  @ViewChild('logElement') logElement: ElementRef;

  constructor(
    public dataService: DataService,
    public bsModalRef: BsModalRef,
  ) { 
  }

  ngOnInit() {
    this.dataService.queueSummary.takeUntil(this.componentDestroyed.asObservable()).subscribe((summary: QueueSummary) => {
      console.log("Updating summary");
      this.queueSummary = summary;
      setTimeout(() => {
        this.dataService.getQueueSummary();
      }, 2000);
    })    
  }

  ngOnDestroy() {
    this.componentDestroyed.next(true);
    this.componentDestroyed.complete();
  }

}
