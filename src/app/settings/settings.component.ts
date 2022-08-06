import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

type VideoMetadata = {
  title: string;
  thumbnailUrl: string;
  id: string;
};

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass'],
})
export class SettingsComponent implements OnInit {
  time?: Date;
  videoList = [
    {
      title: 'La Caution - Thé à la Menthe - The Laser Dance Song',
      thumbnailUrl: 'https://i.ytimg.com/vi/k4Xx0k_TVY0/hqdefault.jpg',
      id: 'k4Xx0k_TVY0',
    },
    {
      title: 'La Caution - Thé à la Menthe - The Laser Dance Song',
      thumbnailUrl: 'https://i.ytimg.com/vi/k4Xx0k_TVY0/hqdefault.jpg',
      id: 'k4Xx0k_TVY0',
    },
    {
      title: 'La Caution - Thé à la Menthe - The Laser Dance Song',
      thumbnailUrl: 'https://i.ytimg.com/vi/k4Xx0k_TVY0/hqdefault.jpg',
      id: 'k4Xx0k_TVY0',
    },
    {
      title:
        'La Caution - Thé à la Menthe - The Laser Dance SongLa Caution - Thé à la Menthe - The Laser Dance Song',
      thumbnailUrl: 'https://i.ytimg.com/vi/k4Xx0k_TVY0/hqdefault.jpg',
      id: 'k4Xx0k_TVY0',
    },
  ];
  constructor() {}

  ngOnInit(): void {}

  setAlarm() {
    console.log(this.time);
  }

  drop(event: CdkDragDrop<VideoMetadata[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
