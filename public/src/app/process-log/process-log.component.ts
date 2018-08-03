import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { LogService, LogEntry } from '../log.service';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';


@Component({
  selector: 'modal-content',
  templateUrl: './process-log.component.html',
  styleUrls: ['./process-log.component.scss']
})
export class ProcessLogComponent implements OnInit, OnDestroy {

  private componentDestroyed: Subject<boolean> = new Subject<boolean>();

  @ViewChild('logElement') logElement: ElementRef;

  log: LogEntry[] = []

  constructor(
    public logService: LogService,
    public bsModalRef: BsModalRef,
  ) { 
  }

  ngOnInit() {
    this.logService.processLog.takeUntil(this.componentDestroyed.asObservable()).subscribe((log: LogEntry[]) => {
      this.log = log;
      setTimeout(() => {
        this.logElement.nativeElement.scrollTop = this.logElement.nativeElement.scrollHeight;
      })
    })    
  }

  ngOnDestroy() {
    this.componentDestroyed.next(true);
    this.componentDestroyed.complete();
  }

}
