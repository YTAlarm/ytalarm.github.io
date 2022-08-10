import { NotificationsService } from './../services/notifications.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.sass'],
})
export class NotificationsComponent implements OnInit {
  constructor(public notificationService: NotificationsService) {}
  ngOnInit(): void {}

  remove(any: any) {
    console.log(any);
  }
}
