import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PruebaDeVidaComponent } from './components/prueba-de-vida/prueba-de-vida.component';
import { VideotapingComponent } from './components/videotaping/videotaping.component';
import { VideoagreetmentComponent } from './components/videoagreetment/videoagreetment.component';

import { NgFadFacetecModule } from '@fad-producto/ng-fad-facetec';
import { NgFadVideotapingModule } from '@fad-producto/ng-fad-videotaping';
import { NgFadVideoagreementModule } from '@fad-producto/ng-fad-videoagreement';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PruebaDeVidaComponent,
    VideotapingComponent,
    VideoagreetmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    NgFadFacetecModule,
    NgFadVideotapingModule,
    NgFadVideoagreementModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
