import { map } from 'rxjs';
import { SettingsService } from '../services/settings.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.sass'],
})
export class OverlayComponent implements OnInit {
  date: Date;
  remaining?: number;

  constructor(public settingsService: SettingsService) {
    this.date = new Date();
    this.settingsService.currentDate$.subscribe((value) => {
      this.date = value;
    });

    this.settingsService.currentDate$
      .pipe(
        map((date) => {
          if (this.settingsService.alarmDate) {
            return this.settingsService.alarmDate.getTime() - date.getTime();
          }
          return undefined;
        })
      )
      .subscribe((val) => {
        this.remaining = val;
      });
  }

  ngOnInit(): void {}

  setAlarm() {
    this.settingsService.openSettings();
  }
}
