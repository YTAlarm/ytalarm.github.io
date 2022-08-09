import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { YoutubeIframeComponent } from './youtube-iframe/youtube-iframe.component';
import { OverlayComponent } from './overlay/overlay.component';
import { SettingsComponent } from './settings/settings.component';

import {
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
  OWL_DATE_TIME_FORMATS,
} from 'ng-pick-datetime';
import { TimeRemainingPipe } from './pipes/time-remaining.pipe';

@NgModule({
  declarations: [
    AppComponent,
    YoutubeIframeComponent,
    OverlayComponent,
    SettingsComponent,
    TimeRemainingPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    DragDropModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: OWL_DATE_TIME_FORMATS,
      useValue: {
        timePickerInput: { hour: 'numeric', minute: 'numeric', hour12: false },
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
