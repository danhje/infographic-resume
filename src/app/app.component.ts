import { Component,
         ViewChild,
         ViewContainerRef,
         ComponentFactoryResolver,
         Renderer2} from '@angular/core';
import { PopoverComponent } from './popover/popover.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('popover', {read: ViewContainerRef, static: false}) entry: ViewContainerRef;
  @ViewChild('gridcontainer', {read: ViewContainerRef, static: true}) gridContainer: ViewContainerRef;

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

  firstParentWithPopoverInfo(elem: HTMLElement) {
    if (elem.getAttribute('popoverTitle') && elem.getAttribute('popoverDescription')) {
      return elem;
    }
    return this.firstParentWithPopoverInfo(elem.parentElement);
  }

  childElementClicked(event: MouseEvent) {
    const target = (event.target as HTMLElement);
    const elem = this.firstParentWithPopoverInfo(target);

    if (elem) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(PopoverComponent);
      const viewContainerRef = this.entry;
      const popoverRef = viewContainerRef.createComponent(componentFactory);
      const height = parseInt(window.getComputedStyle(elem).height, 10);
      const offset = (height ? Math.min(20, height) : 20) - 2;
      // Offset is due to margins, scaling transitions etc.
      // The -2 is due to things like tranparent boders.
      (popoverRef.instance as PopoverComponent).popoverColor = window.getComputedStyle(elem).backgroundColor;
      const gridContainerRightBound = (this.gridContainer.element.nativeElement as HTMLElement).getBoundingClientRect().right;
      if (this.getOffsetLeft(elem) + elem.offsetWidth / 2 - 1 + 300 < gridContainerRightBound) {
        (popoverRef.instance as PopoverComponent).flagDirection = 'right';
        (popoverRef.instance as PopoverComponent).popoverLeft = this.getOffsetLeft(elem) + elem.offsetWidth / 2 - 1;
      } else {
        (popoverRef.instance as PopoverComponent).flagDirection = 'left';
        (popoverRef.instance as PopoverComponent).popoverLeft = this.getOffsetLeft(elem) + elem.offsetWidth / 2 - 300;
      }
      (popoverRef.instance as PopoverComponent).popoverTop = this.getOffsetTop(elem) - 600 + offset;
      (popoverRef.instance as PopoverComponent).selfComponentRef = popoverRef;
      (popoverRef.instance as PopoverComponent).popoverTitle = elem.getAttribute('popoverTitle');
      (popoverRef.instance as PopoverComponent).popoverDescription = elem.getAttribute('popoverDescription');
    } else {
      console.log('The element that was clicked is missing either popoverTitle or popoverDescription, or both.');
    }
  }
}
