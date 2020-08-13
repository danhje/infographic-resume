import { OnInit, Injectable } from '@angular/core';

@Injectable()
export class PrngService implements OnInit {
  seed = 2527728424;

  ngOnInit() {
    this.seed = this.seed % 2147483647;
    if (this.seed <= 0) {
      this.seed += 2147483646;
    }
  }

  next() {
    return this.seed = this.seed * 16807 % 2147483647;
  }

  nextFloat() {
    return (this.next() - 1) / 2147483646;
  }
}
