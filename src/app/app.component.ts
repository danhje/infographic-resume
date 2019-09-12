import { Component, ElementRef } from '@angular/core';
import { isNull } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showPopover = false;
  popoverLeft = 0;
  popoverTop = 0;
  popoverColor = '';

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
    this.showPopover = true;
    const target = (event.target as HTMLElement);
    this.popoverColor = window.getComputedStyle(target).backgroundColor;
    this.popoverLeft = this.getOffsetLeft(target) + target.offsetWidth / 2;
    this.popoverTop = this.getOffsetTop(target) + target.offsetHeight / 2 - 300; // 300 is the height of popover.
  }
}
