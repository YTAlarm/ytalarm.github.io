import { RandomBackgroundService } from './services/random-background.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'ytalarm';
  constructor(private randomBackgroundService: RandomBackgroundService) {}
}
