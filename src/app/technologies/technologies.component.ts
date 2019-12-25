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

  draw(words, bounds) {
    // move and scale cloud bounds to canvas
    // bounds = [{x0, y0}, {x1, y1}]
    const cHeight = 300;
    const cWidth = 300;
    const fontName = 'Impact';
    const bWidth = bounds[1].x - bounds[0].x;
    const bHeight = bounds[1].y - bounds[0].y;
    const bMidX = bounds[0].x + bWidth / 2;
    const bMidY = bounds[0].y + bHeight / 2;
    const bDeltaX = cWidth / 2 - bounds[0].x + bWidth / 2;
    const bDeltaY = cHeight / 2 - bounds[0].y + bHeight / 2;
    const bScale = bounds ? Math.min( cWidth / bWidth, cHeight / bHeight) : 1;

    console.log(
      'bounds (' + bounds[0].x +
      ', ' + bounds[0].y +
      ', ' + bounds[1].x +
      ', ' + bounds[1].y +
      '), width ' + bWidth +
      ', height ' + bHeight +
      ', mid (' + bMidX +
      ', ' + bMidY +
      '), delta (' + bDeltaX +
      ', ' + bDeltaY +
      '), scale ' + bScale
    );

    // the library's bounds seem not to correspond to reality?
    // try using .getBBox() instead?

    const svg = d3.select('.cloud').append('svg')
      .attr('width', cWidth)
      .attr('height', cHeight);

    const wCloud = svg.append('g')
      // tslint:disable-next-line: no-bitwise
      .attr('transform', 'translate(' + [bWidth, bHeight] + ') scale(' + bScale + ')')
      .selectAll('text')
      .data(words)
      .enter().append('text')
      .style('font-size', (d) => ( d.size + 'px' ))
      .style('font-family', fontName)
      .style('fill', (d, i) => ( d3.scale.category20(i) ))
      .attr('text-anchor', 'middle')
      .transition()
      .duration(500)
      .attr('transform', (d) => ( 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')' ))
      .text((d) => ( d.text ));

    // TO DO: function to find min and max x, y of all words
    // and use it as the group's bbox
    // then do the transformation

    // const bbox = wCloud.node(0).getBBox();
    // console.log(
    //   'bbox (x: ' + bbox.x +
    //   ', y: ' + bbox.y +
    //   ', w: ' + bbox.width +
    //   ', h: ' + bbox.height +
    //   ')'
    // );
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

    console.log('first ' + fontName);
    const text = 'javascript javascript javascript angular';

    const words = this.sortByFrequency(text.split(/[ ,.]+/) )
      .map((d, i) => ( {text: d, size: -i} ));

    const cTemp = document.createElement('canvas');
    const ctx = cTemp.getContext('2d');
    ctx.font = '100px ' + fontName;

    const fRatio = Math.min(cWidth, cHeight) / ctx.measureText(words[0].text).width;
    const fontScale = d3.scale.linear()
      .domain([
        d3.min(words, (d) => ( d.size )),
        d3.max(words, (d) => ( d.size ))
      ])
      .range([20, 100 * fRatio / 2]);

    d3.layout.cloud()
      .size([cWidth, cHeight])
      .words(words)
      .rotate(() => ( Math.floor(Math.random() * 2) * 90 ))
      .font(fontName)
      .fontSize((d) => ( fontScale(d.size) ))
      .on('end', this.draw)
      .start();
  }
}
