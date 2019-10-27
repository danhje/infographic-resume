import { Component, ElementRef, HostListener, HostBinding, OnInit} from '@angular/core';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.css']
})
export class PopoverComponent implements OnInit {
  flagDirection = 'right';
  popoverColor = '';
  popoverTitle = '';
  popoverSubtitle: any;
  popoverDescription = '';
  animation = 'none'; // open, close or none
  shouldIgnoreClickout = true;
  animationTimer: any;
  preventClickoutTimer: any;
  destroyTimer: any;
  selfComponentRef: any;
  @HostBinding('style.left.px') popoverLeft = 0;
  @HostBinding('style.top.px') popoverTop = 0;

  constructor(private eRef: ElementRef) {
  }

  startTimers() {
    this.animationTimer = setInterval(() => {
      this.animation = 'open';
      clearInterval(this.animationTimer);
    }, 30);

    // Ignore clickout that happen immediately after init.
    this.preventClickoutTimer = setInterval(() => {
      this.shouldIgnoreClickout = false;
      clearInterval(this.preventClickoutTimer);
    }, 100);
  }

  ngOnInit() {
    this.startTimers();
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      if (!this.shouldIgnoreClickout) {
        this.animation = 'close';
        this.destroyAfterDelay();
      }
    }
  }

  destroyAfterDelay() {
    // Wait for animation to finish before destroying.
    this.destroyTimer = setInterval(() => {
      this.selfComponentRef.destroy();
      clearInterval(this.destroyTimer);
    }, 1100);
  }
}
