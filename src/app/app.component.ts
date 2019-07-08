import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  
  playFlg: boolean
  video: any
  seekbar: any
  volumebar: any

  @ViewChild('video', {read: ElementRef}) private videoRef: ElementRef
  @ViewChild('seekbar', {read: ElementRef}) private seekBarRef: ElementRef
  @ViewChild('volumebar', {read: ElementRef}) private volumeBarRef: ElementRef

  ngAfterViewInit() {
    this.video = this.videoRef.nativeElement
    this.seekbar = this.seekBarRef.nativeElement
    this.volumebar = this.volumeBarRef.nativeElement
  }

  playPause() {
    if(this.playFlg) {
      this.video.pause()
    }else {
      this.video.play()
    }
    this.playFlg = this.playFlg ? false : true
  }
  play() {
    if(this.playFlg) {
      this.video.play()
    }
  }
  pause() {
    this.video.pause()
  }
  muted() {
    this.video.muted = this.video.muted ? false : true
  }
  fullscreen() {
    if(this.video.requestFullscreen) {
      this.video.requestFullscreen()
    }else if(this.video.mozRequestFullscreen) {
      this.video.mozRequestFullscreen()
    }else if(this.video.webkitRequestFullscreen) {
      this.video.webkitRequestFullscreen()
    }
  }
  seekbarChange() {
    const time = this.video.duration * (this.seekbar.value / 100)
    this.video.currentTime = time
  }
  timeUpdate() {
    const value = (100 / this.video.duration) * this.video.currentTime
    this.seekbar.value = value
  }
  volumeChange() {
    this.video.volume = this.volumebar.value
  }
}
