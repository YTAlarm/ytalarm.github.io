import { VideoControlService } from './video-control.service';
import { Injectable } from '@angular/core';
import { map, interval, Observable, Subscription, timer } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { HttpClient } from '@angular/common/http';
import { UtilsService } from './utils.service';

export class VideoMetadata {
  constructor(videoId: string, http: HttpClient, removeVideo: Function) {
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
          console.log(error);
          removeVideo(this.id);
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
    private utils: UtilsService
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
    new VideoMetadata('k4Xx0k_TVY0', this.http, this.removeVideo.bind(this)),
    new VideoMetadata('xsRPz9PF1EE', this.http, this.removeVideo.bind(this)),
    new VideoMetadata('bxYhJpILIQE', this.http, this.removeVideo.bind(this)),
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

  setAlarm() {
    if (this.alarmDate && this.playlist.length) {
      this.closeSettings();
      this.timeout?.unsubscribe();
      this.timeout = timer(this.alarmDate).subscribe(() => {
        this.videoControl.createPlayer(this.playlist, this.cleanUp.bind(this));
        this.alarmPlaying = true;
      });
    }
  }

  setAlarmDate(date: Date) {
    const now = new Date().getTime();
    const alarmDate = date.getTime();
    const difference = Math.abs(alarmDate - now);
    const remainder = difference % this.day;
    this.alarmDate = new Date(now + remainder);
  }

  addVideo(input: string) {
    this.playlist.push(
      new VideoMetadata(
        this.utils.youtubeVideoIdFromUrl(input),
        this.http,
        this.removeVideo.bind(this)
      )
    );
  }

  removeVideo(id: string) {
    this.playlist = this.playlist.filter(
      (videoMetadata) => videoMetadata.id !== id
    );
  }
}
