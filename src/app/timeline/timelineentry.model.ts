export class TimelineEntry {
  public type: string;
  public title: string;
  public description: string;
  public startNumber: number;
  public endNumber: number;
  public yIndex: number;
  public xStart: number;
  public xEnd: number;
  public width: number;

  constructor(type: string, title: string, description: string, start: string, end: string) {
    this.type = type;
    this.title = title;
    this.description = description;
    this.startNumber = this.datestringToNumber(start);
    this.endNumber = this.datestringToNumber(end) + (1 / 12);
    this.yIndex = 0;
  }

  datestringToNumber(datestring: string) {
    const ones = parseInt(datestring.split('.')[0], 10);
    const tenths = parseInt(datestring.split('.')[1], 10) / 12;
    return ones + tenths;
  }
}
