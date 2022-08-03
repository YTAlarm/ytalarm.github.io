import { TestBed } from '@angular/core/testing';

import { RandomBackgroundService } from './random-background.service';

describe('RandomBackgroundService', () => {
  let service: RandomBackgroundService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RandomBackgroundService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
