import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';

import { AppComponent } from './app.component';
import { ControllerDirective } from './directive/controller.directive';
import { VideoControllerComponent } from './component/video-controller/video-controller.component';

@NgModule({
  declarations: [
    AppComponent,
    ControllerDirective,
    VideoControllerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [VideoControllerComponent]
})
export class AppModule { }
