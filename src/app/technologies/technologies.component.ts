import { Component, ViewChild, ElementRef } from '@angular/core';

declare const d3: any;

@Component({
  selector: 'app-technologies',
  templateUrl: './technologies.component.html',
  styleUrls: ['./technologies.component.css']
})
export class TechnologiesComponent {
  @ViewChild('cloud', {static: true}) cloud: ElementRef;

  sortByFrequency(arr) {
    const f = {};
    arr.forEach((i) => { f[i] = 0; });
    const u = arr.filter((i) => ( ++f[i] === 1 ));
    return u.sort((a, b) => ( f[b] - f[a] ));
  }

  onClick() {
    const cloudElement = this.cloud.nativeElement;
    const firstSvg = cloudElement.querySelector('svg');
    if (firstSvg) {
      firstSvg.remove();
    }

    const cWidth = 300;
    const cHeight = 300;
    const fontName = 'Impact';

    const words = [
      {text: 'JavaScript', size: 35},
      {text: 'Angular', size: 35},
      {text: 'Python', size: 50},
      {text: 'HTML5', size: 30},
      {text: 'CSS3', size: 30},
      {text: 'Node.js', size: 5},
      {text: 'iPython', size: 30},
      {text: 'MATLAB', size: 10},
      {text: 'R', size: 5},
      {text: 'PowerShell', size: 40},
      {text: 'MongoDB', size: 9},
      {text: 'SQL', size: 10},
      {text: 'Git', size: 20},
      {text: 'GitHub', size: 20},
      {text: 'Docker', size: 20},
      {text: 'Objective C', size: 20},
      {text: 'Swift', size: 10},
      {text: 'Micro Focus Operations Manager', size: 5},
      {text: 'Microsoft SCOM', size: 40},
      {text: 'Microsoft IIS', size: 5},
      {text: 'TypeScript', size: 25},
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
      {text: 'Xcode', size: 20}
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
      .range([10, 100 * fRatio / 2]);

    const colorArray = [];
    for (let i = 1; i <= 5; i++) {
      colorArray.push(getComputedStyle(document.documentElement).getPropertyValue(`--highlight-color-${i}`));
    }

    const fillColor = () => colorArray[Math.floor(Math.random() * 5)];

    for (let i = 0; i < 100; i++) {
      console.log(fillColor());
    }

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
          .style('fill', fillColor)
          .attr('text-anchor', 'middle')
          .attr('transform', d => 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')')
          .text(d => d.text);
    };

    d3.layout.cloud()
      .size([cWidth, cHeight])
      .words(words)
      .rotate(() => ( Math.floor(Math.random() * 2) * 90 - 90 ))
      .font(fontName)
      .fontSize((d) => ( fontScale(d.size) ))
      .on('end', draw)
      .start();
  }
}
