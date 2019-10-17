import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { TimelineEntry } from './timelineentry.model';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  minEntryWidth = 10;
  timelineWidth = 880;
  firstTimelineDate: number;
  lastTimelineDate: number;
  tickmarks: number[];
  timelineEntries: TimelineEntry[] = [];
  @Output() elementClicked = new EventEmitter<MouseEvent>();

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.populateTimelineEntries();
    this.createTickmarks();
  }

  populateTimelineEntries() {
    const data = [
      new TimelineEntry(
        'education',
        true,
        'High school',
        'Elective course: IT.',
        '2002.08',
        '2005.06'
      ),
      new TimelineEntry(
        'education',
        false,
        'Mathematics (2MX)',
        'Admission requirement for engineering programmes. Taken online at Sonans Nettgymnas.',
        '2006.02',
        '2006.04'
      ),
      new TimelineEntry(
        'education',
        false,
        'Mathematics (3MX)',
        'Admission requirement for engineering programmes. Taken online at NKI Fjernundervisning.',
        '2006.08',
        '2006.12'
      ),
      new TimelineEntry(
        'education',
        false,
        'Physics (2FY)',
        'Admission requirement for engineering programmes. Taken online at NKI Fjernundervisning.',
        '2008.01',
        '2008.05'
      ),
      new TimelineEntry(
        'education',
        true,
        'Master of Technology (Civil Engineering) at the Norwegian University of Life Sciences (NMBU)',
        'Environmental physics and renewable energy.',
        '2008.08',
        '2013.06'
      ),
      new TimelineEntry(
        'education',
        false,
        'Principles of Project Management',
        'Online course at Open2study.com.',
        '2013.11',
        '2013.11'
      ),
      new TimelineEntry(
        'education',
        false,
        'Solar Energy',
        'A practical, 2 day course on solar energy.',
        '2016.09',
        '2016.09'
      ),
      new TimelineEntry(
        'education',
        false,
        'Machine Learning for Beginners',
        'Online course at Udemy.com.',
        '2017.06',
        '2017.06'
      ),
      new TimelineEntry(
        'education',
        false,
        'Autodesk AutoCAD 2017',
        'Online course at Udemy.com.',
        '2017.07',
        '2017.07'
      ),
      new TimelineEntry(
        'education',
        false,
        'PLC Programming From Scratch (PLC 1)',
        'Online course at Udemy.com.',
        '2017.11',
        '2017.12'
      ),
      new TimelineEntry(
        'education',
        false,
        'Introduction to Life-cycle Assessment (LCA)',
        'Course organized by Tekna.',
        '2018.05',
        '2018.05'
      ),
      new TimelineEntry(
        'education',
        false,
        'System Center 2012 Operations Manager: Management Pack Authoring',
        'A 5 day Microsoft Premier Workshop.',
        '2018.11',
        '2018.11'
      ),
      new TimelineEntry(
        'education',
        false,
        'Docker Mastery',
        'Online course at Udemy.com.',
        '2018.12',
        '2018.12'
      ),
      new TimelineEntry(
        'education',
        false,
        'LUP KRAFT - Leadership Development Program',
        'Inhouse program at Sykehuspartner, intended for existing and potential leaders.',
        '2019.03',
        '2019.11'
      ),
      new TimelineEntry(
        'education',
        false,
        'Windows PowerShell: For the IT Professional',
        'A 4 day Microsoft Premier Workshop.',
        '2019.04',
        '2019.04'
      ),
      new TimelineEntry(
        'education',
        false,
        'REST API Design, Development & Management',
        'Online course at Udemy.com.',
        '2019.08',
        '2019.11'
      ),
      new TimelineEntry(
        'education',
        false,
        'Angular 8 - The Complete Guide',
        'Online course at Udemy.com.',
        '2019.08',
        '2019.11'
      ),
      new TimelineEntry(
        'education',
        false,
        'Angular & NodeJS - The MEAN Stack Guide',
        'Online course at Udemy.com.',
        '2019.09',
        '2019.10'
      ),
      new TimelineEntry(
        'work',
        true,
        'IT Service Technician at R/M/S Scandinavia AS',
        'Work.',
        '2003.11',
        '2005.09'
      ),
      new TimelineEntry(
        'work',
        true,
        'Civilian Service at Aker Universitetssykehus HF',
        'Work.',
        '2005.09',
        '2006.09'
      ),
      new TimelineEntry(
        'work',
        true,
        'IT Consultant at Aker Universitetssykehus HF',
        'Work.',
        '2006.09',
        '2008.07'
      ),
      new TimelineEntry(
        'work',
        false,
        'IT Consultant at Sykehuspartner, avd. IKT',
        'Summer internship.',
        '2010.07',
        '2010.08'
      ),
      new TimelineEntry(
        'work',
        false,
        'Service Technician at Coop Norge Handel AS',
        'Summer internship.',
        '2011.06',
        '2011.08'
      ),
      new TimelineEntry(
        'work',
        false,
        'Assistant Teacher at the NMBU',
        'Course: INF120 – Programming and data processing.',
        '2012.02',
        '2012.06'
      ),
      new TimelineEntry(
        'work',
        false,
        'Service Technician at Coop Norge Handel AS',
        'Summer internship.',
        '2012.06',
        '2012.08'
      ),
      new TimelineEntry(
        'work',
        false,
        'Researcher at the NMBU',
        'A short-term contract job to continue some of the work I had started with my master\'s thesis. \
        I used a test suite I had developed in Python to test some of the most popular neural network simulators.',
        '2013.06',
        '2013.07'
      ),
      new TimelineEntry(
        'work',
        true,
        'Special Consultant at Sykehuspartner HF',
        '2014 - 2018: Operationally responsible at the Operations Bridge. After 2018: Developer and team leader.',
        '2014.01',
        '2019.11'
      ),
      new TimelineEntry(
        'work',
        false,
        'Private Teacher for two 13 year old girls',
        'Work.',
        '2016.10',
        '2018.06'
      ),
      new TimelineEntry(
        'work',
        false,
        'Frivillig kommunikasjonsmedarbeider i MDG',
        'Work.',
        '2017.07',
        '2017.10'
      )
    ];

    // Determine the date range of the timeline.
    this.firstTimelineDate = data.reduce((min, entry) => entry.startNumber < min ? entry.startNumber : min, data[0].startNumber);
    this.lastTimelineDate = data.reduce((max, entry) => entry.endNumber > max ? entry.endNumber : max, data[0].endNumber);

    data.forEach(entry => {
      entry.xStart = this.xPositionFromDate(entry.startNumber);
      entry.width = this.entryWidth(entry);
      entry.xEnd = entry.xStart + entry.width;
    });

    data.sort((left, right): number => {
      return right.width - left.width;
    });

    data.forEach(entry => {
      while (this.overlapsSomething(entry)) {
        entry.yIndex++;
        console.log('increased yIndex ', entry.yIndex);
      }
      this.timelineEntries.push(entry);
    });
  }

  overlapsSomething(newEntry: TimelineEntry) {
    return this.timelineEntries.some(existingEntry => {
      if (existingEntry.type === newEntry.type && existingEntry.yIndex === newEntry.yIndex) {
        if (newEntry.xStart > existingEntry.xStart && newEntry.xStart < existingEntry.xEnd) {
          return true;
        } else if (newEntry.xEnd >= existingEntry.xStart && newEntry.xEnd <= existingEntry.xEnd) {
          return true;
        } else if (newEntry.xStart <= existingEntry.xStart && newEntry.xEnd >= existingEntry.xEnd) {
          // This should never be the case, since we have sorted by width.
          return true;
        }
        return false;
      } else {
        return false;
      }
    });
  }

  createTickmarks() {
    const r: Array<number> = [];
    for (let i = Math.floor(this.firstTimelineDate); i < Math.ceil(this.lastTimelineDate); i++) {
      r.push(i);
    }
    this.tickmarks = r;
  }

  entryWidth(entry: TimelineEntry) {
    return Math.max(this.minEntryWidth, this.xPositionFromDate(entry.endNumber) - this.xPositionFromDate(entry.startNumber)) - 2.0;
    // Minus 2 to give some space between adjacent items.
  }

  entryColor(entry: TimelineEntry) {
    if (entry.type === 'education') {
      return this.sanitizer.bypassSecurityTrustStyle(entry.primary ? 'var(--highlight-color-3)' : 'var(--highlight-color-4)');
    } else {
      return this.sanitizer.bypassSecurityTrustStyle(entry.primary ? 'var(--highlight-color-5)' : 'var(--highlight-color-4)');
    }
  }

  xPositionFromDate(date: number) {
    return ((date - this.firstTimelineDate) / (this.lastTimelineDate - this.firstTimelineDate)) * this.timelineWidth;
  }

  yPosition(entry: TimelineEntry) {
    if (entry.type === 'education') {
      return 100 - entry.yIndex * 18;
    } else {
      return 160 + entry.yIndex * 18;
    }
  }

  onClick(event: MouseEvent) {
    this.elementClicked.emit(event);
  }
}
