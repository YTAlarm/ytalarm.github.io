import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RandomBackgroundService {
  private baseRoute = './assets/backgrounds/' as const;
  private imageNames = [
    'aron-visuals-4zxSWESyZio-unsplash.jpeg',
    'clint-mckoy-dxe6QlGBvg8-unsplash.jpeg',
    'mael-balland-GBBa67P8tyo-unsplash.jpeg',
    'nathan-anderson-bjzO6TTjEXE-unsplash.jpeg',
    'patrick-hendry-RC_RO35gL44-unsplash.jpeg',
    'ruan-richard-rodrigues-8j9JKbDZz9g-unsplash.jpeg',
    'ryan-hutton-Jztmx9yqjBw-unsplash.jpeg',
    'tanzir-munna-iHy9d1JBZTA-unsplash.jpeg',
  ] as const;

  private randomImageName() {
    return this.imageNames[Math.floor(Math.random() * this.imageNames.length)];
  }

  private setBackground() {
    document.body.style.backgroundImage = `url("${
      this.baseRoute
    }${this.randomImageName()}")`;
  }

  constructor() {
    this.setBackground();
  }
}
