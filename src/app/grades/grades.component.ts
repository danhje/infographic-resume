import { Component, OnInit } from '@angular/core';
import { Grade } from './grade.model';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.css']
})
export class GradesComponent implements OnInit {
  timelineLeftBound = 30;
  timelineRightBound = 280;
  grades: Grade[] = [];
  math = Math; // Needed to make Math available in bindings.

  ngOnInit() {
    this.populateGradeList();
  }

  populateGradeList() {
    const grades = [
      new Grade(
        'IMRT100',
        'Innføringsemne - fagorientert prosjekt',
        'other',
        1,
        5,
        2008.75),
      new Grade(
        'INF100',
        'Prinsipper i informasjonsbehandling',
        'informatics',
        1,
        5,
        2008.75),
      new Grade(
        'MATH111',
        'Kalkulus 1',
        'math',
        3,
        10,
        2008.75),
      new Grade(
        'PHI100',
        'Examen philosophicum',
        'other',
        3,
        10,
        2008.75),
      new Grade(
        'BUS100',
        'Grunnleggende foretaksøkonomi',
        'other',
        2,
        5,
        2009.25),
      new Grade(
        'FYS101',
        'Mekanikk',
        'natural science',
        2,
        10,
        2009.25),
      new Grade(
         'FYS110',
        'Statikk',
        'natural science',
        3,
        5,
        2009.25),
      new Grade(
        'MATH112',
        'Kalkulus 2',
        'math',
        3,
        10,
        2009.25),
      new Grade(
        'AOS130',
        'Innføring i organisasjonsteori',
        'other',
        4,
        5,
        2009.75),
      new Grade(
        'FYS102',
        'Termofysikk og elektromagnetisme',
        'natural science',
        3,
        10,
        2009.75),
      new Grade(
        'FYS155',
        'Laboratoriekurs i fysikk',
        'natural science',
        2,
        5,
        2009.75),
      new Grade(
        'MATH113',
        'Lineær algebra og lineære differensialligninger',
        'math',
        1,
        10,
        2009.75),
      new Grade(
        'FYS210',
        'Hydrodynamikk',
        'natural science',
        3,
        10,
        2010.25),
      new Grade(
        'FYS250',
        'Teknisk fysikk',
        'natural science',
        2,
        10,
        2010.25),
      new Grade(
        'INF120',
        'Programmering og databehandling',
        'informatics',
        2,
        10,
        2010.25),
      new Grade(
        'FYS103',
        'Måleteknikk og optikk',
        'natural science',
        1,
        5,
        2010.25),
      new Grade(
        'INF130',
        'Introduksjon til databaser',
        'informatics',
        2,
        10,
        2010.75),
      new Grade(
        'STAT100',
        'Statistikk',
        'math',
        1,
        10,
        2010.75),
      new Grade(
        'FYS161',
        'Meteorologi og klima',
        'natural science',
        2,
        5,
        2010.75),
      new Grade(
        'FYS230',
        'Elektronikk og elektroteknikk',
        'natural science',
        2,
        10,
        2010.75),
      new Grade(
        'KJM100',
        'Generell kjemi',
        'natural science',
        1,
        10,
        2011.25),
      new Grade(
        'MATH270',
        'Kompleks analyse og transformasjonsmetoder',
        'math',
        3,
        10,
        2011.25),
      new Grade(
        'FYS145',
        'Kvantefysikk',
        'math',
        3,
        10,
        2011.25),
      new Grade(
        'BUS112',
        'Elektronisk regnskapsføring',
        'other',
        1,
        5,
        2011.75),
      new Grade(
        'FYS271',
        'Energifysikk og energiomforming',
        'natural science',
        3,
        10,
        2011.75),
      new Grade(
        'FYS200',
        'Klassisk fysikk',
        'natural science',
        3,
        10,
        2011.75),
      new Grade(
        'INF200',
        'Videregående programmering',
        'informatics',
        2,
        10,
        2012.25),
      new Grade(
        'MATH280',
        'Anvendt lineær algebra',
        'math',
        2,
        10,
        2012.25),
      new Grade(
        'FYS241',
        'Mijøfysikk',
        'natural science',
        2,
        10,
        2012.25),
      new Grade(
        'STAT250',
        'Matematisk statistikk',
        'math',
        2,
        5,
        2012.75),
      new Grade(
        'FYS381',
        'Biologisk fysikk',
        'natural science',
        2,
        10,
        2012.75),
      new Grade(
        'FYS373',
        'Kjemisk- og biokjemisk energilagring',
        'natural science',
        5,
        10,
        2012.75),
      new Grade(
        'FYS375',
        'Energiteknologi, lab',
        'natural science',
        1,
        10,
        2012.75),
      new Grade(
        'M30-IMT',
        'Masteroppgave',
        'informatics',
        1,
        30,
        2013.25)
    ];

    grades.forEach(entry => {
      entry.cssClass = this.classForCategory(entry.category);
      entry.xPosition = this.xPositionFromSemester(entry.semester);
      entry.yPosition = this.yPositionFromGrade(entry.grade);

      while (this.overlapsExistingEntry(entry)) {
        entry.xPosition += 13;
        entry.yPosition -= 7;
      }
      this.grades.push(entry);
    });
  }

  overlapsExistingEntry(entry) {
    return this.grades.some(existingEntry => {
      return (existingEntry.xPosition === entry.xPosition) && (existingEntry.yPosition === entry.yPosition);
    });
  }

  xPositionFromSemester(semester: number) {
    return this.timelineLeftBound + ((semester - 2008.75) / 4.5) * (this.timelineRightBound - this.timelineLeftBound);
  }

  yPositionFromGrade(grade: number) {
    return grade * 45 - 10;
  }

  classForCategory(category: string) {
    switch (category) {
      case ('informatics'): return 'highlight-color-1';
      case ('natural science'): return 'highlight-color-2';
      case ('math'): return 'highlight-color-4';
      case ('other'): return 'highlight-color-5';
      default: return 'highlight-color-3';
    }
  }
}
