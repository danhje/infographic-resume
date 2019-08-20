import {Component, EventEmitter, Input, OnChanges, Output, Inject, OnInit, OnDestroy, ElementRef, SimpleChanges} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {Subscription, timer} from 'rxjs';

export interface CircleProgressOptionsInterface {
    class?: string;
    percent?: number;
    radius?: number;
    title?: string;
    animationDuration?: number;
}

export class CircleProgressOptions implements CircleProgressOptionsInterface {
    class = '';
    backgroundColor = 'transparent';
    backgroundOpacity = 0.1;
    backgroundStroke = 'transparent';
    circlePadding = 5;
    percent = 0;
    radius = 90;
    color = '#78C000';
    title = 'auto';
    animationDuration = 500;
    startFromZero = true;
    showZeroOuterStroke = true;
}

/** @dynamic Prevent compiling error when using type `Document` https://github.com/angular/angular/issues/20351 */
@Component({
    selector: 'app-hobbies',
    templateUrl: './hobbies.component.html'
})
export class CircleProgressComponent implements OnChanges {

    @Output() MouseEnter: EventEmitter<any> = new EventEmitter();

    @Input() name: string;
    @Input() class: string;
    @Input() backgroundColor: string;
    @Input() backgroundOpacity: number;
    @Input() backgroundStroke: string;
    @Input() circlePadding: number;

    @Input() radius: number;
    @Input() percent: number;

    @Input() outerStrokeWidth: number;
    @Input() color: string;

    @Input() title: string;

    @Input() animationDuration: number;

    @Input() startFromZero: boolean;

    // tslint:disable-next-line: no-input-rename
    @Input('options') templateOptions: CircleProgressOptions;

    // <svg> of component
    svgElement: HTMLElement = null;
    window: Window;

    svg: any;

    options: CircleProgressOptions = new CircleProgressOptions();
    defaultOptions: CircleProgressOptions = new CircleProgressOptions();
    lastPercent = 0;
    render = () => {
        this.applyOptions();
        this.animate(this.lastPercent, this.options.percent);
        this.lastPercent = this.options.percent;
    }

    draw = (percent: number, radiusMultiplier: number) => {
        // make percent reasonable
        percent = (percent === undefined) ? this.options.percent : Math.abs(percent);
        // circle percent shouldn't be greater than 100%.
        const circlePercent = (percent > 100) ? 100 : percent;
        // determine box size
        const boxSize = this.options.radius * 2 + this.options.circlePadding * 2;
        // the centre of the circle
        const centre = {x: boxSize / 2, y: boxSize / 2};

        // create title object
        const title = {
            x: centre.x,
            y: centre.y,
            textAnchor: 'middle',
            color: '#444444',
            fontSize: 20,
            fontWeight: 'normal',
            text: this.options.title,
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
                r: this.options.radius + this.options.circlePadding,
                stroke: this.options.color,
            }
        };
    }

    getAnimationParameters = (previousPercent: number, currentPercent: number) => {
        const MIN_INTERVAL = 10;
        let times: number;
        let step: number;
        let interval: number;
        const fromPercent = this.options.startFromZero ? 0 : (previousPercent < 0 ? 0 : previousPercent);
        const toPercent = currentPercent < 0 ? 0 : currentPercent;
        const delta = Math.abs(Math.round(toPercent - fromPercent));

        if (delta >= 100) {
            // we will finish animation in 100 times
            times = 100;
            if (!false && !false) {
                step = 1;
            } else {
                // show title or subtitle animation even if the arc is full, we also need to finish it in 100 times.
                step = Math.round(delta / times);
            }
        } else {
            // we will finish in as many times as the number of percent.
            times = delta;
            step = 1;
        }
        // Get the interval of timer
        interval = Math.round(this.options.animationDuration / times);
        // Readjust all values if the interval of timer is extremely small.
        if (interval < MIN_INTERVAL) {
            interval = MIN_INTERVAL;
            times = this.options.animationDuration / interval;
            if (!false && !false && delta > 100) {
                step = Math.round(100 / times);
            } else {
                step = Math.round(delta / times);
            }
        }
        // step must be greater than 0.
        if (step < 1) {
            step = 1;
        }
        return {times, step, interval};
    }

    animate = (previousPercent: number, currentPercent: number) => {
        console.log(currentPercent);
        if (this.timerSubscription && !this.timerSubscription.closed) {
            this.timerSubscription.unsubscribe();
        }
        const fromPercent = this.options.startFromZero ? 0 : previousPercent;
        const toPercent = currentPercent;
        const {step: step, interval: interval} = this.getAnimationParameters(fromPercent, toPercent);
        let count = fromPercent;
        if (fromPercent < toPercent) {
            this.timerSubscription = timer(0, interval).subscribe(() => {
                count += step;
                if (count <= toPercent) {
                  this.draw(count, count);
                } else {
                  this.draw(toPercent, count);
                  this.timerSubscription.unsubscribe();
                }
            });
        } else {
            this.timerSubscription = timer(0, interval).subscribe(() => {
                count -= step;
                if (count >= toPercent) {
                  this.draw(count, count);
                } else {
                  this.draw(toPercent, count);
                  this.timerSubscription.unsubscribe();
                }
            });
        }
    }

    emitMouseenterEvent = (event: any) => {
      this.animate(0, 2.2 * this.options.percent);
      this.MouseEnter.emit(event);
    }

    private timerSubscription: Subscription;

    private applyOptions = () => {
        // the options of <circle-progress> may change already
        for (const name of Object.keys(this.options)) {
            if (this.hasOwnProperty(name) && this[name] !== undefined) {
                this.options[name] = this[name];
            } else if (this.templateOptions && this.templateOptions[name] !== undefined) {
                this.options[name] = this.templateOptions[name];
            }
        }
        // make sure key options valid
        this.options.radius = Math.abs(+this.options.radius);
        this.options.percent = +this.options.percent > 0 ? +this.options.percent : 0;
        this.options.animationDuration = Math.abs(this.options.animationDuration);
        this.options.circlePadding = +this.options.circlePadding;
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
