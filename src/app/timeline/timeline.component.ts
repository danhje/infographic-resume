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
  timelineLeftBound = 100;
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
        'High School',
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
        'Course track: Environmental Physics and Renewable Energy<br />Thesis: Statistical tests for connection algorithms for structured neural networks<br /> <br />This study gave me a good combination of skills in natural science and technology. I got a solid foundation in math, physics and informatics, and a diverse toolbox of skills for problem solving. I choose several courses in programming and data processing, and my thesis involved writing a Python test suite for neural network simulators.',
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
        'Online course at Udemy.com. The course focused on classification with the use of the Python module scikit-learn. Different classifiers were used, for example decision tree, logistic regression, naive bayes and k-nearest neighbors. I also learned about using feature extraction and preprocessing to achieve increased accuracy.',
        '2017.06',
        '2017.06'
      ),
      new TimelineEntry(
        'education',
        false,
        'Autodesk AutoCAD 2017',
        'July 2017',
        'Online course at Udemy.com. The course covered topics like commands, drafting methods, extracting information from the model, precision tools (OSNAP, ORTHO, grips), the use of layers, annotations, blocks (for reuse), etc.',
        '2017.07',
        '2017.07'
      ),
      new TimelineEntry(
        'education',
        false,
        'PLC Programming From Scratch (PLC 1)',
        'November 2017 - December 2017',
        'Online course at Udemy.com. A very thorough course which equipped me with all the tools needed to be able to program PLCs. A few of the topics covered in the course: Ladder logic (conditions and outputs, branches, addressing, the most common instructions, best practices), data types, resolution and precision, PID control, PLC and module configuration, HMI development and integration, analog and digital signal processing, serial and ethernet connections, alarms, notifications, emulation and debugging.',
        '2017.11',
        '2017.12'
      ),
      new TimelineEntry(
        'education',
        false,
        'Introduction to Life-cycle Assessment (LCA)',
        'May 2018',
        'A one-day course, taught by Dr. Johannes Daae, associate professor at OsloMet and eco-designer at Bergfall Miljørådgivere AS. Topics covered in the course: How to read and compare LCAs, how to perform an LCA / EPD, choosing a functional unit, system boundaries, cut-off, inventory (LCI) diagram, impact assessment, different allocation methods for partitioning the environmental load, relevant software and datasets and Product Category Rules (PCR).',
        '2018.05',
        '2018.05'
      ),
      new TimelineEntry(
        'education',
        false,
        'System Center 2012 Operations Manager: Management Pack Authoring',
        'November 2018',
        'A 5 day Microsoft Premier Workshop which covered how to design management packs for System Center Operation Manager through XML editing in Visual Studio.',
        '2018.11',
        '2018.11'
      ),
      new TimelineEntry(
        'education',
        false,
        'Docker Mastery',
        'December 2018',
        'En excellent course at Udemy.com, with lots of exercises. The course covered container and image basics, dockerfiles, image layers, persistent data (volumes and bind mounting), image layers, networks, DNS round robin og docker swarm clusters (services, overlay networks, routing mesh, swarm stacks and swarm secrets).',
        '2018.12',
        '2018.12'
      ),
      new TimelineEntry(
        'education',
        false,
        'LUP KRAFT - Leadership Development Program',
        'March 2019 - November 2019',
        'In-house program at Sykehuspartner, intended for existing and potential leaders. The program consisted of 7 conferences with theory and training, as well as weekly group meetings. Emphasis was put on practical experimentation and training in ones own daily work situation in between the conferences. All attendees chose an actual challenge to work on through the 9 month duration of the program. Some key topics covered: Customer and business knowledge, insight into one\'s own leadership style, values and preferences (through Jungian type psychology), change management, ADKAR, managerial prerogative, conflict management, the difficult conversation, communication skills, relational coordination, the coaching leadership style, presentation skills, continuous improvement.',
        '2019.03',
        '2019.11'
      ),
      new TimelineEntry(
        'education',
        false,
        'Windows PowerShell: For the IT Professional',
        'April 2019',
        'A 4 day Microsoft Premier Workshop which covered, among other things, script blocks, functions, providers, pipelining, flow control, hashtables and custom objects.',
        '2019.04',
        '2019.04'
      ),
      new TimelineEntry(
        'education',
        false,
        'REST API Design, Development & Management',
        'November 2019 - December 2019',
        'Online course at Udemy.com which covered the six REST architectural constraints, best practices for endpoint naming, the use of subdomains, CRUD and non-CRUD operations, nesting and how to avoid deep nesting, error handling, handling breaking and non-breaking changes, versioning, caching, the benefits of partial response, API security, OAuth for authorization, and much more.',
        '2019.11',
        '2019.12'
      ),
      new TimelineEntry(
        'education',
        false,
        'Angular 8 - The Complete Guide',
        'October 2019 - February 2020',
        'Online course at Udemy.com. The course covered topics like data binding (property binding, event binding, two-way binding), structural directives (ngIf, ngFor, ngSwitch), built-in attribute directives (ngStyle, ngClass), custom structural and attribute directives, lifecycle hooks, host binding, services, routing and pipes. This website was built in parallel with taking the course, by way of practicing what I learned there.',
        '2019.10',
        '2020.02'
      ),
      new TimelineEntry(
        'education',
        false,
        'DevOps Fundamentals',
        'January 2020',
        'A 4 day Microsoft Premier Workshop which covered both the DevOps methodology, as well as common tools used by a DevOps team. Through practical exercises the attendees got experience with the planning of sprints with user stories and tasks, setting up and configuring CI/CD pipelines, and to develop, release, deploy, operate and monitor apps. Azure DevOps Services was used, as well as Git, Visual Studio, VS Code, Azure Application Insight, Azure Monitor, Azure SQL and Azure Web App.',
        '2020.01',
        '2020.01'
      ),
      new TimelineEntry(
        'education',
        false,
        'Async Techniques and Examples in Python',
        'April 2021',
        'Asyncio, threading, multiprocessing, task coordination, thread safety, and C-based parallelism with Cython.',
        '2021.04',
        '2021.04'
      ),
      new TimelineEntry(
        'work',
        true,
        'IT Service Technician at R/M/S Scandinavia AS',
        'November 2003 - September 2005',
        'Maintenance and repair of desktop computers, laptops and printers.',
        '2003.11',
        '2005.09'
      ),
      new TimelineEntry(
        'work',
        true,
        'Civilian Service at Aker Universitetssykehus HF',
        'September 2005 - September 2006',
        'IT support (remote and onsite), user management, system administration, server and network operation.',
        '2005.09',
        '2006.09'
      ),
      new TimelineEntry(
        'work',
        true,
        'IT Consultant at Aker Universitetssykehus HF',
        'September 2006 - July 2008',
        'I developed a system for digital requisition of new user accounts and automated account creation based on the requisitions. This dramatically reduced the time spent on user management. In addition, i performed IT support (remote and onsite), system administration, and server and network operation.',
        '2006.09',
        '2008.07'
      ),
      new TimelineEntry(
        'work',
        false,
        'IT Consultant at Sykehuspartner IT Department',
        'July 2010 - August 2010',
        'Summer internship. Mainly onsite IT support, but also some user management, system administration, server and network operation.',
        '2010.07',
        '2010.08'
      ),
      new TimelineEntry(
        'work',
        false,
        'Service Technician at Coop Norge Handel AS',
        'June 2011 - August 2011',
        'Summer internship. IT support and user management.',
        '2011.06',
        '2011.08'
      ),
      new TimelineEntry(
        'work',
        false,
        'Assistant Teacher at the NMBU',
        'February 2012 - June 2012',
        'I helped students with programming assignments, and led the practice classes for the course INF120 – Programming and data processing. ',
        '2012.02',
        '2012.06'
      ),
      new TimelineEntry(
        'work',
        false,
        'Service Technician at Coop Norge Handel AS',
        'June 2012 - August 2012',
        'Summer internship. IT support and user management.',
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
        'January 2014 - present',
        '2014 - 2018: IT Operations Manager at the Operations Bridge. Responsible for event management, as well as leading the resolution of major incidents by managing the team of technical experts that are mobilized to resolve the issue.<br /><br />2018 - present: Developer in the monitoring department, developing both infrastructure monitoring and end user monitoring (EUM) through scripts that emulate users of our IT services.',
        '2014.01',
        '2020.12'
      ),
      new TimelineEntry(
        'work',
        true,
        'Senior Analyst at Statnett SF',
        'January 2021 - present',
        'As a senior analyst and python developer at Statnett\'s department for Data Science and Data Modelling, I work side by side with data scientists and power system experts to develop and deploy services and modells that monitor, operate and balance the norwegian power grid.',
        '2021.00',
        '2022.01'
      ),
      new TimelineEntry(
        'work',
        false,
        'Private Teacher for Two 13 Year Old Girls',
        'October 2016 - June 2018',
        'Private math tutoring and homework support.',
        '2016.10',
        '2018.06'
      ),
      new TimelineEntry(
        'work',
        false,
        'Communication Assistant for the Norwegian Green Party',
        'July 2017 - October 2017',
        'Volunteer work, answering questions directed at the Green Party on social media before the parliamentary election.',
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
      return 80 - entry.yIndex * 18;
    } else {
      return 120 + entry.yIndex * 18;
    }
  }

  onClick(event: MouseEvent) {
    this.elementClicked.emit(event);
  }
}
