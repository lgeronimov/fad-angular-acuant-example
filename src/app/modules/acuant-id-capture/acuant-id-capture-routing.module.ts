import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FrontCaptureComponent } from './components/front-capture/front-capture.component';
import { SideToCaptureComponent } from './components/side-to-capture/side-to-capture.component';
import { BackCaptureComponent } from './components/back-capture/back-capture.component';


const routes: Routes = [  
  {path: 'side-to-capture', component: SideToCaptureComponent},
  {path: 'front-capture/:isRelated', component: FrontCaptureComponent},
  {path: 'back-capture', component: BackCaptureComponent},
  {path: 'both-sides', redirectTo:  'front-capture/relate'},
  {path: '', redirectTo: '/side-to-capture', pathMatch: 'full'},
  {path: '**', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcuantIdCaptureRoutingModule { }
