import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CaptureComponent } from './capture/capture.component';
import { PreviewComponent } from './preview/preview.component';
import { LiveComponent } from './live/live.component';
import { DataComponent } from './data/data.component';
import { ProcessLogComponent } from './process-log/process-log.component';
import { ProcessQueueComponent } from './process-queue/process-queue.component';
import { CaptureLogComponent } from './capture-log/capture-log.component';
import { AdvancedComponent } from './advanced/advanced.component';
import { CropComponent } from './crop/crop.component';
import { DataRoiComponent } from './data-roi/data-roi.component';
import { ProcessComponent } from './process/process.component';

import { ConfigService } from './config.service';
import { ConfigValidatorService } from './config-validator.service';
import { LogService } from './log.service';
import { SocketService } from './socket.service';
import { PiService } from './pi.service';
import { DataService } from './data.service';
import { DataPlotComponent } from './data/_components/data-plot/data-plot.component';
import { RoiSelectorComponent } from './data/_components/roi-selector/roi-selector.component';
import { ConfigGuard } from './config.guard';

import { ModalModule, ProgressbarModule } from 'ngx-bootstrap';
import { PointEditorComponent } from './point-editor/point-editor.component';

import { AppConstants } from './app.constants';
import { WindowService } from './window.service';

const appRoutes: Routes = [
  { path: '',
    redirectTo: '/capture',
    pathMatch: 'full'
  },
  { path: 'capture', component: CaptureComponent },
  { path: 'process', component: ProcessComponent, canActivate: [ConfigGuard] },
  { path: 'data', component: DataComponent, canActivate: [ConfigGuard] },
  { path: 'advanced', component: AdvancedComponent, canActivate: [ConfigGuard] },
];

@NgModule({
  declarations: [
    AppComponent,
    CaptureComponent,
    PreviewComponent,
    LiveComponent,
    DataComponent,
    ProcessLogComponent,
    ProcessQueueComponent,
    CaptureLogComponent,
    AdvancedComponent,
    ProcessComponent,
    CropComponent,
    DataRoiComponent,
    DataPlotComponent,
    RoiSelectorComponent,
    PointEditorComponent
  ],
  entryComponents: [
    CropComponent,
    PreviewComponent,
    LiveComponent,
    ProcessLogComponent,
    ProcessQueueComponent,
    CaptureLogComponent,
    DataRoiComponent,
    PointEditorComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ModalModule.forRoot(),
    ProgressbarModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true }
    )    
  ],
  providers: [
    ConfigService,
    ConfigValidatorService,
    PiService,
    SocketService,
    DataService,
    LogService,
    ConfigGuard,
    AppConstants,
    WindowService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
