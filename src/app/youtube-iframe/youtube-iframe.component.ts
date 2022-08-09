import { Component, OnInit } from '@angular/core';
import { VideoControlService } from '../services/video-control.service';

@Component({
  selector: 'app-youtube-iframe',
  templateUrl: './youtube-iframe.component.html',
  styleUrls: ['./youtube-iframe.component.sass'],
})
export class YoutubeIframeComponent implements OnInit {
  constructor(private VideoControlService: VideoControlService) {}

  ngOnInit(): void {}
}
