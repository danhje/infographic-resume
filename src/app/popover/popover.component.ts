import { Component, Input, ElementRef, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.css']
})
export class PopoverComponent implements OnInit {
  @Input() popoverColor = '';
  visible = true;
  shouldIgnoreClickout = true;
  timer;

  constructor(private eRef: ElementRef) {
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.shouldIgnoreClickout = false;
      clearInterval(this.timer);
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
      }
    }
  }


}
