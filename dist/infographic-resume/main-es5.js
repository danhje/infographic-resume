(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/app.component.html":
/*!**************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/app.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-hobbies></app-hobbies>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/hobbies/hobbies.component.html":
/*!**************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/hobbies/hobbies.component.html ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-hobby\n  [restingRadius]=\"150\"\n  [highlightRadius]=\"200\"\n  [animationDuration]=\"100\"\n  [label]=\"'BJJ'\"\n></app-hobby>\n\n<br>\n\n<app-hobby\n  [restingRadius]=\"150\"\n  [highlightRadius]=\"200\"\n  [animationDuration]=\"100\"\n  [label]=\"'BJJ'\"\n></app-hobby>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/hobby/hobby.component.html":
/*!**********************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/hobby/hobby.component.html ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" *ngIf=\"svg\"\n  [attr.viewBox]=\"svg.viewBox\" preserveAspectRatio=\"xMidYMid meet\"\n  [attr.height]=\"svg.height\" [attr.width]=\"svg.width\">\n<circle\n  (mouseenter)=\"emitMouseenterEvent($event)\"\n  (mouseleave)=\"emitMouseleaveEvent($event)\"\n  [attr.cx]=\"svg.circle.cx\"\n  [attr.cy]=\"svg.circle.cy\"\n  [attr.r]=\"svg.circle.r\"\n  [attr.fill]=\"svg.circle.stroke\"\n  />\n<text\n     alignment-baseline=\"baseline\"\n     [attr.x]=\"svg.title.x\"\n     [attr.y]=\"svg.title.y\"\n     text-anchor=\"middle\">\n   <ng-container>\n       <tspan\n              [attr.x]=\"svg.title.x\"\n              [attr.y]=\"svg.title.y\"\n              font-size=\"20\"\n              [attr.fill]=\"svg.title.color\">{{svg.title.text}}</tspan>\n   </ng-container>\n</text>\n</svg>\n"

/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'infographic-resume';
    }
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! raw-loader!./app.component.html */ "./node_modules/raw-loader/index.js!./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _hobby__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./hobby */ "./src/app/hobby/index.ts");
/* harmony import */ var _hobbies_hobbies_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./hobbies/hobbies.component */ "./src/app/hobbies/hobbies.component.ts");






var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
                _hobbies_hobbies_component__WEBPACK_IMPORTED_MODULE_5__["HobbiesComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _hobby__WEBPACK_IMPORTED_MODULE_4__["NgCircleProgressModule"].forRoot()
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/hobbies/hobbies.component.ts":
/*!**********************************************!*\
  !*** ./src/app/hobbies/hobbies.component.ts ***!
  \**********************************************/
/*! exports provided: HobbiesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HobbiesComponent", function() { return HobbiesComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var HobbiesComponent = /** @class */ (function () {
    function HobbiesComponent() {
    }
    HobbiesComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-hobbies',
            template: __webpack_require__(/*! raw-loader!./hobbies.component.html */ "./node_modules/raw-loader/index.js!./src/app/hobbies/hobbies.component.html")
        })
    ], HobbiesComponent);
    return HobbiesComponent;
}());



/***/ }),

/***/ "./src/app/hobby/hobby.component.ts":
/*!******************************************!*\
  !*** ./src/app/hobby/hobby.component.ts ***!
  \******************************************/
/*! exports provided: CircleProgressOptions, HobbyComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CircleProgressOptions", function() { return CircleProgressOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HobbyComponent", function() { return HobbyComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");




var CircleProgressOptions = /** @class */ (function () {
    function CircleProgressOptions() {
        this.color = '#78C000';
        this.animationDuration = 100;
    }
    return CircleProgressOptions;
}());

/** @dynamic Prevent compiling error when using type `Document` https://github.com/angular/angular/issues/20351 */
var HobbyComponent = /** @class */ (function () {
    function HobbyComponent(elRef, document) {
        var _this = this;
        this.elRef = elRef;
        this.document = document;
        this.MouseEnter = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.MouseLeave = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        // <svg> of component
        this.svgElement = null;
        this.options = new CircleProgressOptions();
        this.defaultOptions = new CircleProgressOptions();
        this.lastRadius = this.restingRadius;
        this.render = function () {
            _this.applyOptions();
            _this.animate(_this.restingRadius);
        };
        this.draw = function (radius) {
            _this.lastRadius = radius;
            // determine box size
            var boxSize = _this.highlightRadius * 2;
            // the centre of the circle
            var centre = { x: boxSize / 2, y: boxSize / 2 };
            // create title object
            var title = {
                x: centre.x,
                y: centre.y,
                color: '#444444',
                text: _this.label,
            };
            // Bring it all together
            _this.svg = {
                viewBox: "0 0 " + boxSize + " " + boxSize,
                width: boxSize,
                height: boxSize,
                title: title,
                circle: {
                    cx: centre.x,
                    cy: centre.y,
                    r: radius,
                    stroke: _this.options.color,
                }
            };
        };
        this.animate = function (toRadius) {
            if (_this.timerSubscription && !_this.timerSubscription.closed) {
                _this.timerSubscription.unsubscribe();
            }
            var times = 20;
            var interval = _this.animationDuration / times;
            var step = (toRadius - _this.lastRadius) / times;
            var count = _this.lastRadius;
            if (_this.lastRadius < toRadius) {
                _this.timerSubscription = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["timer"])(0, interval).subscribe(function () {
                    count += step;
                    if (count <= toRadius) {
                        _this.draw(count);
                    }
                    else {
                        _this.draw(toRadius);
                        _this.timerSubscription.unsubscribe();
                    }
                });
            }
            else {
                _this.timerSubscription = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["timer"])(0, interval).subscribe(function () {
                    count += step;
                    if (count >= toRadius) {
                        _this.draw(count);
                    }
                    else {
                        _this.draw(toRadius);
                        _this.timerSubscription.unsubscribe();
                    }
                });
            }
        };
        this.emitMouseenterEvent = function (event) {
            _this.animate(_this.highlightRadius);
            _this.MouseEnter.emit(event);
        };
        this.emitMouseleaveEvent = function (event) {
            _this.animate(_this.restingRadius);
            _this.MouseLeave.emit(event);
        };
        this.applyOptions = function () {
            var e_1, _a;
            try {
                // the options of <circle-progress> may change already
                for (var _b = tslib__WEBPACK_IMPORTED_MODULE_0__["__values"](Object.keys(_this.options)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var name_1 = _c.value;
                    if (_this.hasOwnProperty(name_1) && _this[name_1] !== undefined) {
                        _this.options[name_1] = _this[name_1];
                    }
                    else if (_this.templateOptions && _this.templateOptions[name_1] !== undefined) {
                        _this.options[name_1] = _this.templateOptions[name_1];
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        };
        this.min = function (a, b) {
            return a < b ? a : b;
        };
        this.max = function (a, b) {
            return a > b ? a : b;
        };
        this.findSvgElement = function () {
            if (this.svgElement === null) {
                var tags = this.elRef.nativeElement.getElementsByTagName('svg');
                if (tags.length > 0) {
                    this.svgElement = tags[0];
                }
            }
        };
        this.document = document;
        this.window = this.document.defaultView;
        // Object.assign(this.options, defaultOptions);
        // Object.assign(this.defaultOptions, defaultOptions);
    }
    HobbyComponent.prototype.isDrawing = function () {
        return (this.timerSubscription && !this.timerSubscription.closed);
    };
    HobbyComponent.prototype.ngOnChanges = function (changes) {
        this.render();
    };
    HobbyComponent.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"] },
        { type: Document, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["DOCUMENT"],] }] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
    ], HobbyComponent.prototype, "MouseEnter", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
    ], HobbyComponent.prototype, "MouseLeave", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
    ], HobbyComponent.prototype, "restingRadius", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
    ], HobbyComponent.prototype, "highlightRadius", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
    ], HobbyComponent.prototype, "label", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
    ], HobbyComponent.prototype, "color", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
    ], HobbyComponent.prototype, "animationDuration", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])('options')
    ], HobbyComponent.prototype, "templateOptions", void 0);
    HobbyComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-hobby',
            template: __webpack_require__(/*! raw-loader!./hobby.component.html */ "./node_modules/raw-loader/index.js!./src/app/hobby/hobby.component.html")
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_common__WEBPACK_IMPORTED_MODULE_2__["DOCUMENT"]))
    ], HobbyComponent);
    return HobbyComponent;
}());



/***/ }),

/***/ "./src/app/hobby/index.ts":
/*!********************************!*\
  !*** ./src/app/hobby/index.ts ***!
  \********************************/
/*! exports provided: NgCircleProgressModule, CircleProgressOptions, HobbyComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgCircleProgressModule", function() { return NgCircleProgressModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _hobby_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./hobby.component */ "./src/app/hobby/hobby.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CircleProgressOptions", function() { return _hobby_component__WEBPACK_IMPORTED_MODULE_3__["CircleProgressOptions"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HobbyComponent", function() { return _hobby_component__WEBPACK_IMPORTED_MODULE_3__["HobbyComponent"]; });






var NgCircleProgressModule = /** @class */ (function () {
    function NgCircleProgressModule() {
    }
    NgCircleProgressModule_1 = NgCircleProgressModule;
    NgCircleProgressModule.forRoot = function (options) {
        if (options === void 0) { options = {}; }
        return {
            ngModule: NgCircleProgressModule_1,
            providers: [
                { provide: _hobby_component__WEBPACK_IMPORTED_MODULE_3__["CircleProgressOptions"], useValue: options }
            ]
        };
    };
    var NgCircleProgressModule_1;
    NgCircleProgressModule = NgCircleProgressModule_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]
            ],
            declarations: [
                _hobby_component__WEBPACK_IMPORTED_MODULE_3__["HobbyComponent"],
            ],
            exports: [
                _hobby_component__WEBPACK_IMPORTED_MODULE_3__["HobbyComponent"],
            ]
        })
    ], NgCircleProgressModule);
    return NgCircleProgressModule;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/danhje/Google Drive/Git/infographic-resume/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main-es5.js.map