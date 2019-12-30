import { Component, OnInit } from '@angular/core';
import { PrngService } from '../prng.service';

declare const d3: any;

@Component({
  selector: 'app-technologies',
  templateUrl: './technologies.component.html',
  styleUrls: ['./technologies.component.css']
})
export class TechnologiesComponent implements OnInit {

  constructor(private prngService: PrngService) {}

  ngOnInit() {
    const cWidth = 300;
    const cHeight = 280;
    const fontName = '-apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif';
    const fontWeight = 300;

    const words = [
      {text: 'Microsoft SCOM', size: 30},
      {text: 'JavaScript', size: 35},
      {text: 'Angular', size: 35},
      {text: 'Python', size: 50},
      {text: 'HTML5', size: 30},
      {text: 'CSS3', size: 30},
      {text: 'Node.js', size: 5},
      {text: 'iPython', size: 30},
      {text: 'MATLAB', size: 10},
      {text: 'R', size: 5},
      {text: 'PowerShell', size: 35},
      {text: 'MongoDB', size: 9},
      {text: 'SQL', size: 10},
      {text: 'Git', size: 20},
      {text: 'GitHub', size: 20},
      {text: 'Docker', size: 20},
      {text: 'Objective C', size: 20},
      {text: 'Swift', size: 10},
      {text: 'Micro Focus Operations Manager', size: 10},
      {text: 'Microsoft IIS', size: 5},
      {text: 'TypeScript', size: 25},
      {text: 'Xcode', size: 20},
      {text: 'C++', size: 5},
      {text: 'GraphQL', size: 5},
      {text: 'JSON-LD', size: 10},
      {text: 'Java', size: 10},
      {text: 'Groovy', size: 5},
      {text: 'C#', size: 5},
      {text: 'Visual Studio Code', size: 10},
      {text: 'Atom', size: 10},
      {text: 'NumPy', size: 20},
      {text: 'SciPy', size: 20},
      {text: 'scikit-learn', size: 5},
      {text: 'TensorFlow', size: 5},
      {text: 'AutoCAD', size: 5},
      {text: 'REST API', size: 15},
      {text: 'LaTeX', size: 15},
      {text: 'Parse Server', size: 15},
      {text: 'PHP', size: 5},
      {text: 'WordPress', size: 5},
      {text: 'VBScript', size: 10},
      {text: 'Visual Basic', size: 5},
      {text: 'BASIC', size: 5},
      {text: 'Delphi', size: 5},
      {text: 'AutoHotkey', size: 5},
      {text: 'Mercurial', size: 10},
      {text: 'Bitbucket', size: 10},
      {text: 'Slack', size: 5},
      {text: 'Trello', size: 20},
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
      {text: 'Vim', size: 5},
      {text: 'RegEx', size: 20},
      {text: 'PyCharm', size: 5},
      {text: 'AD', size: 15},
      {text: 'Excel', size: 20},
      {text: 'IFTTT', size: 5},
      {text: 'MacOS', size: 20},
      {text: 'Sketch', size: 10},
      {text: 'Sphinx', size: 5}
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
