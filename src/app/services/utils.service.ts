import { Injectable } from '@angular/core';

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
}
