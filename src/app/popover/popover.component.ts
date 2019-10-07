import { Component, ElementRef, HostListener, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.css']
})
export class PopoverComponent implements OnInit {
  popoverColor = '';
  popoverTitle = '';
  popoverDescription = '';
  visible = true;
  shouldIgnoreClickout = true;
  startupTimer: any;
  destroyTimer: any;
  selfComponentRef: any;
  @HostBinding('style.left.px') popoverLeft = 0;
  @HostBinding('style.top.px') popoverTop = 0;

  constructor(private eRef: ElementRef) {
  }

  startTimer() {
    // Ignore clickout that happen immediately after init.
    this.startupTimer = setInterval(() => {
      this.shouldIgnoreClickout = false;
      clearInterval(this.startupTimer);
    }, 100);
  }

  ngOnInit() {
    this.startTimer();
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      if (!this.shouldIgnoreClickout) {
        this.visible = false;
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
