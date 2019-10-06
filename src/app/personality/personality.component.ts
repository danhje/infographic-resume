import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-personality',
  templateUrl: './personality.component.html',
  styleUrls: ['./personality.component.css']
})
export class PersonalityComponent {
  @Output() elementClicked = new EventEmitter<MouseEvent>();
  opennessHovered = false;
  conscientiousnessHovered = false;
  extraversionHovered = false;
  agreeablenessHovered = false;
  neuroticismHovered = false;

  onLabelClick(elementToClick: HTMLElement) {
    elementToClick.click();
  }

  onClick(event: MouseEvent) {
    this.elementClicked.emit(event);
  }

  onMouseenter(personalityTrait: string) {
    switch (personalityTrait) {
      case 'openness': {
        this.opennessHovered = true;
        break;
      }
      case 'conscientiousness': {
        this.conscientiousnessHovered = true;
        break;
      }
      case 'extraversion': {
        this.extraversionHovered = true;
        break;
      }
      case 'agreeableness': {
        this.agreeablenessHovered = true;
        break;
      }
      case 'neuroticism': {
        this.neuroticismHovered = true;
        break;
      }
    }
  }

  onMouseleave(personalityTrait: string) {
    switch (personalityTrait) {
      case 'openness': {
        this.opennessHovered = false;
        break;
      }
      case 'conscientiousness': {
        this.conscientiousnessHovered = false;
        break;
      }
      case 'extraversion': {
        this.extraversionHovered = false;
        break;
      }
      case 'agreeableness': {
        this.agreeablenessHovered = false;
        break;
      }
      case 'neuroticism': {
        this.neuroticismHovered = false;
        break;
      }
    }
  }
}
