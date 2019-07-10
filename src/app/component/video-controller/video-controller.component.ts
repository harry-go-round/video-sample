import { Component, OnInit, SkipSelf, ViewContainerRef, AfterViewInit, Renderer } from '@angular/core';
import 'hammerjs';

@Component({
  selector: 'app-video-controller',
  templateUrl: './video-controller.component.html',
  styleUrls: ['./video-controller.component.css']
})
export class VideoControllerComponent implements OnInit, AfterViewInit {

  // DOM video
  video: any
  // 再生中フラグ
  playFlg: boolean
  // seek-bar time
  time: number
  // seek-bar volume
  volume:number
  // データ読み込みフラグ
  loadFlg: boolean
  // フルスクリーン制御
  document: any = document;
  // DOM videoの親
  parent: any;
  // フルスクリーンフラグ
  fullscreenFlg: boolean = false
  // コントロールエリアの幅
  controlWidth: string
  // コントロールエリア表示フラグ
  displayFlg: boolean = false

  constructor(
    @SkipSelf() vcr: ViewContainerRef,
    private renderer: Renderer,
  ) {
    this.video = vcr.element.nativeElement
    this.parent = this.video.parentElement
    // データ読み込みイベント
    this.renderer.listen(this.video, 'loadedmetadata', () => this.loadFlg = true)
    // 再生時間に到達イベント
    this.renderer.listen(this.video, 'ended', () => this.playFlg = false)
  }

  ngOnInit() {
    this.volume = 1
    console.log(this.video.offsetWidth)
    this.controlWidth = this.video.offsetWidth + 'px'
  }
  ngAfterViewInit() {
    // 再生時間更新イベント
    this.renderer.listen(this.video, 'timeupdate', () => this.timeUpdate())
  }

  /** 再生・一時停止 */
  playPause() {
    if(this.playFlg) {
      this.video.pause()
    }else {
      this.video.play()
    }
    this.playFlg = this.playFlg ? false : true
  }
  /** 再生 */
  play() {
    if(this.playFlg) {
      this.video.play()
    }
  }
  /** 停止 */
  pause() {
    this.video.pause()
  }
  /** ミュート */
  muted() {
    if(this.video.muted) {
      this.video.muted = false
      this.volume = this.video.volume
    }else {
      this.video.muted = true
      this.volume = 0
    }
  }

  /** フルスクリーン判定 */
  isFullScreen() {
    return this.document.fullscreenElement
      || this.document.mozFullscreenElement
      || this.document.msFullscreenElement
      || this.document.webkitFullscreenElement
  }
  /** フルスクリーン制御 */
  fullscreen() {
    if (this.isFullScreen()) {
      this.exitFullscreen()
    } else {
      this.requestFullscreen()
    }
  }
  /** フルスクリーン実行 */
  requestFullscreen() {
    if(this.video.requestFullscreen) {
      this.parent.requestFullscreen()
    }else if(this.video.mozRequestFullscreen) {
      this.parent.mozRequestFullscreen()
    }else if(this.video.webkitRequestFullscreen) {
      this.parent.webkitRequestFullscreen()
    }
    this.fullscreenFlg = true
    this.controlWidth = '100%'
  }
  /** フルスクリーン解除 */
  exitFullscreen() {
    if (this.document.webkitCancelFullScreen) {
     this. document.webkitCancelFullScreen();
    } else if (this.document.mozCancelFullScreen) {
      this.document.mozCancelFullScreen();
    } else if (this.document.msExitFullscreen) {
      this.document.msExitFullscreen();
    } else if(this.document.cancelFullScreen) {
      this.document.cancelFullScreen();
    } else if(this.document.exitFullscreen) {
      this.document.exitFullscreen();
    }
    this.fullscreenFlg = false
    this.controlWidth = this.video.offsetWidth + 'px'
  }

  /** 再生時間seek-bar制御 */
  seekbarChange() {
    const time = this.video.duration * (this.time / 100)
    this.video.currentTime = time
  }
  /** 再生時間が更新 */
  timeUpdate() {
    const value = (100 / this.video.duration) * this.video.currentTime
    this.time = value
  }

  /** 音量seek-bar制御 */
  volumeChange() {
    this.video.volume = this.volume
    this.video.muted = this.volume == 0 ? true : false
  }

  /** 再生時間表示 */
  retMinuteSeconds(time: number) {
    const minute: number = Math.floor(time / 60)
    const seconds: number = Math.floor(time - minute * 60)
    return minute.toString() + ':' + seconds.toString().padStart(2, '0')
  }

  /** コントロールエリア表示 */
  dispControls(e) {
    e.stopPropagation()
    this.displayFlg = true
  }
  /** コントロールエリア非表示 */
  hideControls(e) {
    e.stopPropagation()
    this.displayFlg = false
  }

  /** 10秒早送り */
  forward() {
    this.video.currentTime = this.video.currentTime + 10
  }
  /** 10秒巻き戻し */
  backward() {
    this.video.currentTime = this.video.currentTime - 10
  }
}
