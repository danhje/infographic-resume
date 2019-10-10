import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-skillprofile',
  templateUrl: './skillprofile.component.html',
  styleUrls: ['./skillprofile.component.css']
})
export class SkillprofileComponent {
  skills: { skillname: string, level: number }[] = [
    { skillname: 'Marketing', level: 50 },
    { skillname: 'Project management', level: 60 },
    { skillname: 'Machine learning', level: 90 },
    { skillname: 'Math', level: 100 },
    { skillname: 'Electronics', level: 105 },
    { skillname: 'Energy engineering', level: 110 },
    { skillname: 'Developement', level: 170 },
    { skillname: 'Data visualization', level: 120 },
    { skillname: 'Visual design', level: 110 },
    { skillname: 'Data analysis', level: 100 },
    { skillname: 'Physics', level: 90 },
    { skillname: 'Writing', level: 85 },
    { skillname: 'Team leadership', level: 50 },
    { skillname: 'Cooking', level: 5 }
  ];

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

  constructor(private sanitizer: DomSanitizer) {}
}
