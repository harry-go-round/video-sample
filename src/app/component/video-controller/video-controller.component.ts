import { Component, OnInit, SkipSelf, ViewContainerRef, AfterViewInit, Renderer } from '@angular/core';
import 'hammerjs';

@Component({
  selector: 'app-video-controller',
  templateUrl: './video-controller.component.html',
  styleUrls: ['./video-controller.component.css']
})
export class VideoControllerComponent implements OnInit, AfterViewInit {

  video: any
  playFlg: boolean
  time: number
  volume:number
  loadFlg: boolean

  constructor(
    @SkipSelf() vcr: ViewContainerRef,
    private renderer: Renderer
  ) {
    this.video = vcr.element.nativeElement
    this.renderer.listen(this.video, 'loadedmetadata', () => this.loadFlg = true)
  }

  ngOnInit() {
    this.volume = 1
  }
  ngAfterViewInit() {
    this.renderer.listen(this.video, 'timeupdate', () => this.timeUpdate())
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
    if(this.video.muted) {
      this.video.muted = false
      this.volume = this.video.volume
    }else {
      this.video.muted = true
      this.volume = 0
    }
    // this.video.muted = this.video.muted ? false : true
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
    const time = this.video.duration * (this.time / 100)
    this.video.currentTime = time
  }
  timeUpdate() {
    const value = (100 / this.video.duration) * this.video.currentTime
    this.time = value
  }
  volumeChange() {
    this.video.volume = this.volume
    this.video.muted = this.volume == 0 ? true : false
  }
  retMinuteSeconds(time: number) {
    const minute: number = Math.floor(time / 60)
    const seconds: number = Math.floor(time - minute * 60)
    return minute.toString() + ':' + seconds.toString().padStart(2, '0')
  }
}
