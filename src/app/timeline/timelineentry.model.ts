export class TimelineEntry {
  public type: string;
  public primary: boolean;
  public title: string;
  public subtitle: string;
  public description: string;
  public startNumber: number;
  public endNumber: number;
  public yIndex: number;
  public xStart: number;
  public xEnd: number;
  public width: number;

  constructor(type: string, primary: boolean, title: string, subtitle: string, description: string, start: string, end: string) {
    this.type = type;
    this.primary = primary;
    this.title = title;
    this.subtitle = subtitle;
    this.description = description;
    this.startNumber = this.datestringToNumber(start);
    this.endNumber = this.datestringToNumber(end);
    this.yIndex = 0;
  }

  datestringToNumber(datestring: string) {
    const ones = parseInt(datestring.split('.')[0], 10);
    const tenths = parseInt(datestring.split('.')[1], 10) / 12;
    return ones + tenths;
  }
}
