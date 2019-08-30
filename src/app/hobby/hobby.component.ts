import {Component, EventEmitter, Input, OnChanges, Output, Inject, OnInit, OnDestroy, ElementRef, SimpleChanges} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {Subscription, timer} from 'rxjs';


/** @dynamic Prevent compiling error when using type `Document` https://github.com/angular/angular/issues/20351 */
@Component({
    selector: 'app-hobby',
    templateUrl: './hobby.component.html',
    styleUrls: ['./hobby.component.css']
})
export class HobbyComponent implements OnChanges {

    @Output() MouseEnter: EventEmitter<any> = new EventEmitter();
    @Output() MouseLeave: EventEmitter<any> = new EventEmitter();

    @Input() restingRadius: number;
    @Input() highlightRadius: number;
    @Input() label: number;
    @Input() color: string;
    @Input() animationDuration: number;

    // <svg> of component
    svgElement: HTMLElement = null;
    window: Window;

    svg: any;

    lastRadius = this.restingRadius;

    private timerSubscription: Subscription;

    render = () => {
        this.animate(this.restingRadius);
    }

    draw = (radius: number) => {

        this.lastRadius = radius;

        // determine box size
        const boxSize = this.highlightRadius * 2;
        // the centre of the circle
        const centre = {x: boxSize / 2, y: boxSize / 2};

        // create title object
        const title = {
            x: centre.x,
            y: centre.y,
            color: '#444444',
            text: this.label,
        };

        // Bring it all together
        this.svg = {
            viewBox: `0 0 ${boxSize} ${boxSize}`,
            width: boxSize,
            height: boxSize,
            title,
            circle: {
                cx: centre.x,
                cy: centre.y,
                r: radius,
                stroke: this.color,
            }
        };
    }

    animate = (toRadius: number) => {

        if (this.timerSubscription && !this.timerSubscription.closed) {
            this.timerSubscription.unsubscribe();
        }

        const times = 20;
        const interval = this.animationDuration / times;
        const step = (toRadius - this.lastRadius) / times;

        let count = this.lastRadius;
        if (this.lastRadius < toRadius) {
            this.timerSubscription = timer(0, interval).subscribe(() => {
                count += step;
                if (count <= toRadius) {
                  this.draw(count);
                } else {
                  this.draw(toRadius);
                  this.timerSubscription.unsubscribe();
                }
            });
        } else {
            this.timerSubscription = timer(0, interval).subscribe(() => {
                count += step;
                if (count >= toRadius) {
                  this.draw(count);
                } else {
                  this.draw(toRadius);
                  this.timerSubscription.unsubscribe();
                }
            });
        }
    }

    emitMouseenterEvent = (event: any) => {
      this.animate(this.highlightRadius);
      this.MouseEnter.emit(event);
    }

    emitMouseleaveEvent = (event: any) => {
      this.animate(this.restingRadius);
      this.MouseLeave.emit(event);
    }

    private min = (a: number, b: number) => {
        return a < b ? a : b;
    }

    private max = (a: number, b: number) => {
        return a > b ? a : b;
    }

    public isDrawing(): boolean {
        return (this.timerSubscription && !this.timerSubscription.closed);
    }

    public findSvgElement = function() {
        if (this.svgElement === null) {
            const tags = this.elRef.nativeElement.getElementsByTagName('svg');
            if (tags.length > 0) {
                this.svgElement = tags[0];
            }
        }
    };

    ngOnChanges(changes: SimpleChanges) {
        this.render();
    }

    constructor(private elRef: ElementRef, @Inject(DOCUMENT) private document: Document) {
        this.document = document;
        this.window = this.document.defaultView;
        // Object.assign(this.options, defaultOptions);
        // Object.assign(this.defaultOptions, defaultOptions);
    }
}
