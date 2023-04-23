import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PrngService } from '../prng.service';

declare const d3: any;

@Component({
  selector: 'app-technologies',
  templateUrl: './technologies.component.html',
  styleUrls: ['./technologies.component.css']
})
export class TechnologiesComponent implements OnInit {
  @ViewChild('cloud', {static: true}) cloud: ElementRef;

  constructor(private prngService: PrngService) {}

  ngOnInit() {
    const cWidth = 300;
    const cHeight = 280;
    const fontName = '-apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif';
    const fontWeight = 300;

    const words = [
      {text: 'Microsoft SCOM', size: 20},
      {text: 'JavaScript', size: 35},
      {text: 'Angular', size: 35},
      {text: 'Python', size: 50},
      {text: 'HTML5', size: 25},
      {text: 'CSS3', size: 25},
      {text: 'Node.js', size: 5},
      {text: 'iPython', size: 15},
      {text: 'R', size: 5},
      {text: 'PowerShell', size: 25},
      {text: 'MongoDB', size: 9},
      {text: 'SQL', size: 10},
      {text: 'Git', size: 35},
      {text: 'GitHub', size: 20},
      {text: 'GitHub Actions', size: 20},
      {text: 'Docker', size: 20},
      {text: 'Docker Compose', size: 30},
      {text: 'Objective C', size: 20},
      {text: 'Swift', size: 10},
      {text: 'Operations Bridge Manager', size: 10},
      {text: 'Microsoft IIS', size: 5},
      {text: 'TypeScript', size: 25},
      {text: 'Xcode', size: 20},
      {text: 'C++', size: 5},
      {text: 'GraphQL', size: 15},
      {text: 'GraphDB', size: 15},
      {text: 'SPARQL', size: 15},
      {text: 'Hasura', size: 10},
      {text: 'JSON-LD', size: 5},
      {text: 'Java', size: 10},
      {text: 'Groovy', size: 5},
      {text: 'C#', size: 5},
      {text: 'Visual Studio Code', size: 15},
      {text: 'Atom', size: 10},
      {text: 'NumPy', size: 20},
      {text: 'SciPy', size: 20},
      {text: 'scikit-learn', size: 5},
      {text: 'TensorFlow', size: 5},
      {text: 'AutoCAD', size: 5},
      {text: 'REST API', size: 15},
      {text: 'LaTeX', size: 15},
      {text: 'PHP', size: 5},
      {text: 'WordPress', size: 5},
      {text: 'Mercurial', size: 5},
      {text: 'Bitbucket', size: 5},
      {text: 'Slack', size: 5},
      {text: 'Trello', size: 20},
      {text: 'Jira', size: 20},
      {text: 'AppleScript', size: 5},
      {text: 'homebrew', size: 5},
      {text: 'npm', size: 5},
      {text: 'Sourcetree', size: 15},
      {text: 'Eclipse', size: 5},
      {text: 'Nginx', size: 7},
      {text: 'Bootstrap', size: 7},
      {text: 'jQuery', size: 10},
      {text: 'RXJS', size: 5},
      {text: 'D3.js', size: 5},
      {text: 'React', size: 5},
      {text: 'Vim', size: 10},
      {text: 'RegEx', size: 20},
      {text: 'PyCharm', size: 30},
      {text: 'AD', size: 15},
      {text: 'Excel', size: 15},
      {text: 'MacOS', size: 20},
      {text: 'Sketch', size: 10},
      {text: 'Sphinx', size: 5},
      {text: 'pipenv', size: 15},
      {text: 'Pester', size: 20},
      {text: 'Django', size: 10},
      {text: 'doctest', size: 20},
      {text: 'GitLab', size: 30},
      {text: 'Cython', size: 10},
      {text: 'pandas', size: 30},
      {text: 'pytest', size: 25},
      {text: 'unittest', size: 5},
      {text: 'pydantic', size: 15},
      {text: 'Azure DevOps', size: 5},
      {text: 'Zsh', size: 10},
      {text: 'YML', size: 10},
      {text: 'FastAPI', size: 15},
      {text: 'Hypothesis', size: 5},
      {text: 'Swagger', size: 5},
      {text: 'Kafka', size: 15},
      {text: 'Jupyter Notebook', size: 10},
      {text: 'OpenShift', size: 15},
      {text: 'Splunk', size: 10},
      {text: 'Grafana', size: 5},
      {text: 'Poetry', size: 30},
      {text: 'Rust', size: 15},
      {text: 'Linux', size: 20},
    ];

    const cTemp = document.createElement('canvas');
    const ctx = cTemp.getContext('2d');
    ctx.font = '100px ' + fontName;

    const fRatio = 0.7236749116607774;
    const fontScale = d3.scale.linear()
      .domain([
        d3.min(words, (d) => ( d.size )),
        d3.max(words, (d) => ( d.size ))
      ])
      .range([5, 100 * fRatio / 2]);

    const colorArray = [];
    for (let i = 1; i <= 5; i++) {
      colorArray.push(getComputedStyle(document.documentElement).getPropertyValue(`--highlight-color-${i}`));
    }

    let colorIterator = 0;
    const fillColor = () => {
      colorIterator = (colorIterator >= 4) ? 0 : colorIterator + 1;
      return colorArray[colorIterator];
    };

    let angleIterator = 0;
    const fontAngle = () => {
      angleIterator = (angleIterator >= 2) ? 0 : angleIterator + 1;
      return angleIterator === 0 ? 90 : 0;
    };

    const draw = (w) => {
      d3.select('.cloud').append('svg')
          .attr('width', cWidth)
          .attr('height', cHeight)
        .append('g')
          .attr('transform', 'translate(' + cWidth / 2 + ',' + cHeight / 2 + ')')
        .selectAll('text')
          .data(w)
        .enter().append('text')
          .style('font-size', d => d.size + 'px')
          .style('font-family', fontName)
          .style('font-weight', fontWeight)
          .style('fill', fillColor)
          .attr('text-anchor', 'middle')
          .attr('transform', d => 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')')
          .text(d => d.text);
      // const textElems = this.cloud.nativeElement.querySelectorAll('text');
      // [].forEach.call(textElems, (elem) => {
      //   console.log(elem);
      //   elem.style.transform = 'scale(1.2)';
      // });
    };

    d3.layout.cloud()
      .size([cWidth, cHeight])
      .words(words)
      .rotate(() => ( fontAngle() ))
      .font(fontName)
      .fontSize((d) => ( fontScale(d.size) ))
      .fontWeight(fontWeight)
      .random(this.prngService.nextFloat.bind(this.prngService))
      .on('end', draw)
      .start();
  }
}
