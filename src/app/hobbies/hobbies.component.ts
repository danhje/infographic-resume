import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-hobbies',
  templateUrl: './hobbies.component.html',
  styleUrls: ['./hobbies.component.css']
})
export class HobbiesComponent {
  @Output() elementClicked = new EventEmitter();

  onClick(event: MouseEvent) {
    this.elementClicked.emit(event);
  }
}
