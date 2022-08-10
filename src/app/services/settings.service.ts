import { NotificationsService } from './notifications.service';
import { VideoControlService } from './video-control.service';
import { Injectable } from '@angular/core';
import { map, interval, Observable, Subscription, timer } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { HttpClient } from '@angular/common/http';
import { UtilsService } from './utils.service';

export class VideoMetadata {
  constructor(
    videoId: string,
    http: HttpClient,
    removeVideo: Function,
    addNotification: Function
  ) {
    http
      .get(
        `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
      )
      .subscribe({
        next: (data: any) => {
          this.thumbnailUrl = data.thumbnail_url;
          this.title = data.title;
        },
        error: (error) => {
          removeVideo(this.id);
          addNotification(
            `Video ${this.videoId} failed to load.`,
            'error',
            5000
          );
        },
      });
    this.videoId = videoId;
  }

  thumbnailUrl = './assets/backgrounds/placeholder.jpg';
  videoId: string;
  title = 'Loading...';
  id = uuidv4();
}

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(
    private videoControl: VideoControlService,
    private http: HttpClient,
    private utils: UtilsService,
    private notificationsService: NotificationsService
  ) {
    this.currentDate$ = interval(1000).pipe(
      map(() => {
        return new Date();
      })
    );
  }

  public alarmDate?: Date;
  public alarmPlaying: boolean = false;
  public currentDate$: Observable<Date>;
  public isOpen: boolean = false;
  playlist: VideoMetadata[] = [
    new VideoMetadata(
      'k4Xx0k_TVY0',
      this.http,
      this.removeVideo.bind(this),
      this.notificationsService.addNotification.bind(this.notificationsService)
    ),
    new VideoMetadata(
      'xsRPz9PF1EE',
      this.http,
      this.removeVideo.bind(this),
      this.notificationsService.addNotification.bind(this.notificationsService)
    ),
    new VideoMetadata(
      'bxYhJpILIQE',
      this.http,
      this.removeVideo.bind(this),
      this.notificationsService.addNotification.bind(this.notificationsService)
    ),
  ];
  timeout?: Subscription;
  day: number = 1000 * 60 * 60 * 24;

  openSettings() {
    this.isOpen = true;
    this.timeout?.unsubscribe();
    this.videoControl.destroyPlayer();
  }

  closeSettings() {
    this.isOpen = false;
  }

  cleanUp() {
    this.timeout?.unsubscribe();
    this.videoControl.destroyPlayer();
    this.alarmDate = undefined;
    this.alarmPlaying = false;
  }

  cancel() {
    this.cleanUp();
    this.closeSettings();
  }

  setAlarm() {
    if (this.alarmDate && this.playlist.length) {
      this.closeSettings();
      this.timeout?.unsubscribe();
      this.timeout = timer(this.alarmDate).subscribe(() => {
        this.videoControl.createPlayer(this.playlist, this.cleanUp.bind(this));
        this.alarmPlaying = true;
      });
      this.notificationsService.addNotification(
        'Alarm set successfully.',
        'success'
      );
    } else {
      if (!this.alarmDate) {
        this.notificationsService.addNotification(
          'Set an alarm date.',
          'error',
          5000
        );
      }
      if (!this.playlist.length) {
        this.notificationsService.addNotification('Add a song.', 'error', 5000);
      }
    }
  }

  setAlarmDate(date: Date) {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const day = currentDate.getDate();

    const hour = date.getHours();
    const minutes = date.getMinutes();

    const newDate = new Date(year, month, day, hour, minutes);

    this.alarmDate =
      newDate.getTime() < currentDate.getTime()
        ? new Date(newDate.getTime() + this.day)
        : newDate;
  }

  addVideo(input: string) {
    this.playlist.push(
      new VideoMetadata(
        this.utils.youtubeVideoIdFromUrl(input),
        this.http,
        this.removeVideo.bind(this),
        this.notificationsService.addNotification.bind(
          this.notificationsService
        )
      )
    );
  }

  removeVideo(id: string) {
    this.playlist = this.playlist.filter(
      (videoMetadata) => videoMetadata.id !== id
    );
  }
}
