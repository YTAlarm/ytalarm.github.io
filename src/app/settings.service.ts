import { Injectable } from '@angular/core';
import { map, interval, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  date: Observable<Date>;
  isOpen: boolean;

  constructor() {
    this.date = interval(1000).pipe(
      map(() => {
        return new Date();
      })
    );

    this.isOpen = false;
  }

  openSettings() {
    this.isOpen = true;
  }

  closeSettings() {
    this.isOpen = false;
  }
}
