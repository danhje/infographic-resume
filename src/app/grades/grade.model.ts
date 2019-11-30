export class Grade {
  public xPosition: number;
  public yPosition: number;
  public cssClass: string;

  constructor(public subjectCode: string, public subjectName: string, public category: string, public grade: number, public points: number, public semester: number) {}
}
