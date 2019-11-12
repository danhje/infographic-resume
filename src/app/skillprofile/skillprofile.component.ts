import { Component, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-skillprofile',
  templateUrl: './skillprofile.component.html',
  styleUrls: ['./skillprofile.component.css']
})
export class SkillprofileComponent {
  skills: { skillname: string, level: number }[] = [
    { skillname: 'Team leadership',
      level: 60 },
    { skillname: 'Machine learning',
      level: 75 },
    { skillname: 'Mathematics',
      level: 90 },
    { skillname: 'Data analysis',
      level: 115 },
    { skillname: 'Data visualization',
      level: 130 },
    { skillname: 'iOS developement',
      level: 135 },
    { skillname: 'Scientiffic programming',
      level: 170 },
    { skillname: 'Web developement',
      level: 140 },
    { skillname: 'IT operations and monitoring',
      level: 120 },
    { skillname: 'Visual design',
      level: 110 },
    { skillname: 'Energy engineering',
      level: 80 },
    { skillname: 'Writing',
      level: 75 },
    { skillname: 'Cooking',
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

  descriptionForSkill(skill: { skillname: string, level: number }) {
    if (skill.level < 40) {
      return 'Skill level: Novice';
    } else if (skill.level < 80) {
      return 'Skill level: Beginner';
    } else if (skill.level < 100) {
      return 'Skill level: Competent';
    } else if (skill.level < 120) {
      return 'Skill level: Proficient';
    } else {
      return 'Skill level: Expert';
    }
  }

  onClick(event: MouseEvent) {
    this.elementClicked.emit(event);
  }
}
