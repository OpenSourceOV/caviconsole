import { Component, OnInit, OnDestroy, Input, ViewChild, ElementRef } from '@angular/core';
import Chart from 'chart.js';
import { DataService, DataItem, DataPoint } from '../../../data.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/filter';
import * as moment from 'moment';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { PointEditorComponent } from '../../../point-editor/point-editor.component';

@Component({
  selector: 'data-plot',
  template: `
    <div class="chart-container">
      <canvas #dataPlot id="dataPlot" (click)="clickChart($event)" (touchstart)="touchChart($event)"></canvas>
      <button type="button" class="btn btn-sm btn-cumulative" [ngClass]="{'btn-primary': dataService.isCumulative, 'btn-secondary': !dataService.isCumulative}" (click)="toggleCumulative()">Cumulative</button>
    </div>
  `,
  styleUrls: ['./data-plot.component.scss']
})
export class DataPlotComponent implements OnInit, OnDestroy {
  
  @ViewChild('dataPlot') dataPlot: ElementRef;
  
  private chart: any;
  private cumulativeTotal:number = 0;
  private componentDestroyed: Subject<boolean> = new Subject<boolean>();
  public isCumulative: boolean = false;
  private chartDataSet = {
    datasets: [{
      label: 'Dataset',
      lineTension: 0,
      borderColor: '#ff6384',
      borderWidth: 1,
      backgroundColor: '#ff6384',
      // backgroundColor: 'rgba(0, 0, 0, 0)',
      fill: false,
      data: []
    }]
  }
  public pointEditorModalRef: BsModalRef;
  
  @Input()
  reloadData: Subject<any>;

  constructor(
    public dataService: DataService,
    private modalService: BsModalService
  ) { 
  }

  ngOnDestroy() {
    this.componentDestroyed.next(true);
    this.componentDestroyed.complete();
    this.reloadData.unsubscribe();
  }

  ngOnInit() {
    this.isCumulative = this.dataService.isCumulative
    this.dataService.dataPoints
      .asObservable()
      .takeUntil(this.componentDestroyed.asObservable())
      .subscribe((dataPoints: DataPoint[]) => {
        console.log("Bulk data points update", dataPoints);
        if(!this.chart) {
          this.initChart(dataPoints);
        }
        this.chart.data.datasets[0].data = dataPoints;
        this.chart.update();
      })
    this.dataService.newDataPoints
      .asObservable()
      .takeUntil(this.componentDestroyed.asObservable())
      .subscribe((dataPoints: DataPoint[]) => {
        console.log("New data points update", dataPoints);
        if(!this.chart) {
          this.initChart(dataPoints);
        }
        console.log("data before", this.chart.data.datasets[0].data);
        for(let point of dataPoints) {
          this.chart.data.datasets[0].data.push(point);
        }
        console.log("data after", this.chart.data.datasets[0].data);
        this.chart.update();
      })

    this.reloadData.subscribe(event => {
      console.log("Reload event!!");
      this.dataService.reloadData();
    })

  }

  toggleCumulative() {
    this.dataService.toggleCumulativeData();
    if(this.dataService.isCumulative) {
      this.chart.config.type = "line"
      // this.chart.config.data.datasets[0].type = type;
    } else {
      this.chart.config.type = "bar"
      // this.chart.type = "scatter"
    }
    setTimeout(() => {
      this.chart.update();
    });
  }

  clickChart(event) {
    console.log("Chart click event");
    let item = this.chart.getElementAtEvent(event)[0];
    if (item) {
      this.editDataItemAtIndex(item._index);
    }
  }

  touchChart(event) {
    console.log("Chart touch event");
    let item = this.chart.getElementAtEvent(event)[0];
    if (item) {
      this.editDataItemAtIndex(item._index);
    }
  }

  editDataItemAtIndex(index: number) {
    this.pointEditorModalRef = this.modalService.show(PointEditorComponent, {class: 'modal-lg', ignoreBackdropClick: true});
    this.pointEditorModalRef.content.dataItemIndex = index;
  }

  initChart(dataPoints: DataPoint[]) {
    Chart.defaults.global.legend = false
    // Chart.defaults.bar.barPercentage = 0.1
    // Chart.defaults.bar.categoryPercentage = 0.1
    Chart.defaults.bar.maxBarThickness = 0.1
    // Chart.defaults.bar.barThickness = 0.2
    
    this.chartDataSet.datasets[0].data = dataPoints;

    this.chart = new Chart('dataPlot', {
      type: 'bar',
      data: this.chartDataSet,
      options: {
        maintainAspectRatio: false,
        events: ['click'],
        // animation: {
        //   duration: 0
        // },
        scales: {
          xAxes: [{
            type: "time",
            display: true,
            scaleLabel: {
              display: false,
              labelString: 'Date'
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero:true
            }
          }]
        }
      }
    })    
  }
  
}
