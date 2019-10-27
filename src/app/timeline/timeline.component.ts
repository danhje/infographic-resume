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
  timelineLeftBound = 30;
  timelineRightBound = 930;
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
        'August 2002 - June 2005',
        'General studies at the Rudolf Steinerskole in Moss. Elective course: IT.',
        '2002.08',
        '2005.06'
      ),
      new TimelineEntry(
        'education',
        false,
        'Mathematics (2MX)',
        'February 2006 - April 2006',
        'Admission requirement for engineering programmes. Taken online at Sonans Nettgymnas.',
        '2006.02',
        '2006.04'
      ),
      new TimelineEntry(
        'education',
        false,
        'Mathematics (3MX)',
        'August 2006 - December 2006',
        'Admission requirement for engineering programmes. Taken online at NKI Fjernundervisning.',
        '2006.08',
        '2006.12'
      ),
      new TimelineEntry(
        'education',
        false,
        'Physics (2FY)',
        'January 2008 - May 2008',
        'Admission requirement for engineering programmes. Taken online at NKI Fjernundervisning.',
        '2008.01',
        '2008.05'
      ),
      new TimelineEntry(
        'education',
        true,
        'Master of Technology (Civil Engineering) at the Norwegian University of Life Sciences (NMBU)',
        'August 2008 - June 2013',
        'Course track: Environmental Physics and Renewable Energy<br />Thesis: Statistical tests for connection algorithms for structured neural networks<br /> <br />This study gave me a good combination of skills in natural science and technology. I got a solid foundation in math, physics and informatics, and a diverse toolbox of skills for problem solving. I choose several courses in programming and data processing, and my thesis included / involved writing a Python test suite for neural network simulators.',
        '2008.08',
        '2013.06'
      ),
      new TimelineEntry(
        'education',
        false,
        'Principles of Project Management',
        'November 2013',
        'Online course at Open2study.com. The course covered some of the most popular project management methodologies, the project lifecycle and the different phases (Concept, Develop, Execute and Finish), continuous improvement and quality assurance.',
        '2013.11',
        '2013.11'
      ),
      new TimelineEntry(
        'education',
        false,
        'Solar Energy',
        'September 2016',
        'A practical, 2 day course on solar energy, arranged by Norsk Solenergiforening, with Bjørn Thorud from Multiconsult as instructor. It taught me about the development in price and technology the last few years, design criteria for a solar energy system, sizing the system, and the necessary components. I got experience with using the simulator PVsyst and the climate database PVGIS.',
        '2016.09',
        '2016.09'
      ),
      new TimelineEntry(
        'education',
        false,
        'Machine Learning for Beginners',
        'June 2017',
        'Online course at Udemy.com.',
        '2017.06',
        '2017.06'
      ),
      new TimelineEntry(
        'education',
        false,
        'Autodesk AutoCAD 2017',
        'July 2017',
        'Online course at Udemy.com.',
        '2017.07',
        '2017.07'
      ),
      new TimelineEntry(
        'education',
        false,
        'PLC Programming From Scratch (PLC 1)',
        'November 2017 - December 2017',
        'Online course at Udemy.com.',
        '2017.11',
        '2017.12'
      ),
      new TimelineEntry(
        'education',
        false,
        'Introduction to Life-cycle Assessment (LCA)',
        'May 2018',
        'Course organized by Tekna.',
        '2018.05',
        '2018.05'
      ),
      new TimelineEntry(
        'education',
        false,
        'System Center 2012 Operations Manager: Management Pack Authoring',
        'November 2018',
        'A 5 day Microsoft Premier Workshop.',
        '2018.11',
        '2018.11'
      ),
      new TimelineEntry(
        'education',
        false,
        'Docker Mastery',
        'December 2018',
        'Online course at Udemy.com.',
        '2018.12',
        '2018.12'
      ),
      new TimelineEntry(
        'education',
        false,
        'LUP KRAFT - Leadership Development Program',
        'March 2019 - November 2019',
        'Inhouse program at Sykehuspartner, intended for existing and potential leaders.',
        '2019.03',
        '2019.11'
      ),
      new TimelineEntry(
        'education',
        false,
        'Windows PowerShell: For the IT Professional',
        'April 2019',
        'A 4 day Microsoft Premier Workshop.',
        '2019.04',
        '2019.04'
      ),
      new TimelineEntry(
        'education',
        false,
        'REST API Design, Development & Management',
        'November 2019',
        'Online course at Udemy.com.',
        '2019.11',
        '2019.11'
      ),
      new TimelineEntry(
        'education',
        false,
        'Angular 8 - The Complete Guide',
        'August 2019 - November 2019',
        'Online course at Udemy.com.',
        '2019.08',
        '2019.11'
      ),
      new TimelineEntry(
        'education',
        false,
        'Angular & NodeJS - The MEAN Stack Guide',
        'December 2019',
        'Online course at Udemy.com.',
        '2019.12',
        '2019.12'
      ),
      new TimelineEntry(
        'work',
        true,
        'IT Service Technician at R/M/S Scandinavia AS',
        'November 2003 - September 2005',
        'Work.',
        '2003.11',
        '2005.09'
      ),
      new TimelineEntry(
        'work',
        true,
        'Civilian Service at Aker Universitetssykehus HF',
        'September 2005 - September 2006',
        'Work.',
        '2005.09',
        '2006.09'
      ),
      new TimelineEntry(
        'work',
        true,
        'IT Consultant at Aker Universitetssykehus HF',
        'September 2006 - July 2008',
        'Work.',
        '2006.09',
        '2008.07'
      ),
      new TimelineEntry(
        'work',
        false,
        'IT Consultant at Sykehuspartner, avd. IKT',
        'July 2010 - August 2010',
        'Summer internship.',
        '2010.07',
        '2010.08'
      ),
      new TimelineEntry(
        'work',
        false,
        'Service Technician at Coop Norge Handel AS',
        'June 2011 - August 2011',
        'Summer internship.',
        '2011.06',
        '2011.08'
      ),
      new TimelineEntry(
        'work',
        false,
        'Assistant Teacher at the NMBU',
        'February 2012 - June 2012',
        'Course: INF120 – Programming and data processing.',
        '2012.02',
        '2012.06'
      ),
      new TimelineEntry(
        'work',
        false,
        'Service Technician at Coop Norge Handel AS',
        'June 2012 - August 2012',
        'Summer internship.',
        '2012.06',
        '2012.08'
      ),
      new TimelineEntry(
        'work',
        false,
        'Researcher at the NMBU',
        'June 2013 - Juny 2013',
        'A short-term contract job to continue some of the work I had started with my master\'s thesis. \
        I used a test suite I had developed in Python to test some of the most popular neural network simulators.',
        '2013.06',
        '2013.07'
      ),
      new TimelineEntry(
        'work',
        true,
        'Special Consultant at Sykehuspartner HF',
        'January 2014 - November 2019',
        '2014 - 2018: Operationally responsible at the Operations Bridge. <br /><br />After 2018: Developer and team leader.',
        '2014.01',
        '2019.11'
      ),
      new TimelineEntry(
        'work',
        false,
        'Private Teacher for two 13 year old girls',
        'October 2016 - June 2018',
        'Work.',
        '2016.10',
        '2018.06'
      ),
      new TimelineEntry(
        'work',
        false,
        'Frivillig kommunikasjonsmedarbeider i MDG',
        'July 2017 - October 2017',
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
    const tickmarks: Array<number> = [];
    for (let i = Math.ceil(this.firstTimelineDate); i <= Math.ceil(this.lastTimelineDate); i++) {
      tickmarks.push(i);
    }
    this.tickmarks = tickmarks;
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
    return this.timelineLeftBound + ((date - this.firstTimelineDate) /
                                    (this.lastTimelineDate - this.firstTimelineDate)) * (this.timelineRightBound - this.timelineLeftBound);
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
