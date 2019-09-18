import { Component,
         ViewChild,
         ViewContainerRef,
         ComponentFactoryResolver,
         Renderer2,
         ElementRef,
         OnInit} from '@angular/core';
import { PopoverComponent } from './popover/popover.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('popover', {read: ViewContainerRef, static: true}) entry: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private renderer: Renderer2) { }

  getOffsetTop(elem: HTMLElement) {
    let offsetTop = elem.offsetTop;
    if (elem.offsetParent != null) {
      offsetTop += this.getOffsetTop(elem.offsetParent as HTMLElement);
    }
    return offsetTop;
  }

  getOffsetLeft(elem: HTMLElement) {
    let offsetLeft = elem.offsetLeft;
    if (elem.offsetParent != null) {
      offsetLeft += this.getOffsetLeft(elem.offsetParent as HTMLElement);
    }
    return offsetLeft;
  }

  childElementClicked(event: MouseEvent) {
    const target = (event.target as HTMLElement);

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(PopoverComponent);
    const viewContainerRef = this.entry;
    const popoverRef = viewContainerRef.createComponent(componentFactory);
    (popoverRef.instance as PopoverComponent).popoverColor = window.getComputedStyle(target).backgroundColor;
    (popoverRef.instance as PopoverComponent).popoverLeft = this.getOffsetLeft(target) + target.offsetWidth / 2;
    (popoverRef.instance as PopoverComponent).popoverTop = this.getOffsetTop(target) + target.offsetHeight / 2 - 300;
    (popoverRef.instance as PopoverComponent).selfComponentRef = popoverRef;
    (popoverRef.instance as PopoverComponent).popoverTitle = target.getAttribute('popoverTitle');
    (popoverRef.instance as PopoverComponent).popoverDescription = target.getAttribute('popoverDescription');
    // 300 is the height of popover.
  }
}
