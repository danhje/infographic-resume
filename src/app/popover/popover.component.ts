import { Component, Input, ElementRef, HostListener, HostBinding, OnInit, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.css']
})
export class PopoverComponent implements OnInit {
  @Input() popoverColor = '';
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
    if (this.eRef.nativeElement.contains(event.target)) {
      console.log('clicked inside');
    } else {
      console.log('clicked outside');
      if (!this.shouldIgnoreClickout) {
        this.visible = false;
        this.destroyAfterDelay();
      }
    }
  }

  destroyAfterDelay() {
    this.destroyTimer = setInterval(() => {
      this.selfComponentRef.destroy();
      clearInterval(this.destroyTimer);
    }, 1000);
  }

}
