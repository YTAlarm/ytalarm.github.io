import { Injectable } from '@angular/core';
import { VideoMetadata } from './settings.service';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  youtubeVideoIdFromUrl(url: string) {
    try {
      return new URLSearchParams(new URL(url).search).get('v') || url;
    } catch (err) {
      return url;
    }
  }

  validPlaylist(variable: any): boolean {
    if (!Array.isArray(variable)) {
      return false;
    }

    if (!variable.length) {
      return false;
    }

    for (let item of variable) {
      if (!this.validVideoMetadata(item)) {
        return false;
      }
    }

    return true;
  }

  validVideoMetadata(variable: any): boolean {
    if (!(variable instanceof Object)) {
      return false;
    }
    if (typeof variable.thumbnailUrl !== 'string') {
      return false;
    }
    if (typeof variable.videoId !== 'string') {
      return false;
    }
    if (typeof variable.id !== 'string') {
      return false;
    }
    if (typeof variable.loaded !== 'boolean') {
      return false;
    }
    return true;
  }
}
