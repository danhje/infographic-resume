export class Course {
  public xPosition: number;
  public yPosition: number;
  public cssClass: string;

  constructor(public subjectCode: string, public subjectName: string, public category: string, public grade: number, public points: number, public semester: number) {}

  letterGrade() {
    switch (this.grade) {
      case 1: return 'A';
      case 2: return 'B';
      case 3: return 'C';
      case 4: return 'D';
      case 5: return 'E';
      case 6: return 'F';
    }
  }
}
