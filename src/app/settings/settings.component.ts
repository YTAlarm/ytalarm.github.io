import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { FormBuilder } from '@angular/forms';
import { SettingsService } from '../services/settings.service';
import { VideoMetadata } from '../services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass'],
})
export class SettingsComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    public settings: SettingsService
  ) {}

  videoIdForm = this.formBuilder.group({
    videoId: '',
  });

  ngOnInit(): void {}

  setAlarm() {
    this.settings.setAlarm();
  }

  addVideo() {
    if (this.videoIdForm.value.videoId) {
      this.settings.addVideo(this.videoIdForm.value.videoId);
    }

    this.videoIdForm.reset();
  }

  removeVideo(id: string) {
    this.settings.removeVideo(id);
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
