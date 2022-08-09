import { VideoMetadata, SettingsService } from './settings.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VideoControlService {
  constructor() {}

  player?: YT.Player;

  playlist: VideoMetadata[] = [];
  counter: number = 0;

  public createPlayer(playlist: VideoMetadata[], cleanUp?: Function) {
    this.playlist = playlist;
    this.counter = 1;
    this.player = new YT.Player('player', {
      videoId: playlist[0].videoId,
      playerVars: {
        playsinline: 1,
        autoplay: 1,
        controls: 0,
      },
      events: {
        onStateChange: (code) => {
          switch (code.data) {
            case 0:
              this.loopVideos();
              break;
            case 2:
              if (cleanUp) cleanUp();
              break;
          }
        },
      },
    });
  }

  public destroyPlayer() {
    this.player?.destroy();
    this.player = undefined;
  }

  private loopVideos() {
    const videoMetadata = this.playlist[this.counter % this.playlist.length];
    if (videoMetadata && this.player) {
      this.player.loadVideoById(videoMetadata.videoId);
    }

    this.counter++;
  }
}
