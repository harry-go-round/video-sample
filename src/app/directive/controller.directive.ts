import { Directive, ComponentFactoryResolver, ComponentFactory, ComponentRef, ViewContainerRef, Injector, Input, OnInit } from '@angular/core';
import { VideoControllerComponent } from '../component/video-controller/video-controller.component';
import { stringify } from '@angular/compiler/src/util';

@Directive({
  selector: '[appController]'
})
export class ControllerDirective implements OnInit  {

  factory: ComponentFactory<VideoControllerComponent>
  controller: ComponentRef<VideoControllerComponent>
  
  constructor(
    private resolver: ComponentFactoryResolver,
    private vcr: ViewContainerRef,
    private injector: Injector
  ) {}

  ngOnInit() {
    console.log(this.vcr.element)
    this.factory = this.resolver.resolveComponentFactory(VideoControllerComponent)
    this.controller = this.vcr.createComponent(this.factory, undefined, this.createInjector(this.vcr))
  }

  createInjector(viewContainerRef) {
    return Injector.create({
      providers: [
        { provide: ViewContainerRef, useValue: viewContainerRef }
      ],
      parent: this.injector
    })
  }

}
