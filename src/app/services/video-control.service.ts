import { VideoMetadata } from './settings.service';
import { Injectable } from '@angular/core';
import { timer, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VideoControlService {
  constructor() {}

  player?: YT.Player;
  timeout?: Subscription;
  playlist: VideoMetadata[] = [];
  counter: number = 0;

  private createPlayer(videoMetadata: VideoMetadata) {
    this.player = new YT.Player('player', {
      videoId: videoMetadata.videoId,
      playerVars: {
        playsinline: 1,
        autoplay: 1,
        controls: 0,
      },
      events: {
        onStateChange: (code) => {
          if (code.data === 0) {
            this.loopVideos();
          }
        },
      },
    });
  }

  public setTimeout(date: Date, playlist: VideoMetadata[]) {
    this.timeout?.unsubscribe();
    this.playlist = playlist;
    this.timeout = timer(date).subscribe(() => this.loopVideos());
    this.counter = 0;
  }

  public destroyPlayer() {
    this.player?.destroy();
    this.timeout?.unsubscribe();
    this.player = undefined;
  }

  private loopVideos() {
    const videoMetadata = this.playlist[this.counter % this.playlist.length];
    if (videoMetadata) {
      if (!this.player) {
        this.createPlayer(videoMetadata);
      } else {
        this.player.loadVideoById(videoMetadata.videoId);
      }
    }

    this.counter++;
  }
}
