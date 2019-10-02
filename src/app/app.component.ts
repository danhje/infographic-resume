import { Component,
         ViewChild,
         ViewContainerRef,
         ComponentFactoryResolver,
         Renderer2} from '@angular/core';
import { PopoverComponent } from './popover/popover.component';
import { TagPlaceholder } from '@angular/compiler/src/i18n/i18n_ast';

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

  firstParentWithPopoverInfo(elem: HTMLElement) {
    console.log('Chedking element ' + elem);
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
      (popoverRef.instance as PopoverComponent).popoverColor = window.getComputedStyle(elem).backgroundColor;
      (popoverRef.instance as PopoverComponent).popoverLeft = this.getOffsetLeft(elem) + elem.offsetWidth / 2;
      (popoverRef.instance as PopoverComponent).popoverTop = this.getOffsetTop(elem) + 20 - 300; // 300 is the height of popover.
      (popoverRef.instance as PopoverComponent).selfComponentRef = popoverRef;
      (popoverRef.instance as PopoverComponent).popoverTitle = elem.getAttribute('popoverTitle');
      (popoverRef.instance as PopoverComponent).popoverDescription = elem.getAttribute('popoverDescription');
    } else {
      console.log('The element that was clicked is missing either popoverTitle or popoverDescription, or both.');
    }
  }
}
