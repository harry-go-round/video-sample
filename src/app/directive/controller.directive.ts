import { Directive, ComponentFactoryResolver, ComponentFactory, ComponentRef, ViewContainerRef, Injector } from '@angular/core';
import { VideoControllerComponent } from '../component/video-controller/video-controller.component';

@Directive({
  selector: '[appController]'
})
export class ControllerDirective {

  factory: ComponentFactory<VideoControllerComponent>
  controller: ComponentRef<VideoControllerComponent>
  

  constructor(
    private resolver: ComponentFactoryResolver,
    private vcr: ViewContainerRef,
    private injector: Injector
  ) {
    console.log(this.vcr.element)
    this.factory = this.resolver.resolveComponentFactory(VideoControllerComponent)
    this.controller = this.vcr.createComponent(this.factory, undefined, this.createInjector(this.vcr))
  }
  createInjector(viewContainerRef) {
    return Injector.create({
      providers: [{provide: ViewContainerRef, useValue: viewContainerRef}],
      parent: this.injector
    })
  }

}
