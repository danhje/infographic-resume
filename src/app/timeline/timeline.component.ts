import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { TimelineEntry } from './timelineentry.model';
import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';

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

  ngOnInit() {
    this.populateTimelineEntries();
    this.createTickmarks();
  }

  populateTimelineEntries() {
    const data = [
      new TimelineEntry(
        'education',
        'High school',
        'Elective course: IT.',
        '2002.08',
        '2005.06'
      ),
      new TimelineEntry(
        'education',
        'Mathematics (2MX)',
        'Admission requirement for engineering programmes. Taken online at Sonans Nettgymnas.',
        '2006.02',
        '2006.04'
      ),
      new TimelineEntry(
        'education',
        'Mathematics (3MX)',
        'Admission requirement for engineering programmes. Taken online at NKI Fjernundervisning.',
        '2006.08',
        '2006.12'
      ),
      new TimelineEntry(
        'education',
        'Physics (2FY)',
        'Admission requirement for engineering programmes. Taken online at NKI Fjernundervisning.',
        '2008.01',
        '2008.05'
      ),
      new TimelineEntry(
        'education',
        'Master of Technology (Civil Engineering) at the Norwegian University of Life Sciences (NMBU)',
        'Environmental physics and renewable energy.',
        '2008.08',
        '2013.06'
      ),
      new TimelineEntry(
        'education',
        'Principles of Project Management',
        'Online course at Open2study.com.',
        '2013.11',
        '2013.11'
      ),
      new TimelineEntry(
        'education',
        'Solar Energy',
        'A practical, 2 day course on solar energy.',
        '2016.09',
        '2016.09'
      ),
      new TimelineEntry(
        'education',
        'Machine Learning for Beginners',
        'Online course at Udemy.com.',
        '2017.06',
        '2017.06'
      ),
      new TimelineEntry(
        'education',
        'Autodesk AutoCAD 2017',
        'Online course at Udemy.com.',
        '2017.07',
        '2017.07'
      ),
      new TimelineEntry(
        'education',
        'PLC Programming From Scratch (PLC 1)',
        'Online course at Udemy.com.',
        '2017.11',
        '2017.12'
      ),
      new TimelineEntry(
        'education',
        'Introduction to Life-cycle Assessment (LCA)',
        'Course organized by Tekna.',
        '2018.05',
        '2018.05'
      ),
      new TimelineEntry(
        'education',
        'System Center 2012 Operations Manager: Management Pack Authoring',
        'A 5 day Microsoft Premier Workshop.',
        '2018.11',
        '2018.11'
      ),
      new TimelineEntry(
        'education',
        'Docker Mastery',
        'Online course at Udemy.com.',
        '2018.12',
        '2018.12'
      ),
      new TimelineEntry(
        'education',
        'LUP KRAFT - Leadership Development Program',
        'Inhouse program at Sykehuspartner, intended for existing and potential leaders.',
        '2019.03',
        '2019.11'
      ),
      new TimelineEntry(
        'education',
        'Windows PowerShell: For the IT Professional',
        'A 4 day Microsoft Premier Workshop.',
        '2019.04',
        '2019.04'
      ),
      new TimelineEntry(
        'education',
        'REST API Design, Development & Management',
        'Online course at Udemy.com.',
        '2019.08',
        '2019.11'
      ),
      new TimelineEntry(
        'education',
        'Angular 8 - The Complete Guide',
        'Online course at Udemy.com.',
        '2019.08',
        '2019.11'
      ),
      new TimelineEntry(
        'education',
        'Angular & NodeJS - The MEAN Stack Guide',
        'Online course at Udemy.com.',
        '2019.09',
        '2019.10'
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
      if (existingEntry.yIndex === newEntry.yIndex) {
        if (newEntry.xStart >= existingEntry.xStart && newEntry.xStart <= existingEntry.xEnd) {
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

  }

  entryWidth(entry: TimelineEntry) {
    return Math.max(this.minEntryWidth, this.xPositionFromDate(entry.endNumber) - this.xPositionFromDate(entry.startNumber));
  }

  xPositionFromDate(date: number) {
    return ((date - this.firstTimelineDate) / (this.lastTimelineDate - this.firstTimelineDate)) * this.timelineWidth;
  }

  yPosition(entry: TimelineEntry) {
    if (entry.type === 'education') {
      return 100 - entry.yIndex * 18;
    }
  }

  onClick(event: MouseEvent) {
    this.elementClicked.emit(event);
  }
}
