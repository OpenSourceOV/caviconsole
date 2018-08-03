import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';
import { ConfigService } from './config.service';
import { PiService } from './pi.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';

export interface DataItem {
  id: number,
  area: any,
  filename: string,
  processed: number,
  processing: number,
  skip: number,
  timestamp: string
}

export interface DataPoint {
  x?: any,
  t?: any,
  label?: any,
  y: any
}

export interface QueueSummary {
  total: number,
  processed: number
}


@Injectable()
export class DataService {

  public _dataPoints: DataPoint[] = []
  private _cumulativeTotal: number = 0
  public isCumulative: boolean = false
  public data: DataItem[] = []
  private skipPointUpdates: boolean = false
  private reprocessing: boolean = false

  public queueSummary: BehaviorSubject<QueueSummary> = new BehaviorSubject(null);
  public dataPoints: BehaviorSubject<DataPoint[]> = new BehaviorSubject([])
  public newDataPoints: BehaviorSubject<DataPoint[]> = new BehaviorSubject([])
  public dbConnected: BehaviorSubject<boolean> = new BehaviorSubject(false)
  private gettingLatestData: boolean = false


  constructor(
    private socketService: SocketService,
    private configService: ConfigService,
    private piService: PiService
  ) { 
    this.setupSocketEvents();
    configService.configLoaded.subscribe((loaded) => {
      if(loaded == true) {
        socketService.socket.emit('data:db:connect');
      }
    });
    piService.processing.subscribe((processing) => {
      if(processing == true && this.reprocessing == false) {
        this.getLatestData();
      }
    });
    piService.reprocessing.subscribe((reprocessing) => {
      console.log("Data service: reprocessing", reprocessing);
      if(this.reprocessing == true && reprocessing == false) {
        console.log("Processing is finished - reloading data");
        this.reloadData();
      } else {
        console.log("Data service: setting reprocessing:", reprocessing);
        this.reprocessing = reprocessing;
      }
    });
  }

  setupSocketEvents() {
    this.socketService.socket.on('capture:db', (data) => {
      this.socketService.socket.emit("data:db:connect");   
    })
    
    this.socketService.socket.on('data:db:connected', (data) => {
      this.dbConnected.next(true);
      this.reloadData();
    })

    this.socketService.socket.on('data:db:data:all', (data: DataItem[]) => {
      this.data = data;
      this._cumulativeTotal = 0
      this.loadData(data);
    })

    this.socketService.socket.on('data:db:missing', () => {
      this.dbConnected.next(false);
    })

    this.socketService.socket.on('data:updated', (dataItem) => {
      this.setDataItemUpdated(dataItem);
      console.log("Data item updated", dataItem);
    })
    
    this.socketService.socket.on('data:queue:summary', (summary) => {
      this.queueSummary.next(summary);
    })

    this.socketService.socket.on('data:db:data:latest', (data: DataItem[]) => {
      if(data.length) {
        this.data = this.data.concat(data);
        this.loadData(data, true);
      }
    })
  }

  getQueueSummary() {
    this.socketService.socket.emit('data:get:queue:summary');    
  }

  exportData() {
    this.socketService.socket.emit("data:export");
  }

  resetData() {
    console.log("Resetting data");
    this._cumulativeTotal = 0
    this.data = [];
    this.dataPoints.next([]);
    this.newDataPoints.next([]);
  }

  setDataItemUpdated(dataItem: DataItem) {
    this.data = this.data.map((item) => {
      if(item.id == dataItem.id) {
        item.area = parseInt(dataItem.area)
        // console.log("UPdated item", item);
      }
      return item;
    });
    this.loadData(this.data);
  }

  getLatestData() {
    console.log("Getting latest data");
    if(this.piService.processing.getValue() == true) {
      if(this.data.length) {
        let lastId = this.data[this.data.length - 1].id
        this.socketService.socket.emit("data:get:latest", lastId);
      } else {
        this.socketService.socket.emit("data:get:all");
      }
      setTimeout(() => { this.getLatestData() }, 2000);
    } else {
      this.gettingLatestData = false;
    }
  }

  loadData(data: DataItem[], newData: boolean = false) {
    this._dataPoints = []
    for(let item of data) {
      this._dataPoints.push(this.createDataPoint(item));
    }
    if(this.skipPointUpdates) {
      return;
    }
    if(newData) {
      this.newDataPoints.next(this._dataPoints);
    } else {
      this.dataPoints.next(this._dataPoints);
    }
  }

  updateData(dataItem: DataItem) {
    console.log("Updating dataitem", dataItem);
    this.socketService.socket.emit("data:update", dataItem);
  }

  deleteData(dataItem: DataItem) {
    console.log("Deleting dataitem", dataItem);
    this.socketService.socket.emit("data:delete", dataItem);
  }

  reloadData() {
    this.socketService.socket.emit("data:reload");   
  }

  toggleCumulativeData() {
    this.skipPointUpdates = true;
    this._cumulativeTotal = 0;
    this.isCumulative = !this.isCumulative
    this.loadData(this.data);    
    this.dataPoints.next(this._dataPoints);
    this.skipPointUpdates = false;
  }

  createDataPoint(dataItem: DataItem): DataPoint {
    if(this.isCumulative) {
      this._cumulativeTotal += dataItem.area
    }
    console.log("Cumulative total", this._cumulativeTotal);
    let point: DataPoint = {
      t: moment(dataItem.timestamp, "YYYYMMDD-HHmmss").valueOf(),
      label: moment(dataItem.timestamp, "YYYYMMDD-HHmmss"),
      x: moment(dataItem.timestamp, "YYYYMMDD-HHmmss").format('MM/DD/YYYY HH:mm:ss'),
      y: this.isCumulative ? this._cumulativeTotal : dataItem.area
    }
    return point;
  }


}
