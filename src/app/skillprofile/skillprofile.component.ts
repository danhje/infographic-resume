import { Component, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-skillprofile',
  templateUrl: './skillprofile.component.html',
  styleUrls: ['./skillprofile.component.css']
})
export class SkillprofileComponent {
  skills: { skillname: string, description: string, level: number }[] = [
    { skillname: 'Team leadership',
      description: 'My current position. LUP. IT Operations Manager...',
      level: 70 },
    { skillname: 'Machine learning',
      description: ' ',
      level: 90 },
    { skillname: 'Mathematics',
      description: ' ',
      level: 100 },
    { skillname: 'Electrical engineering',
      description: ' ',
      level: 105 },
    { skillname: 'Data analysis',
      description: ' ',
      level: 115 },
    { skillname: 'Data visualization',
      description: ' ',
      level: 130 },
    { skillname: 'Scientiffic programming',
      description: ' ',
      level: 170 },
    { skillname: 'Web developement',
      description: ' ',
      level: 140 },
    { skillname: 'iOS developement',
      description: ' ',
      level: 130 },
    { skillname: 'Visual design',
      description: ' ',
      level: 120 },
    { skillname: 'Energy engineering',
      description: ' ',
      level: 110 },
    { skillname: 'Writing',
      description: ' ',
      level: 85 },
    { skillname: 'Cooking',
      description: ' ',
      level: 5 }
  ];
  @Output() elementClicked = new EventEmitter<MouseEvent>();

  constructor(private sanitizer: DomSanitizer) {}

  colorForSkill(skill: { skillname: string, level: number }) {
    if (skill.level < 40) {
      return this.sanitizer.bypassSecurityTrustStyle('var(--highlight-color-5)');
    } else if (skill.level < 80) {
      return this.sanitizer.bypassSecurityTrustStyle('var(--highlight-color-4)');
    } else if (skill.level < 100) {
      return this.sanitizer.bypassSecurityTrustStyle('var(--highlight-color-3)');
    } else if (skill.level < 120) {
      return this.sanitizer.bypassSecurityTrustStyle('var(--highlight-color-2)');
    } else {
      return this.sanitizer.bypassSecurityTrustStyle('var(--highlight-color-1)');
    }
  }

  onClick(event: MouseEvent) {
    this.elementClicked.emit(event);
  }
}
