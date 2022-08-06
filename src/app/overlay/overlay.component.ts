import { SettingsService } from './../settings.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.sass'],
})
export class OverlayComponent implements OnInit {
  date: Date;

  constructor(public settingsService: SettingsService) {
    this.date = new Date();
  }

  ngOnInit(): void {
    this.settingsService.date.subscribe((value) => {
      this.date = value;
    });
  }

  setAlarm() {
    this.settingsService.openSettings();
  }
}
