import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcuantIdCaptureRoutingModule } from './acuant-id-capture-routing.module';
import { FrontCaptureComponent } from './components/front-capture/front-capture.component';

import { NgFadAcuantModule } from '@fad-producto/ng-fad-acuant';
import { SideToCaptureComponent } from './components/side-to-capture/side-to-capture.component';
import { BackCaptureComponent } from './components/back-capture/back-capture.component';


@NgModule({
  declarations: [FrontCaptureComponent, SideToCaptureComponent, BackCaptureComponent],
  imports: [
    CommonModule,
    AcuantIdCaptureRoutingModule,
    NgFadAcuantModule
  ]
})
export class AcuantIdCaptureModule { }
