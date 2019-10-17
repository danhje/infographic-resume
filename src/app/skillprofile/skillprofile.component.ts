import { Component, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-skillprofile',
  templateUrl: './skillprofile.component.html',
  styleUrls: ['./skillprofile.component.css']
})
export class SkillprofileComponent {
  skills: { skillname: string, level: number }[] = [
    { skillname: 'Team leadership', level: 70 },
    { skillname: 'Machine learning', level: 90 },
    { skillname: 'Mathematics', level: 100 },
    { skillname: 'Electrical engineering', level: 105 },
    { skillname: 'Data analysis', level: 115 },
    { skillname: 'Data visualization', level: 130 },
    { skillname: 'Scientiffic programming', level: 140 },
    { skillname: 'Web developement', level: 170 },
    { skillname: 'iOS developement', level: 130 },
    { skillname: 'Visual design', level: 120 },
    { skillname: 'Energy engineering', level: 110 },
    { skillname: 'Writing', level: 85 },
    { skillname: 'Cooking', level: 5 }
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
