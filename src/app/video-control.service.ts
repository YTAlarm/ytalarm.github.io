import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VideoControlService {
  player?: YT.Player;
  constructor() {
    if (YT.Player) {
      this.player = this.newVideo('SY3FTREdVs0');
    }

    window.onYouTubeIframeAPIReady = () => {
      this.player = this.newVideo('SY3FTREdVs0');
    };
  }

  private newVideo(id: string) {
    return new YT.Player('player', {
      videoId: id,
      playerVars: {
        playsinline: 1,
      },
    });
  }

  public play() {
    if (this.player) this.player.playVideo();
  }

  public stop() {
    if (this.player) this.player.pauseVideo();
  }
}
