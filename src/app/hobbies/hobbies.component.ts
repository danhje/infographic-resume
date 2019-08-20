import {Component, EventEmitter, Input, OnChanges, Output, Inject, OnInit, OnDestroy, ElementRef, SimpleChanges} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {Subscription, timer} from 'rxjs';

export interface CircleProgressOptionsInterface {
    class?: string;
    percent?: number;
    radius?: number;
    space?: number;
    toFixed?: number;
    maxPercent?: number;
    renderOnClick?: boolean;
    units?: string;
    unitsFontSize?: string;
    unitsFontWeight?: string;
    titleFormat?: Function;
    title?: string | Array<String>;
    label?: string;
    titleColor?: string;
    titleFontSize?: string;
    titleFontWeight?: string;
    subtitleFormat?: Function;
    subtitle?: string | Array<String>;
    subtitleColor?: string;
    subtitleFontSize?: string;
    subtitleFontWeight?: string;
    animation?: boolean;
    animateTitle?: boolean;
    animateSubtitle?: boolean;
    animationDuration?: number;
    showTitle?: boolean;
    responsive?: boolean;
    lazy?: boolean;
}

export class CircleProgressOptions implements CircleProgressOptionsInterface {
    class = '';
    backgroundGradient = false;
    backgroundColor = 'transparent';
    backgroundGradientStopColor = 'transparent';
    backgroundOpacity = 1;
    backgroundStroke = 'transparent';
    backgroundStrokeWidth = 0;
    backgroundPadding = 5;
    percent = 0;
    radius = 90;
    space = 4;
    toFixed = 0;
    maxPercent = 1000;
    renderOnClick = true;
    units = '%';
    unitsFontSize = '10';
    unitsFontWeight = 'normal';
    unitsColor = '#444444';
    outerStrokeGradient = false;
    outerStrokeWidth = 8;
    outerStrokeColor = '#78C000';
    outerStrokeGradientStopColor = 'transparent';
    outerStrokeLinecap = 'round';
    innerStrokeColor = '#C7E596';
    innerStrokeWidth = 4;
    titleFormat = undefined;
    title: string | Array<string> = 'auto';
    label = 'test';
    titleColor = '#444444';
    titleFontSize = '20';
    titleFontWeight = 'normal';
    subtitleFormat = undefined;
    subtitle: string | Array<string> = 'progress';
    subtitleColor = '#A9A9A9';
    subtitleFontSize = '10';
    subtitleFontWeight = 'normal';
    imageSrc = undefined;
    imageHeight = undefined;
    imageWidth = undefined;
    animation = true;
    animateTitle = true;
    animateSubtitle = false;
    animationDuration = 500;
    showTitle = true;
    showSubtitle = true;
    showUnits = true;
    showImage = false;
    showBackground = true;
    showInnerStroke = true;
    clockwise = true;
    responsive = false;
    startFromZero = true;
    showZeroOuterStroke = true;
    lazy = true;
}

/** @dynamic Prevent compiling error when using type `Document` https://github.com/angular/angular/issues/20351 */
@Component({
    selector: 'app-hobbies',
    templateUrl: './hobbies.component.html'
})
export class CircleProgressComponent implements OnChanges, OnInit, OnDestroy {

    @Output() onClick: EventEmitter<any> = new EventEmitter();

    @Input() name: string;
    @Input() class: string;
    @Input() backgroundGradient: boolean;
    @Input() backgroundColor: string;
    @Input() backgroundGradientStopColor: string;
    @Input() backgroundOpacity: number;
    @Input() backgroundStroke: string;
    @Input() backgroundStrokeWidth: number;
    @Input() backgroundPadding: number;

    @Input() radius: number;
    @Input() space: number;
    @Input() percent: number;
    @Input() toFixed: number;
    @Input() maxPercent: number;
    @Input() renderOnClick: boolean;

    @Input() units: string;
    @Input() unitsFontSize: string;
    @Input() unitsFontWeight: string;
    @Input() unitsColor: string;

    @Input() outerStrokeGradient: boolean;
    @Input() outerStrokeWidth: number;
    @Input() outerStrokeColor: string;
    @Input() outerStrokeGradientStopColor: string;
    @Input() outerStrokeLinecap: string;

    @Input() innerStrokeColor: string;
    @Input() innerStrokeWidth: string | number;

    @Input() titleFormat: Function;
    @Input() title: string | Array<string>;
    @Input() label: string;
    @Input() titleColor: string;
    @Input() titleFontSize: string;
    @Input() titleFontWeight: string;

    @Input() subtitleFormat: Function;
    @Input() subtitle: string | string[];
    @Input() subtitleColor: string;
    @Input() subtitleFontSize: string;
    @Input() subtitleFontWeight: string;

    @Input() imageSrc: string;
    @Input() imageHeight: number;
    @Input() imageWidth: number;

    @Input() animation: boolean;
    @Input() animateTitle: boolean;
    @Input() animateSubtitle: boolean;
    @Input() animationDuration: number;

    @Input() showTitle: boolean;
    @Input() showSubtitle: boolean;
    @Input() showUnits: boolean;
    @Input() showImage: boolean;
    @Input() showBackground: boolean;
    @Input() showInnerStroke: boolean;
    @Input() clockwise: boolean;
    @Input() responsive: boolean;
    @Input() startFromZero: boolean;
    @Input() showZeroOuterStroke: boolean;

    @Input() lazy: boolean;

    @Input('options') templateOptions: CircleProgressOptions;

    // <svg> of component
    svgElement: HTMLElement = null;
    // whether <svg> is in viewport
    isInViewport = false;
    // event for notifying viewport change caused by scrolling or resizing
    onViewportChanged: EventEmitter<{oldValue: boolean, newValue: boolean}> = new EventEmitter;
    window: Window;
    _viewportChangedSubscriber: Subscription = null;

    svg: any;

    options: CircleProgressOptions = new CircleProgressOptions();
    defaultOptions: CircleProgressOptions = new CircleProgressOptions();
    _lastPercent = 0;
    _gradientUUID: string = null;
    render = () => {
        console.log(this.svg);

        this.applyOptions();

        if (this.options.lazy){
            // Draw svg if it doesn't exist
            this.svgElement === null && this.draw(this._lastPercent);
            // Draw it only when it's in the viewport
            if (this.isInViewport) {
                // Draw it at the latest position when I am in.
                if (this.options.animation && this.options.animationDuration > 0) {
                    this.animate(this._lastPercent, this.options.percent);
                } else {
                    this.draw(this.options.percent);
                }
                this._lastPercent = this.options.percent;
            }
        } else {
            if (this.options.animation && this.options.animationDuration > 0) {
                this.animate(this._lastPercent, this.options.percent);
            } else {
                this.draw(this.options.percent);
            }
            this._lastPercent = this.options.percent;
        }
    }
    polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
        const angleInRadius = angleInDegrees * Math.PI / 180;
        const x = centerX + Math.sin(angleInRadius) * radius;
        const y = centerY - Math.cos(angleInRadius) * radius;
        return {x: x, y: y};
    }
    draw = (percent: number) => {
        // make percent reasonable
        percent = (percent === undefined) ? this.options.percent : Math.abs(percent);
        // circle percent shouldn't be greater than 100%.
        const circlePercent = (percent > 100) ? 100 : percent;
        // determine box size
        let boxSize = this.options.radius * 2 + this.options.outerStrokeWidth * 2;
        if (this.options.showBackground) {
            boxSize += (this.options.backgroundStrokeWidth * 2 + this.max(0, this.options.backgroundPadding * 2));
        }
        // the centre of the circle
        const centre = {x: boxSize / 2, y: boxSize / 2};
        // the start point of the arc
        const startPoint = {x: centre.x, y: centre.y - this.options.radius};
        // get the end point of the arc
        const endPoint = this.polarToCartesian(centre.x, centre.y, this.options.radius, 360 * (this.options.clockwise ?
            circlePercent :
            (100 - circlePercent)) / 100);  // ####################
        // We'll get an end point with the same [x, y] as the start point when percent is 100%, so move x a little bit.
        if (circlePercent === 100) {
            endPoint.x = endPoint.x + (this.options.clockwise ? -0.01 : +0.01);
        }
        // largeArcFlag and sweepFlag
        let largeArcFlag: any, sweepFlag: any;
        if (circlePercent > 50) {
            [largeArcFlag, sweepFlag] = this.options.clockwise ? [1, 1] : [1, 0];
        } else {
            [largeArcFlag, sweepFlag] = this.options.clockwise ? [0, 1] : [0, 0];
        }
        // percent may not equal the actual percent
        const titlePercent = this.options.animateTitle ? percent : this.options.percent;
        const titleTextPercent = titlePercent > this.options.maxPercent ?
            `${this.options.maxPercent.toFixed(this.options.toFixed)}+` : titlePercent.toFixed(this.options.toFixed);
        const subtitlePercent = this.options.animateSubtitle ? percent : this.options.percent;
        // get title object
        const title = {
            x: centre.x,
            y: centre.y,
            textAnchor: 'middle',
            color: this.options.titleColor,
            fontSize: this.options.titleFontSize,
            fontWeight: this.options.titleFontWeight,
            texts: [],
            tspans: []
        };
        // from v0.9.9, both title and titleFormat(...) may be an array of string.
        if (this.options.titleFormat !== undefined && this.options.titleFormat.constructor.name === 'Function') {
            const formatted = this.options.titleFormat(titlePercent);
            if (formatted instanceof Array) {
                title.texts = [...formatted];
            } else {
                title.texts.push(formatted.toString());
            }
        } else {
            if (this.options.title === 'auto') {
                title.texts.push(titleTextPercent);
            } else {
                if (this.options.title instanceof Array) {
                    title.texts = [...this.options.title]
                } else {
                    title.texts.push(this.options.title.toString());
                }
            }
        }
        // get subtitle object
        const subtitle = {
            x: centre.x,
            y: centre.y,
            textAnchor: 'middle',
            color: this.options.subtitleColor,
            fontSize: this.options.subtitleFontSize,
            fontWeight: this.options.subtitleFontWeight,
            texts: [],
            tspans: []
        };
        // from v0.9.9, both subtitle and subtitleFormat(...) may be an array of string.
        if (this.options.subtitleFormat !== undefined && this.options.subtitleFormat.constructor.name === 'Function') {
            const formatted = this.options.subtitleFormat(subtitlePercent);
            if (formatted instanceof Array) {
                subtitle.texts = [...formatted];
            } else {
                subtitle.texts.push(formatted.toString());
            }
        } else {
            if (this.options.subtitle instanceof Array) {
                subtitle.texts = [...this.options.subtitle]
            } else {
                subtitle.texts.push(this.options.subtitle.toString());
            }
        }
        // get units object
        const units = {
            text: `${this.options.units}`,
            fontSize: this.options.unitsFontSize,
            fontWeight: this.options.unitsFontWeight,
            color: this.options.unitsColor
        };
        // get total count of text lines to be shown
        let rowCount = 0, rowNum = 1;
        this.options.showTitle && (rowCount += title.texts.length);
        this.options.showSubtitle && (rowCount += subtitle.texts.length);
        // calc dy for each tspan for title
        if (this.options.showTitle) {
            for (const span of title.texts) {
                // tslint:disable-next-line: object-literal-shorthand
                title.tspans.push({span: span, dy: this.getRelativeY(rowNum, rowCount)});
                rowNum++;
            }
        }
        // calc dy for each tspan for subtitle
        if (this.options.showSubtitle) {
            for (const span of subtitle.texts) {
                subtitle.tspans.push({span: span, dy: this.getRelativeY(rowNum, rowCount)});
                rowNum++;
            }
        }
        // create ID for gradient element
        if (null === this._gradientUUID) {
            this._gradientUUID = this.uuid();
        }
        // Bring it all together
        this.svg = {
            viewBox: `0 0 ${boxSize} ${boxSize}`,
            // Set both width and height to '100%' if it's responsive
            width: this.options.responsive ? '100%' : boxSize,
            height: this.options.responsive ? '100%' : boxSize,
            title: title,
            label: this.options.label,
            circle: {
                cx: centre.x,
                cy: centre.y,
                r: this.options.radius + this.options.outerStrokeWidth / 2 + this.options.backgroundPadding,
                fill: this.options.backgroundColor,
                fillOpacity: this.options.backgroundOpacity,
                stroke: this.options.outerStrokeColor,
                strokeWidth: this.options.backgroundStrokeWidth,
            }
        };
        console.log(this.svg);
    }
    getAnimationParameters = (previousPercent: number, currentPercent: number) => {
        const MIN_INTERVAL = 10;
        let times: number;
        let step: number;
        let interval: number;
        const fromPercent = this.options.startFromZero ? 0 : (previousPercent < 0 ? 0 : previousPercent);
        const toPercent = currentPercent < 0 ? 0 : this.min(currentPercent, this.options.maxPercent);
        const delta = Math.abs(Math.round(toPercent - fromPercent));

        if (delta >= 100) {
            // we will finish animation in 100 times
            times = 100;
            if (!this.options.animateTitle && !this.options.animateSubtitle) {
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
            if (!this.options.animateTitle && !this.options.animateSubtitle && delta > 100) {
                step = Math.round(100 / times);
            } else {
                step = Math.round(delta / times);
            }
        }
        // step must be greater than 0.
        if (step < 1) {
            step = 1;
        }
        // tslint:disable-next-line: object-literal-shorthand
        return {times: times, step: step, interval: interval};
    };
    animate = (previousPercent: number, currentPercent: number) => {
        if (this._timerSubscription && !this._timerSubscription.closed) {
            this._timerSubscription.unsubscribe();
        }
        const fromPercent = this.options.startFromZero ? 0 : previousPercent;
        const toPercent = currentPercent;
        const {step: step, interval: interval} = this.getAnimationParameters(fromPercent, toPercent);
        let count = fromPercent;
        if (fromPercent < toPercent){
            this._timerSubscription = timer(0, interval).subscribe(() => {
                count += step;
                if (count <= toPercent) {
                    if (!this.options.animateTitle && !this.options.animateSubtitle && count >= 100) {
                        this.draw(toPercent);
                        this._timerSubscription.unsubscribe();
                    } else {
                        this.draw(count);
                    }
                } else {
                    this.draw(toPercent);
                    this._timerSubscription.unsubscribe();
                }
            });
        } else {
            this._timerSubscription = timer(0, interval).subscribe(() => {
                count -= step;
                if (count >= toPercent) {
                    if (!this.options.animateTitle && !this.options.animateSubtitle && toPercent >= 100) {
                        this.draw(toPercent);
                        this._timerSubscription.unsubscribe();
                    } else {
                        this.draw(count);
                    }
                } else {
                    this.draw(toPercent);
                    this._timerSubscription.unsubscribe();
                }
            });
        }
    }
    emitClickEvent = (event: any) => {
        if (this.options.renderOnClick) {
            this.animate(0, this.options.percent);
        }
        this.onClick.emit(event);
    }
    private _timerSubscription: Subscription;
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
        this.options.space = +this.options.space;
        this.options.percent = +this.options.percent > 0 ? +this.options.percent : 0;
        this.options.maxPercent = Math.abs(+this.options.maxPercent);
        this.options.animationDuration = Math.abs(this.options.animationDuration);
        this.options.outerStrokeWidth = Math.abs(+this.options.outerStrokeWidth);
        this.options.innerStrokeWidth = Math.abs(+this.options.innerStrokeWidth);
        this.options.backgroundPadding = +this.options.backgroundPadding;
    }
    private getRelativeY = (rowNum: number, rowCount: number): string => {
        // why '-0.18em'? It's a magic number when property 'alignment-baseline' equals 'baseline'. :)
        const initialOffset = -0.18;
        const offset = 1;
        return (initialOffset + offset * (rowNum - rowCount / 2)).toFixed(2) + 'em';
    }

    private min = (a: number, b: number) => {
        return a < b ? a : b;
    }

    private max = (a: number, b: number) => {
        return a > b ? a : b;
    }

    private uuid = () => {
        // https://www.w3resource.com/javascript-exercises/javascript-math-exercise-23.php
        var dt = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (dt + Math.random()*16)%16 | 0;
            dt = Math.floor(dt/16);
            return (c=='x' ? r :(r&0x3|0x8)).toString(16);
        });
        return uuid;
    }

    public isDrawing(): boolean {
        return (this._timerSubscription && !this._timerSubscription.closed);
    }

    public findSvgElement = function() {
        if (this.svgElement === null) {
            const tags = this.elRef.nativeElement.getElementsByTagName('svg');
            if (tags.length > 0) {
                this.svgElement = tags[0];
            }
        }
    };

    private isElementInViewport(el): boolean {
        // Return false if el has not been created in page.
        if(el === null || el === undefined) return false;
        // Check if the element is out of view due to a container scrolling
        let rect = el.getBoundingClientRect(), parent = el.parentNode, parentRect;
        do {
          parentRect = parent.getBoundingClientRect();
          if (rect.top >= parentRect.bottom) { return false; }
          if (rect.bottom <= parentRect.top) { return false; }
          if (rect.left >= parentRect.right) { return false; }
          if (rect.right <= parentRect.left) { return false; }
          parent = parent.parentNode;
        } while (parent != this.document.body);
        // Check its within the document viewport
        if (rect.top >= (this.window.innerHeight || this.document.documentElement.clientHeight)) return false;
        if (rect.bottom <= 0) return false;
        if (rect.left >= (this.window.innerWidth || this.document.documentElement.clientWidth)) return false;
        if (rect.right <= 0) return false;
        return true;
    }

    checkViewport = () => {
        this.findSvgElement();
        const previousValue = this.isInViewport;
        this.isInViewport = this.isElementInViewport(this.svgElement);
        if (previousValue !== this.isInViewport) {
            this.onViewportChanged.emit({oldValue: previousValue, newValue: this.isInViewport});
        }
    }

    onScroll = (event: Event) => {
        this.checkViewport();
    }

    loadEventsForLazyMode = () => {
        if (this.options.lazy) {
            this.document.addEventListener('scroll', this.onScroll, true);
            this.window.addEventListener('resize', this.onScroll, true);
            if (this._viewportChangedSubscriber === null) {
                this._viewportChangedSubscriber = this.onViewportChanged.subscribe(({oldValue, newValue}) => {
                    newValue ? this.render() : null;
                });
            }
            // svgElement must be created in DOM before being checked.
            // Is there a better way to check the existence of svgElemnt?
            const _timer = timer(0, 50).subscribe(() => {
                this.svgElement === null ? this.checkViewport() : _timer.unsubscribe();
            });
        }
    }

    unloadEventsForLazyMode = () => {
        // Remove event listeners
        this.document.removeEventListener('scroll', this.onScroll, true);
        this.window.removeEventListener('resize', this.onScroll, true);
        // Unsubscribe onViewportChanged
        if (this._viewportChangedSubscriber !== null) {
            this._viewportChangedSubscriber.unsubscribe();
            this._viewportChangedSubscriber = null;
        }
    }

    ngOnInit() {
        this.loadEventsForLazyMode();
    }

    ngOnDestroy() {
        this.unloadEventsForLazyMode();
    }

    ngOnChanges(changes: SimpleChanges) {

        this.render();

        if ('lazy' in changes) {
            changes.lazy.currentValue ? this.loadEventsForLazyMode() : this.unloadEventsForLazyMode();
        }

    }

    constructor(defaultOptions: CircleProgressOptions, private elRef: ElementRef, @Inject(DOCUMENT) private document: Document) {
        this.document = document;
        this.window = this.document.defaultView;
        Object.assign(this.options, defaultOptions);
        Object.assign(this.defaultOptions, defaultOptions);
    }

}
