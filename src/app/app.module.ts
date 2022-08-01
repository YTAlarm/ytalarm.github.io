import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { YoutubeIframeComponent } from './youtube-iframe/youtube-iframe.component';

@NgModule({
  declarations: [
    AppComponent,
    YoutubeIframeComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
