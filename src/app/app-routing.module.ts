import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PruebaDeVidaComponent } from './components/prueba-de-vida/prueba-de-vida.component';
import { VideotapingComponent } from './components/videotaping/videotaping.component';
import { VideoagreetmentComponent } from './components/videoagreetment/videoagreetment.component';

const routes: Routes = [
  {path: "home", component: HomeComponent},
  {path: "acuant-capture", loadChildren: () => import('./modules/acuant-id-capture/acuant-id-capture.module').then(m => m.AcuantIdCaptureModule)},
  {path: "prueba-de-vida", component: PruebaDeVidaComponent},
  {path: "video-taping", component: VideotapingComponent},
  {path: "video-grabacion", component: VideoagreetmentComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: "reload"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
