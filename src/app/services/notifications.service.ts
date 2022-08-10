import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

export class Notification {
  message: string;
  type: 'error' | 'success';
  id: string;
  removeNotification: Function;

  constructor(
    message: string,
    type: 'error' | 'success',
    expire: number = 2000,
    removeNotification: Function
  ) {
    this.message = message;
    this.type = type;
    this.removeNotification = removeNotification;
    this.id = uuidv4();

    setTimeout(() => {
      this.removeNotification(this.id);
    }, expire);
  }

  remove() {
    this.removeNotification(this.id);
  }
}

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor() {}

  notifications: Notification[] = [];

  addNotification(message: string, type: 'error' | 'success', expire?: number) {
    this.notifications.push(
      new Notification(
        message,
        type,
        expire,
        this.removeNotification.bind(this)
      )
    );
  }

  removeNotification(id: string) {
    this.notifications = this.notifications.filter(
      (notification) => notification.id !== id
    );
  }
}
