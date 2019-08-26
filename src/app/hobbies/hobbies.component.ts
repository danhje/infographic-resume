import {Component, EventEmitter, Input, OnChanges, Output, Inject, OnInit, OnDestroy, ElementRef, SimpleChanges} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {Subscription, timer} from 'rxjs';

export interface CircleProgressOptionsInterface {
    restingRadius?: number;
    highlightRadius?: number;
    label?: string;
    animationDuration?: number;
}

export class CircleProgressOptions implements CircleProgressOptionsInterface {
    color = '#78C000';
    animationDuration = 500;
}

/** @dynamic Prevent compiling error when using type `Document` https://github.com/angular/angular/issues/20351 */
@Component({
    selector: 'app-hobbies',
    templateUrl: './hobbies.component.html'
})
export class CircleProgressComponent implements OnChanges {

    @Output() MouseEnter: EventEmitter<any> = new EventEmitter();

    @Input() restingRadius: number;
    @Input() hightlightRadius: number;
    @Input() label: number;
    @Input() color: string;
    @Input() animationDuration: number;

    // tslint:disable-next-line: no-input-rename
    @Input('options') templateOptions: CircleProgressOptions;

    // <svg> of component
    svgElement: HTMLElement = null;
    window: Window;

    svg: any;

    options: CircleProgressOptions = new CircleProgressOptions();
    defaultOptions: CircleProgressOptions = new CircleProgressOptions();
    lastRadius = this.restingRadius;

    private timerSubscription: Subscription;

    render = () => {
        this.applyOptions();
        this.animate(this.lastRadius, this.restingRadius);
        this.lastRadius = this.restingRadius;
    }

    draw = (radius: number) => {
        // determine box size
        const boxSize = this.hightlightRadius * 2;
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
                stroke: this.options.color,
            }
        };
    }

    animate = (fromRadius: number, toRadius: number) => {
        const times = 30;

        if (this.timerSubscription && !this.timerSubscription.closed) {
            this.timerSubscription.unsubscribe();
        }

        const interval = this.animationDuration / times;
        const step = (toRadius - fromRadius) / times;

        let count = fromRadius;
        if (fromRadius < toRadius) {
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
                count -= step;
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
      this.animate(this.restingRadius, this.hightlightRadius);
      this.MouseEnter.emit(event);
    }

    private applyOptions = () => {
        // the options of <circle-progress> may change already
        for (const name of Object.keys(this.options)) {
            if (this.hasOwnProperty(name) && this[name] !== undefined) {
                this.options[name] = this[name];
            } else if (this.templateOptions && this.templateOptions[name] !== undefined) {
                this.options[name] = this.templateOptions[name];
            }
        }
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

    constructor(defaultOptions: CircleProgressOptions, private elRef: ElementRef, @Inject(DOCUMENT) private document: Document) {
        this.document = document;
        this.window = this.document.defaultView;
        Object.assign(this.options, defaultOptions);
        Object.assign(this.defaultOptions, defaultOptions);
    }
}
