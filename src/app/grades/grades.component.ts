import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Course } from './grade.model';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.css']
})
export class GradesComponent implements OnInit {
  timelineLeftBound = 15;
  timelineRightBound = 280;
  courses: Course[] = [];
  highlightedCategory: string;
  math = Math; // Needed to make Math available in bindings.
  @Output() elementClicked = new EventEmitter<MouseEvent>();

  ngOnInit() {
    this.populateCourseList();
  }

  populateCourseList() {
    const courses = [
      new Course(
        'IMRT100',
        'Introductory Project',
        'other',
        1,
        5,
        2008.75),
      new Course(
        'INF100',
        'Principles of Information Processing',
        'informatics',
        1,
        5,
        2008.75),
      new Course(
        'MATH111',
        'Calculus 1',
        'math',
        3,
        10,
        2008.75),
      new Course(
        'PHI100',
        'Examen philosophicum',
        'other',
        3,
        10,
        2008.75),
      new Course(
        'BUS100',
        'Cost Accounting, Fundamentals',
        'other',
        2,
        5,
        2009.25),
      new Course(
        'FYS101',
        'Mechanics',
        'natural science',
        2,
        10,
        2009.25),
      new Course(
        'FYS110',
        'Statikk',
        'natural science',
        3,
        5,
        2009.25),
      new Course(
        'MATH112',
        'Calculus 2',
        'math',
        3,
        10,
        2009.25),
      new Course(
        'AOS130',
        'Introduction to Organisation Theory',
        'other',
        4,
        5,
        2009.75),
      new Course(
        'FYS102',
        'Thermophysics and Electromagnetism',
        'natural science',
        3,
        10,
        2009.75),
      new Course(
        'FYS155',
        'Laboratory Course in Physics',
        'natural science',
        2,
        5,
        2009.75),
      new Course(
        'MATH113',
        'Linear Algebra and Linear Differential Equations',
        'math',
        1,
        10,
        2009.75),
      new Course(
        'FYS210',
        'Fluid Dynamics',
        'natural science',
        3,
        10,
        2010.25),
      new Course(
        'FYS250',
        'Engineering Physics',
        'natural science',
        2,
        10,
        2010.25),
      new Course(
        'INF120',
        'Programming and Data Processing',
        'informatics',
        2,
        10,
        2010.25),
      new Course(
        'FYS103',
        'Measurement Techniques and Optics',
        'natural science',
        1,
        5,
        2010.25),
      new Course(
        'INF130',
        'Introduction to Databases',
        'informatics',
        2,
        10,
        2010.75),
      new Course(
        'STAT100',
        'Statistics',
        'math',
        1,
        10,
        2010.75),
      new Course(
        'FYS161',
        'Meteorology and Climate',
        'natural science',
        2,
        5,
        2010.75),
      new Course(
        'FYS230',
        'Electrical Engineering',
        'natural science',
        2,
        10,
        2010.75),
      new Course(
        'KJM100',
        'General Chemistry',
        'natural science',
        1,
        10,
        2011.25),
      new Course(
        'MATH270',
        'Complex Analysis and Transformation Methods',
        'math',
        3,
        10,
        2011.25),
      new Course(
        'FYS145',
        'Quantum Mechanics',
        'math',
        3,
        10,
        2011.25),
      new Course(
        'BUS112',
        'Digital Accounting',
        'other',
        1,
        5,
        2011.75),
      new Course(
        'FYS271',
        'Energy Physics and Energy Transfer',
        'natural science',
        3,
        10,
        2011.75),
      new Course(
        'FYS200',
        'Classical Physics',
        'natural science',
        3,
        10,
        2011.75),
      new Course(
        'INF200',
        'Advanced Programming',
        'informatics',
        2,
        10,
        2012.25),
      new Course(
        'MATH280',
        'Applied Linear Algebra',
        'math',
        2,
        10,
        2012.25),
      new Course(
        'FYS241',
        'Environmental Physics',
        'natural science',
        2,
        10,
        2012.25),
      new Course(
        'STAT250',
        'Mathematical Statistics',
        'math',
        2,
        5,
        2012.75),
      new Course(
        'FYS381',
        'Biological Physics',
        'natural science',
        2,
        10,
        2012.75),
      new Course(
        'FYS373',
        'Chemical and Biochemical Energy Conversion',
        'natural science',
        5,
        10,
        2012.75),
      new Course(
        'FYS375',
        'Energy Technology, Lab',
        'natural science',
        1,
        10,
        2012.75),
      new Course(
        'M30-IMT',
        'Master\'s Thesis',
        'informatics',
        1,
        30,
        2013.25)
    ];

    courses.forEach(entry => {
      entry.cssClass = this.classForCategory(entry.category);
      entry.xPosition = this.xPositionFromSemester(entry.semester);
      entry.yPosition = this.yPositionFromGrade(entry.grade);

      while (this.overlapsExistingEntry(entry)) {
        entry.xPosition += 13;
        entry.yPosition -= 7;
      }
      this.courses.push(entry);
    });
  }

  overlapsExistingEntry(entry) {
    return this.courses.some(existingEntry => {
      return (existingEntry.xPosition === entry.xPosition) && (existingEntry.yPosition === entry.yPosition);
    });
  }

  xPositionFromSemester(semester: number) {
    return this.timelineLeftBound + ((semester - 2008.75) / 4.5) * (this.timelineRightBound - this.timelineLeftBound);
  }

  yPositionFromGrade(grade: number) {
    return grade * 35 + 20;
  }

  classForCategory(category: string) {
    switch (category) {
      case ('informatics'): return 'highlight-color-1';
      case ('math'): return 'highlight-color-3';
      case ('natural science'): return 'highlight-color-4';
      case ('other'): return 'highlight-color-5';
      default: return 'highlight-color-3';
    }
  }

  onMouseenter(category: string) {
    this.highlightedCategory = category;
  }

  onMouseleave() {
    this.highlightedCategory = null;
  }

  onClick(event: MouseEvent) {
    this.elementClicked.emit(event);
  }
}
