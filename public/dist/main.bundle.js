webpackJsonp([2],{

/***/ "../../../../../src async recursive":
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "../../../../../src async recursive";

/***/ }),

/***/ "../../../../../src/app/advanced/advanced.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"col-md-12 col-lg-6\">\n    <div class=\"form-group row\">\n      <label class=\"col-xs-12 col-md-4 col-form-label\">CaviCapture</label>\n      <div class=\"col\">\n        <input type=\"text\" class=\"form-control\" name=\"scriptPath\" [(ngModel)]=\"configService.scriptPath\">\n      </div>\n    </div>\n    <div class=\"form-group row\">\n      <label class=\"col-xs-12 col-md-4 col-form-label\">CaviProcess</label>\n      <div class=\"col\">\n        <input type=\"text\" name=\"processProcessor\" class=\"form-control\" [(ngModel)]=\"config.process.processor\">\n      </div>\n    </div>\n    <div class=\"form-group row\">\n      <label class=\"col-xs-12 col-md-4 col-form-label\">RPi GPIO Light Channel</label>\n      <div class=\"col\">\n        <input type=\"number\" name=\"piGPIOLightChannel\" placeholder=\"7\" class=\"form-control\" [(ngModel)]=\"config.pi.GPIO_light_channel\">\n      </div>\n      <div class=\"col-3\">\n        <div class=\"btn-group\">\n          <button type=\"button\" class=\"btn btn-secondary\" (click)=\"config.pi.GPIO_light_channel = config.pi.GPIO_light_channel - 1\"><i class=\"fa fa-minus\" aria-hidden=\"true\"></i></button>\n          <button type=\"button\" class=\"btn btn-secondary\" (click)=\"config.pi.GPIO_light_channel = config.pi.GPIO_light_channel + 1\"><i class=\"fa fa-plus\" aria-hidden=\"true\"></i></button>\n        </div>\n      </div>\n    </div>\n    <div class=\"form-group row\">\n      <label class=\"col-xs-12 col-md-4 col-form-label\">Wifi Mode</label>\n      <div class=\"col\">\n        <div class=\"form-check form-check-inline\">\n          <label class=\"form-check-label\">\n            <input class=\"form-check-input\" type=\"radio\" [(ngModel)]=\"wifiConfig.mode\" name=\"wifiMode\" value=\"AP\"> Access Point\n          </label>\n        </div>\n        <div class=\"form-check form-check-inline\">\n          <label class=\"form-check-label\">\n            <input class=\"form-check-input\" type=\"radio\" [(ngModel)]=\"wifiConfig.mode\" name=\"wifiMode\" value=\"network\"> Network\n          </label>\n        </div>\n      </div>\n    </div>\n    <div class=\"form-group row\" *ngIf=\"wifiConfig.mode == 'network'\">\n      <label class=\"col-xs-12 col-md-4 col-form-label\">SSID</label>\n      <div class=\"col\">\n        <input type=\"text\" class=\"form-control\" [(ngModel)]=\"wifiConfig.SSID\">\n      </div>\n    </div>    \n    <div class=\"form-group row\" *ngIf=\"wifiConfig.mode == 'network'\">\n      <label class=\"col-xs-12 col-md-4 col-form-label\">Password</label>\n      <div class=\"col\">\n        <input type=\"text\" class=\"form-control\" [(ngModel)]=\"wifiConfig.password\">\n      </div>\n    </div>  \n  </div>\n</div>\n<div class=\"row\">\n  <div class=\"col\">\n    <hr />\n    <div class=\"float-right\">\n      <button type=\"button\" class=\"btn btn-secondary\" (click)=\"updateWifi()\">Update Wifi</button>      \n      <button type=\"button\" class=\"btn btn-secondary\" (click)=\"updateConfig()\">Update Config</button>\n    </div>\n  </div>\n</div>\n<!-- <pre>{{wifiConfig | json}}</pre> -->"

/***/ }),

/***/ "../../../../../src/app/advanced/advanced.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/advanced/advanced.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config_service__ = __webpack_require__("../../../../../src/app/config.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pi_service__ = __webpack_require__("../../../../../src/app/pi.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdvancedComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AdvancedComponent = (function () {
    function AdvancedComponent(configService, piService) {
        var _this = this;
        this.configService = configService;
        this.piService = piService;
        this.capturing = false;
        configService.config.subscribe(function (config) {
            if (config) {
                _this.config = Object.assign({}, config);
            }
        });
        configService.wifiConfig.subscribe(function (config) {
            _this.wifiConfig = Object.assign({}, config);
        });
        piService.capturing.subscribe(function (capturing) {
            _this.capturing = capturing;
        });
    }
    AdvancedComponent.prototype.updateConfig = function () {
        this.configService.updateConfig(this.config);
    };
    AdvancedComponent.prototype.updateWifi = function () {
        this.configService.updateWifiConfig(this.wifiConfig);
    };
    AdvancedComponent.prototype.ngOnInit = function () {
    };
    return AdvancedComponent;
}());
AdvancedComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-advanced',
        template: __webpack_require__("../../../../../src/app/advanced/advanced.component.html"),
        styles: [__webpack_require__("../../../../../src/app/advanced/advanced.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__config_service__["a" /* ConfigService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__config_service__["a" /* ConfigService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__pi_service__["a" /* PiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__pi_service__["a" /* PiService */]) === "function" && _b || Object])
], AdvancedComponent);

var _a, _b;
//# sourceMappingURL=advanced.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n  <div class=\"row\" *ngIf=\"connected\">\n    <div class=\"col mb-4 mt-3\">\n      <div class=\"btn-toolbar\">\n        <div class=\"btn-group mr-2\">\n          <button \n            type=\"button\" \n            class=\"btn btn-sm\" \n            [ngClass]=\"{'btn-secondary': !light, 'btn-primary': light}\" \n            (click)=\"piService.toggleLight()\" \n            *ngIf=\"configLoaded && !capturing\">\n            Light\n            <i class=\"fa fa-lightbulb-o\" aria-hidden=\"true\"></i>\n          </button>\n          <button \n            type=\"button\" \n            class=\"btn btn-secondary btn-sm\" \n            (click)=\"piService.restartPi()\">\n            Restart\n            <i class=\"fa fa-undo\" aria-hidden=\"true\"></i>\n          </button> \n          <button \n            type=\"button\" \n            class=\"btn btn-secondary btn-sm\" \n            (click)=\"piService.shutdownPi()\">\n            Shutdown\n          </button>\n        </div>\n      </div> \n      <div class=\"nav nav-tabs\">\n        <div class=\"nav-item\">\n          <a class=\"nav-link\" routerLinkActive=\"active\" routerLink=\"/capture\">Capture</a>\n        </div>\n        <div class=\"nav-item\">\n          <a class=\"nav-link\" routerLinkActive=\"active\" routerLink=\"/process\" *ngIf=\"configLoaded\">Process</a>\n        </div>\n        <div class=\"nav-item\">\n          <a class=\"nav-link\" routerLinkActive=\"active\" routerLink=\"/data\" *ngIf=\"configLoaded && dbConnected\">Results</a>\n        </div>\n        <!-- <div class=\"nav-item\">\n          <a class=\"nav-link\" routerLinkActive=\"active\" routerLink=\"/log\" *ngIf=\"configLoaded\">Log</a>\n        </div> -->\n        <div class=\"nav-item\">\n          <a class=\"nav-link\" routerLinkActive=\"active\" routerLink=\"/advanced\" *ngIf=\"configLoaded\">Advanced</a>\n        </div>\n      </div>\n    </div>\n  </div>\n  <router-outlet *ngIf=\"connected\"></router-outlet>\n  <div class=\"row\" *ngIf=\"!connected\">\n    <div class=\"col pt-3\">\n      <p>Disconnected. <span *ngIf=\"connectionAttempts > 0\">Attempting to reconnect ({{connectionAttempts}})</span></p>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/app.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".btn-toolbar {\n  position: absolute;\n  right: 10px;\n  top: 0; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config_service__ = __webpack_require__("../../../../../src/app/config.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__socket_service__ = __webpack_require__("../../../../../src/app/socket.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pi_service__ = __webpack_require__("../../../../../src/app/pi.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__data_service__ = __webpack_require__("../../../../../src/app/data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__log_service__ = __webpack_require__("../../../../../src/app/log.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AppComponent = (function () {
    function AppComponent(configService, socketService, piService, dataService, logService) {
        var _this = this;
        this.configService = configService;
        this.socketService = socketService;
        this.piService = piService;
        this.dataService = dataService;
        this.logService = logService;
        this.connected = false;
        this.dbConnected = false;
        this.connectionAttempts = 0;
        this.configLoaded = false;
        this.light = false;
        this.capturing = false;
        socketService.connected.subscribe(function (connected) {
            _this.connected = connected;
        });
        socketService.reconnectionAttempts.subscribe(function (n) {
            _this.connectionAttempts = n;
        });
        configService.configLoaded.subscribe(function (isLoaded) {
            _this.configLoaded = isLoaded;
        });
        piService.light.subscribe(function (light) {
            _this.light = light;
        });
        dataService.dbConnected.subscribe(function (connected) {
            _this.dbConnected = connected;
        });
        piService.capturing.subscribe(function (capturing) {
            _this.capturing = capturing;
        });
    }
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__config_service__["a" /* ConfigService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__config_service__["a" /* ConfigService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__socket_service__["a" /* SocketService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__socket_service__["a" /* SocketService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__pi_service__["a" /* PiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__pi_service__["a" /* PiService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__data_service__["a" /* DataService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__data_service__["a" /* DataService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5__log_service__["a" /* LogService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__log_service__["a" /* LogService */]) === "function" && _e || Object])
], AppComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.constants.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppConstants; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};

var AppConstants = (function () {
    function AppConstants(_window) {
        this._window = _window;
        this.serverURL = "http://" + this._window.location.hostname + ":" + this._window.location.port;
        this.previewURL = "http://" + this._window.location.hostname + ":8181";
        // console.log("Esadasddas", this._window.location.hostname, this._window.location.port, this._window.location);
    }
    return AppConstants;
}());
AppConstants = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __param(0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Inject */])(Window)),
    __metadata("design:paramtypes", [Object])
], AppConstants);

;
//# sourceMappingURL=app.constants.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__capture_capture_component__ = __webpack_require__("../../../../../src/app/capture/capture.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__preview_preview_component__ = __webpack_require__("../../../../../src/app/preview/preview.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__live_live_component__ = __webpack_require__("../../../../../src/app/live/live.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__data_data_component__ = __webpack_require__("../../../../../src/app/data/data.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__process_log_process_log_component__ = __webpack_require__("../../../../../src/app/process-log/process-log.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__process_queue_process_queue_component__ = __webpack_require__("../../../../../src/app/process-queue/process-queue.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__capture_log_capture_log_component__ = __webpack_require__("../../../../../src/app/capture-log/capture-log.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__advanced_advanced_component__ = __webpack_require__("../../../../../src/app/advanced/advanced.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__crop_crop_component__ = __webpack_require__("../../../../../src/app/crop/crop.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__data_roi_data_roi_component__ = __webpack_require__("../../../../../src/app/data-roi/data-roi.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__process_process_component__ = __webpack_require__("../../../../../src/app/process/process.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__config_service__ = __webpack_require__("../../../../../src/app/config.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__config_validator_service__ = __webpack_require__("../../../../../src/app/config-validator.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__log_service__ = __webpack_require__("../../../../../src/app/log.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__socket_service__ = __webpack_require__("../../../../../src/app/socket.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pi_service__ = __webpack_require__("../../../../../src/app/pi.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__data_service__ = __webpack_require__("../../../../../src/app/data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__data_components_data_plot_data_plot_component__ = __webpack_require__("../../../../../src/app/data/_components/data-plot/data-plot.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__data_components_roi_selector_roi_selector_component__ = __webpack_require__("../../../../../src/app/data/_components/roi-selector/roi-selector.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__config_guard__ = __webpack_require__("../../../../../src/app/config.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26_ngx_bootstrap__ = __webpack_require__("../../../../ngx-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__point_editor_point_editor_component__ = __webpack_require__("../../../../../src/app/point-editor/point-editor.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__app_constants__ = __webpack_require__("../../../../../src/app/app.constants.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





























var appRoutes = [
    { path: '',
        redirectTo: '/capture',
        pathMatch: 'full'
    },
    { path: 'capture', component: __WEBPACK_IMPORTED_MODULE_6__capture_capture_component__["a" /* CaptureComponent */] },
    { path: 'process', component: __WEBPACK_IMPORTED_MODULE_16__process_process_component__["a" /* ProcessComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_25__config_guard__["a" /* ConfigGuard */]] },
    { path: 'data', component: __WEBPACK_IMPORTED_MODULE_9__data_data_component__["a" /* DataComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_25__config_guard__["a" /* ConfigGuard */]] },
    { path: 'advanced', component: __WEBPACK_IMPORTED_MODULE_13__advanced_advanced_component__["a" /* AdvancedComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_25__config_guard__["a" /* ConfigGuard */]] },
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_6__capture_capture_component__["a" /* CaptureComponent */],
            __WEBPACK_IMPORTED_MODULE_7__preview_preview_component__["a" /* PreviewComponent */],
            __WEBPACK_IMPORTED_MODULE_8__live_live_component__["a" /* LiveComponent */],
            __WEBPACK_IMPORTED_MODULE_9__data_data_component__["a" /* DataComponent */],
            __WEBPACK_IMPORTED_MODULE_10__process_log_process_log_component__["a" /* ProcessLogComponent */],
            __WEBPACK_IMPORTED_MODULE_11__process_queue_process_queue_component__["a" /* ProcessQueueComponent */],
            __WEBPACK_IMPORTED_MODULE_12__capture_log_capture_log_component__["a" /* CaptureLogComponent */],
            __WEBPACK_IMPORTED_MODULE_13__advanced_advanced_component__["a" /* AdvancedComponent */],
            __WEBPACK_IMPORTED_MODULE_16__process_process_component__["a" /* ProcessComponent */],
            __WEBPACK_IMPORTED_MODULE_14__crop_crop_component__["a" /* CropComponent */],
            __WEBPACK_IMPORTED_MODULE_15__data_roi_data_roi_component__["a" /* DataRoiComponent */],
            __WEBPACK_IMPORTED_MODULE_23__data_components_data_plot_data_plot_component__["a" /* DataPlotComponent */],
            __WEBPACK_IMPORTED_MODULE_24__data_components_roi_selector_roi_selector_component__["a" /* RoiSelectorComponent */],
            __WEBPACK_IMPORTED_MODULE_27__point_editor_point_editor_component__["a" /* PointEditorComponent */]
        ],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_14__crop_crop_component__["a" /* CropComponent */],
            __WEBPACK_IMPORTED_MODULE_7__preview_preview_component__["a" /* PreviewComponent */],
            __WEBPACK_IMPORTED_MODULE_8__live_live_component__["a" /* LiveComponent */],
            __WEBPACK_IMPORTED_MODULE_10__process_log_process_log_component__["a" /* ProcessLogComponent */],
            __WEBPACK_IMPORTED_MODULE_11__process_queue_process_queue_component__["a" /* ProcessQueueComponent */],
            __WEBPACK_IMPORTED_MODULE_12__capture_log_capture_log_component__["a" /* CaptureLogComponent */],
            __WEBPACK_IMPORTED_MODULE_15__data_roi_data_roi_component__["a" /* DataRoiComponent */],
            __WEBPACK_IMPORTED_MODULE_27__point_editor_point_editor_component__["a" /* PointEditorComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_common__["a" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_26_ngx_bootstrap__["a" /* ModalModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_26_ngx_bootstrap__["b" /* ProgressbarModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* RouterModule */].forRoot(appRoutes)
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_17__config_service__["a" /* ConfigService */],
            __WEBPACK_IMPORTED_MODULE_18__config_validator_service__["a" /* ConfigValidatorService */],
            __WEBPACK_IMPORTED_MODULE_21__pi_service__["a" /* PiService */],
            __WEBPACK_IMPORTED_MODULE_20__socket_service__["a" /* SocketService */],
            __WEBPACK_IMPORTED_MODULE_22__data_service__["a" /* DataService */],
            __WEBPACK_IMPORTED_MODULE_19__log_service__["a" /* LogService */],
            __WEBPACK_IMPORTED_MODULE_25__config_guard__["a" /* ConfigGuard */],
            __WEBPACK_IMPORTED_MODULE_28__app_constants__["a" /* AppConstants */],
            { provide: Window, useValue: window },
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/capture-log/capture-log.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"modal-header\">\n  <button type=\"button\" class=\"btn btn-default pull-right\" (click)=\"bsModalRef.hide()\">Close</button>\n</div>\n<div class=\"modal-body\">\n  <div class=\"log\" #logElement>\n    <div *ngIf=\"log.length == 0\">Log is empty</div>\n    <div *ngFor=\"let entry of log\" [ngClass]=\"entry.type\">{{entry.value}}</div>\n  </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/capture-log/capture-log.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".log {\n  height: 300px;\n  overflow-y: scroll;\n  width: 100%; }\n  .log div {\n    padding: 2px 15px; }\n    .log div:nth-child(odd) {\n      background-color: #f9f9f9; }\n    .log div.error {\n      color: #fe767a; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/capture-log/capture-log.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__log_service__ = __webpack_require__("../../../../../src/app/log.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ngx_bootstrap_modal_modal_options_class__ = __webpack_require__("../../../../ngx-bootstrap/modal/modal-options.class.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__ = __webpack_require__("../../../../rxjs/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_takeUntil__ = __webpack_require__("../../../../rxjs/add/operator/takeUntil.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_takeUntil___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_takeUntil__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CaptureLogComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var CaptureLogComponent = (function () {
    function CaptureLogComponent(logService, bsModalRef) {
        this.logService = logService;
        this.bsModalRef = bsModalRef;
        this.componentDestroyed = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"]();
        this.log = [];
    }
    CaptureLogComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.logService.captureLog.takeUntil(this.componentDestroyed.asObservable()).subscribe(function (log) {
            _this.log = log;
            setTimeout(function () {
                _this.logElement.nativeElement.scrollTop = _this.logElement.nativeElement.scrollHeight;
            });
        });
    };
    CaptureLogComponent.prototype.ngOnDestroy = function () {
        this.componentDestroyed.next(true);
        this.componentDestroyed.complete();
    };
    return CaptureLogComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_17" /* ViewChild */])('logElement'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* ElementRef */]) === "function" && _a || Object)
], CaptureLogComponent.prototype, "logElement", void 0);
CaptureLogComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'modal-content',
        template: __webpack_require__("../../../../../src/app/capture-log/capture-log.component.html"),
        styles: [__webpack_require__("../../../../../src/app/capture-log/capture-log.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__log_service__["a" /* LogService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__log_service__["a" /* LogService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2_ngx_bootstrap_modal_modal_options_class__["f" /* BsModalRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ngx_bootstrap_modal_modal_options_class__["f" /* BsModalRef */]) === "function" && _c || Object])
], CaptureLogComponent);

var _a, _b, _c;
//# sourceMappingURL=capture-log.component.js.map

/***/ }),

/***/ "../../../../../src/app/capture/capture.component.html":
/***/ (function(module, exports) {

module.exports = "<form #configForm=\"ngForm\" novalidate>\n  <div class=\"row\">\n    <div class=\"col-md-6\">\n      <div class=\"form-group row\">\n        <label class=\"col-xs-12 col-md-4 col-form-label\">Config File</label>\n        <div class=\"col\">\n          <input type=\"text\" class=\"form-control\" name=\"configFile\" required #configFile=\"ngModel\" [(ngModel)]=\"configService.configFile\">\n          <small class=\"form-text text-danger\" *ngIf=\"configFile.errors?.required\">\n            Config is required. If unsure use /home/pi/cavicapture/config.ini\n          </small>\n        </div>\n      </div>\n      <div class=\"form-group row\" *ngIf=\"configLoaded\">\n        <label class=\"col-xs-12 col-md-4 col-form-label\">Shutterspeed</label>\n        <div class=\"col\">\n          <input \n            type=\"number\" name=\"cameraShutterSpeed\" class=\"form-control\" placeholder=\"1000\" required\n            [(ngModel)]=\"config.camera.shutter_speed\" #cameraShutterSpeed=\"ngModel\">\n          <small class=\"form-text text-danger\" *ngIf=\"cameraShutterSpeed.errors?.required\">\n            A shutterspeed is required\n          </small>\n        </div>\n        <div class=\"col-3\">\n          <div class=\"btn-group\">\n            <button type=\"button\" class=\"btn btn-secondary\" (click)=\"config.camera.shutter_speed = config.camera.shutter_speed - 100; cameraShutterSpeed.control.markAsDirty()\"><i class=\"fa fa-minus\" aria-hidden=\"true\"></i></button>\n            <button type=\"button\" class=\"btn btn-secondary\" (click)=\"config.camera.shutter_speed = config.camera.shutter_speed + 100; cameraShutterSpeed.control.markAsDirty()\"><i class=\"fa fa-plus\" aria-hidden=\"true\"></i></button>\n          </div>\n        </div>\n      </div>\n      <div class=\"form-group row\" *ngIf=\"configLoaded\">\n        <label class=\"col-xs-12 col-md-4 col-form-label\">ISO</label>\n        <div class=\"col\">\n          <input type=\"number\" name=\"cameraISO\" class=\"form-control\" placeholder=\"100\" [(ngModel)]=\"config.camera.ISO\" #cameraISO=\"ngModel\" required>\n          <small class=\"form-text text-danger\" *ngIf=\"cameraISO.errors?.required\">\n            ISO is required\n          </small>\n        </div>\n        <div class=\"col-3\">\n          <div class=\"btn-group\">\n            <button type=\"button\" class=\"btn btn-secondary\" (click)=\"config.camera.ISO = config.camera.ISO - 100; cameraISO.control.markAsDirty()\"><i class=\"fa fa-minus\" aria-hidden=\"true\"></i></button>\n            <button type=\"button\" class=\"btn btn-secondary\" (click)=\"config.camera.ISO = config.camera.ISO + 100; cameraISO.control.markAsDirty()\"><i class=\"fa fa-plus\" aria-hidden=\"true\"></i></button>\n          </div>\n        </div>\n      </div>\n      <div class=\"form-group row\" *ngIf=\"configLoaded\">\n        <label class=\"col-xs-12 col-md-4 col-form-label\">Duration (hours)</label>\n        <div class=\"col\">\n          <input type=\"number\" name=\"captureDuration\" class=\"form-control\" placeholder=\"1\" [(ngModel)]=\"config.capture.duration\" #captureDuration=\"ngModel\" required>\n          <small class=\"form-text text-danger\" *ngIf=\"captureDuration.errors?.required\">\n            Duration is required\n          </small>\n        </div>\n        <div class=\"col-3\">\n          <div class=\"btn-group\">\n            <button type=\"button\" class=\"btn btn-secondary\" (click)=\"config.capture.duration = config.capture.duration - 1; captureDuration.control.markAsDirty()\"><i class=\"fa fa-minus\" aria-hidden=\"true\"></i></button>\n            <button type=\"button\" class=\"btn btn-secondary\" (click)=\"config.capture.duration = config.capture.duration + 1; captureDuration.control.markAsDirty()\"><i class=\"fa fa-plus\" aria-hidden=\"true\"></i></button>\n          </div>\n        </div>\n      </div>\n      <div class=\"form-group row\" *ngIf=\"configLoaded\">\n        <label class=\"col-xs-12 col-md-4 col-form-label\">Interval (sec)</label>\n        <div class=\"col\">\n          <input type=\"number\" name=\"captureInterval\" class=\"form-control\" placeholder=\"300\" [(ngModel)]=\"config.capture.interval\" #captureInterval=\"ngModel\" required>\n          <small class=\"form-text text-danger\" *ngIf=\"captureInterval.errors?.required\">\n            Interval is required\n          </small>\n        </div>\n        <div class=\"col-3\">\n          <div class=\"btn-group\">\n            <button type=\"button\" class=\"btn btn-secondary\" (click)=\"config.capture.interval = config.capture.interval - 20; captureInterval.control.markAsDirty()\"><i class=\"fa fa-minus\" aria-hidden=\"true\"></i></button>\n            <button type=\"button\" class=\"btn btn-secondary\" (click)=\"config.capture.interval = config.capture.interval + 20; captureInterval.control.markAsDirty()\"><i class=\"fa fa-plus\" aria-hidden=\"true\"></i></button>\n          </div>\n        </div>\n      </div>\n      <div class=\"form-group row\" *ngIf=\"configLoaded\">\n        <label class=\"col-xs-12 col-md-4 col-form-label\">Sample Type</label>\n        <div class=\"col\">\n          <div class=\"form-check form-check-inline\">\n            <label class=\"form-check-label\">\n              <input class=\"form-check-input\" type=\"radio\" [(ngModel)]=\"config.capture.light_source\" name=\"light_source\" value=\"Above\"> Stem\n            </label>\n          </div>\n          <div class=\"form-check form-check-inline\">\n            <label class=\"form-check-label\">\n              <input class=\"form-check-input\" type=\"radio\" [(ngModel)]=\"config.capture.light_source\" name=\"light_source\" value=\"Below\"> Leaf\n            </label>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"col-md-6\">\n      <div class=\"form-group row\" *ngIf=\"configLoaded\">\n        <label class=\"col-xs-12 col-md-4 col-form-label\">USB Stick / External</label>\n        <div class=\"col\">\n          <select \n            class=\"form-control\" name=\"storageOption\" \n            #storageOption=\"ngModel\" [(ngModel)]=\"config.capture.external_storage\" \n            (change)=\"updateOutputDir()\" required>\n            <option value=\"\" *ngIf=\"storageList?.length == 0\">None available</option>\n            <option value=\"\" *ngIf=\"storageList?.length > 0\">Select storage option</option>\n            <option *ngFor=\"let option of storageList\" [value]=\"option\">{{option}}</option>\n          </select> \n          <small class=\"form-text text-danger\" *ngIf=\"storageOption.errors?.required\">\n            USB stick or external storage required\n          </small>\n          <div class=\"row mt-1\">\n            <div class=\"col\">\n              <button class=\"btn btn-secondary btn-sm\" type=\"button\" (click)=\"ejectExternalStorage()\" *ngIf=\"configLoaded && config.capture.external_storage\">Eject <i class=\"fa fa-eject\" aria-hidden=\"true\"></i></button>\n              <button class=\"btn btn-secondary btn-sm\" type=\"button\" (click)=\"refresh()\" *ngIf=\"configLoaded\">Refresh List <i class=\"fa fa-refresh\" aria-hidden=\"true\"></i></button>          \n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"form-group row\" *ngIf=\"configLoaded\">\n        <label class=\"col-xs-12 col-md-4 col-form-label\">Sequence Name</label>\n        <div class=\"col\">\n          <input type=\"text\" name=\"captureSequenceName\" class=\"form-control\" \n            [(ngModel)]=\"config.capture.sequence_name\" #captureSequenceName=\"ngModel\" required (keyup)=\"updateOutputDir()\">\n          <small class=\"form-text text-danger\" *ngIf=\"captureSequenceName.errors?.required\">\n            Sequence name is required\n          </small>\n        </div>\n      </div>\n      <div class=\"form-group row\" *ngIf=\"configLoaded && config.capture.external_storage && config.capture.sequence_name\">\n        <label class=\"col-xs-12 col-md-4 col-form-label\">Output Directory</label>\n        <div class=\"col\">\n          <input type=\"text\" name=\"captureOutputDir\" class=\"form-control\" [value]=\"config.capture.output_dir + '/' + config.capture.sequence_name\" disabled=\"disabled\">\n        </div>\n      </div>\n      <div class=\"form-group row\" *ngIf=\"configLoaded\">\n        <label class=\"col-xs-12 col-md-4 col-form-label\">Resolution</label>\n        <div class=\"col\">\n          <select name=\"captureResolution\" [(ngModel)]=\"config.capture.resolution\" class=\"form-control\" #captureResolution=\"ngModel\" required>\n            <option value=\"Max\">Max (2592x1944)</option>\n            <!-- <option value=\"Large\">Large (1920x1080)</option> -->\n            <option value=\"Medium\">Medium (1296x972)</option>\n            <option value=\"Small\">Small (640x480)</option>\n          </select>\n        </div>\n      </div>\n      <div class=\"form-group row\" *ngIf=\"configLoaded\">\n        <label class=\"col-xs-12 col-md-4 col-form-label\">Crop</label>\n        <div class=\"col\">\n          <div class=\"form-check form-check-inline\">\n            <label class=\"form-check-label\">\n              <input class=\"form-check-input\" type=\"radio\" [(ngModel)]=\"config.capture.crop_enabled\" name=\"crop_enabled\" value=\"On\"> Enabled\n            </label>\n          </div>\n          <div class=\"form-check form-check-inline\">\n            <label class=\"form-check-label\">\n              <input class=\"form-check-input\" type=\"radio\" [(ngModel)]=\"config.capture.crop_enabled\" name=\"crop_enabled\" value=\"Off\"> Disabled\n            </label>\n          </div>\n          <div class=\"row\" *ngIf=\"config.capture.crop_enabled == 'On'\">\n            <div class=\"col\">\n              <button type=\"button\" class=\"btn btn-secondary\" (click)=\"showCrop()\" *ngIf=\"configLoaded\"><i class=\"fa fa-crop\" aria-hidden=\"true\"></i> Set</button>\n            </div>\n          </div>\n        </div>\n      </div>\n      <!-- <div class=\"form-group row\" *ngIf=\"configLoaded && config.capture.crop_enabled == 'On'\">\n        <label class=\"col-xs-12 col-md-4 col-form-label\">Crop Area</label>\n      </div> -->\n    </div>\n  </div>\n  <div class=\"row\">\n    <div class=\"col\">\n      <hr />\n      <div class=\"d-flex justify-content-start\">\n        <div>\n          <button type=\"button\" class=\"btn mb-1\" [ngClass]=\"{'btn-primary':!configLoaded, 'btn-secondary':configLoaded}\" (click)=\"readConfig()\">Read Config</button><span *ngIf=\"!configLoaded\"> or </span>\n          <button type=\"button\" class=\"btn mb-1 btn-secondary\" *ngIf=\"!configLoaded\" (click)=\"readConfig()\">Create New</button>\n          <button type=\"button\" class=\"btn mb-1 btn-primary\" (click)=\"updateConfig()\" *ngIf=\"configLoaded && configForm.valid && configForm.dirty\">Update Config</button>\n          <button type=\"button\" class=\"btn mb-1 btn-secondary\" (click)=\"configVisible = !configVisible\" *ngIf=\"configLoaded\">{{configVisible ? 'Hide' : 'Show'}} Config</button>\n          <button type=\"button\" class=\"btn mb-1 btn-secondary\" (click)=\"showLog()\" *ngIf=\"configLoaded\"><i class=\"fa fa-file-text-o\" aria-hidden=\"true\"></i> View Log</button>\n          <button type=\"button\" class=\"btn mb-1 btn-secondary\" (click)=\"showLive()\" *ngIf=\"configLoaded && !capturing\"><i class=\"fa fa-camera\" aria-hidden=\"true\"></i> Live</button>\n        </div>\n        <div class=\"ml-auto p-2\" *ngIf=\"configLoaded\">\n          <button type=\"button\" class=\"btn btn-lg mb-1 btn-secondary\" (click)=\"showPreview()\" *ngIf=\"!capturing && config.capture.external_storage && !configForm.dirty && configForm.valid\">Preview</button>\n          <button type=\"button\" class=\"btn btn-lg mb-1 btn-primary\" (click)=\"startCapture()\" *ngIf=\"storageList && config.capture.external_storage && !capturing && !configForm.dirty && configForm.valid\">Start</button>\n          <button type=\"button\" class=\"btn btn-lg mb-1 btn-danger\" (click)=\"stopCapture()\" *ngIf=\"capturing\">Stop</button>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"row\" *ngIf=\"configVisible\">\n    <div class=\"col\">\n      <pre>{{ config | json }}</pre>\n    </div>\n  </div>\n</form>"

/***/ }),

/***/ "../../../../../src/app/capture/capture.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/capture/capture.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config_service__ = __webpack_require__("../../../../../src/app/config.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pi_service__ = __webpack_require__("../../../../../src/app/pi.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__config_validator_service__ = __webpack_require__("../../../../../src/app/config-validator.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Subject__ = __webpack_require__("../../../../rxjs/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_takeUntil__ = __webpack_require__("../../../../rxjs/add/operator/takeUntil.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_takeUntil___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_takeUntil__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__live_live_component__ = __webpack_require__("../../../../../src/app/live/live.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__preview_preview_component__ = __webpack_require__("../../../../../src/app/preview/preview.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__crop_crop_component__ = __webpack_require__("../../../../../src/app/crop/crop.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__capture_log_capture_log_component__ = __webpack_require__("../../../../../src/app/capture-log/capture-log.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_ngx_bootstrap_modal__ = __webpack_require__("../../../../ngx-bootstrap/modal/index.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CaptureComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var CaptureComponent = (function () {
    function CaptureComponent(configService, piService, modalService, configValidatorService) {
        this.configService = configService;
        this.piService = piService;
        this.modalService = modalService;
        this.configValidatorService = configValidatorService;
        this.configLoaded = false;
        this.capturing = false;
        this.configVisible = false;
        this.configValid = false;
        this.storageList = [];
        this.outputPath = '';
        this.componentDestroyed = new __WEBPACK_IMPORTED_MODULE_5_rxjs_Subject__["Subject"]();
    }
    CaptureComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.configService.configLoaded.takeUntil(this.componentDestroyed.asObservable()).subscribe(function (isLoaded) {
            _this.configLoaded = isLoaded;
        });
        this.configService.config.takeUntil(this.componentDestroyed.asObservable()).subscribe(function (config) {
            if (config) {
                _this.config = Object.assign({}, config);
                if (_this.config.capture.crop_enabled == null) {
                    _this.config.capture.crop_enabled = "Off";
                }
                if (_this.config.process.roi_enabled == null) {
                    _this.config.process.roi_enabled = "Off";
                }
                if (_this.configForm) {
                    setTimeout(function () {
                        _this.configForm.form.markAsPristine();
                    });
                }
            }
        });
        this.piService.capturing.takeUntil(this.componentDestroyed.asObservable()).subscribe(function (capturing) {
            _this.capturing = capturing;
        });
        this.piService.storageList.takeUntil(this.componentDestroyed.asObservable()).subscribe(function (storageList) {
            _this.storageList = storageList;
        });
        this.configForm.valueChanges.takeUntil(this.componentDestroyed.asObservable()).subscribe(function (change) {
            console.log("Change!", change);
            // this.configForm.form.markAsDirty();
        });
    };
    CaptureComponent.prototype.ngOnChanges = function (changes) {
        // console.log("Changes!!!!", changes);
    };
    CaptureComponent.prototype.ngOnDestroy = function () {
        this.componentDestroyed.next(true);
        this.componentDestroyed.complete();
    };
    CaptureComponent.prototype.updateOutputDir = function () {
        if (this.config.capture.external_storage) {
            this.config.capture.output_dir = '/media/pi/' + this.config.capture.external_storage;
        }
        else {
            this.config.capture.output_dir = '';
        }
        // if(this.config.capture.output_dir && this.config.capture.sequence_name) {
        //   this.outputPath = this.config.capture.output_dir + '/' + this.config.capture.sequence_name
        // } else {
        //   this.outputPath = ''
        // }
    };
    CaptureComponent.prototype.ejectExternalStorage = function () {
        this.piService.unmountStorage(this.config.capture.external_storage);
    };
    CaptureComponent.prototype.readConfig = function () {
        this.configService.readConfig();
    };
    CaptureComponent.prototype.updateConfig = function () {
        this.configService.updateConfig(this.config);
    };
    CaptureComponent.prototype.stopCapture = function () {
        console.log("Stopping capture");
        this.piService.stopCapture();
    };
    CaptureComponent.prototype.startCapture = function () {
        console.log("Starting capture");
        this.piService.startCapture();
    };
    CaptureComponent.prototype.refresh = function () {
        this.piService.getStorageList();
    };
    CaptureComponent.prototype.showLive = function () {
        this.liveModalRef = this.modalService.show(__WEBPACK_IMPORTED_MODULE_7__live_live_component__["a" /* LiveComponent */], { class: 'modal-lg' });
    };
    CaptureComponent.prototype.showPreview = function () {
        this.previewModalRef = this.modalService.show(__WEBPACK_IMPORTED_MODULE_8__preview_preview_component__["a" /* PreviewComponent */], { class: 'modal-lg' });
    };
    CaptureComponent.prototype.showLog = function () {
        this.logModalRef = this.modalService.show(__WEBPACK_IMPORTED_MODULE_10__capture_log_capture_log_component__["a" /* CaptureLogComponent */], { class: 'modal-lg' });
    };
    CaptureComponent.prototype.showCrop = function () {
        this.cropModalRef = this.modalService.show(__WEBPACK_IMPORTED_MODULE_9__crop_crop_component__["a" /* CropComponent */], { class: 'modal-lg' });
    };
    return CaptureComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_17" /* ViewChild */])('configForm'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* NgForm */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* NgForm */]) === "function" && _a || Object)
], CaptureComponent.prototype, "configForm", void 0);
CaptureComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-capture',
        template: __webpack_require__("../../../../../src/app/capture/capture.component.html"),
        styles: [__webpack_require__("../../../../../src/app/capture/capture.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__config_service__["a" /* ConfigService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__config_service__["a" /* ConfigService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__pi_service__["a" /* PiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__pi_service__["a" /* PiService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_11_ngx_bootstrap_modal__["b" /* BsModalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_11_ngx_bootstrap_modal__["b" /* BsModalService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__config_validator_service__["a" /* ConfigValidatorService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__config_validator_service__["a" /* ConfigValidatorService */]) === "function" && _e || Object])
], CaptureComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=capture.component.js.map

/***/ }),

/***/ "../../../../../src/app/config-validator.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__ = __webpack_require__("../../../../rxjs/BehaviorSubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config_service__ = __webpack_require__("../../../../../src/app/config.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pi_service__ = __webpack_require__("../../../../../src/app/pi.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfigValidatorService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ConfigValidatorService = (function () {
    function ConfigValidatorService(configService, piService) {
        var _this = this;
        this.configService = configService;
        this.piService = piService;
        this.configValid = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["BehaviorSubject"](false);
        configService.configLoaded.subscribe(function () {
            _this.validateConfig();
        });
        piService.storageList.subscribe(function () {
            _this.validateConfig();
        });
    }
    ConfigValidatorService.prototype.validateConfig = function () {
        var valid = true;
        if (this.configService.configLoaded.getValue() !== true) {
            valid = false;
        }
        var storageList = this.piService.storageList.getValue();
        var config = this.configService.config.getValue();
        if (!storageList) {
            valid = false;
        }
        else if (storageList.length === 0) {
            valid = false;
        }
        else if (config.capture.external_storage.length === 0) {
            valid = false;
        }
        else {
            if (!storageList.find(function (item) { return item == config.capture.external_storage; })) {
                valid = false;
            }
        }
        if (this.configValid.getValue() !== valid) {
            this.configValid.next(valid);
        }
    };
    return ConfigValidatorService;
}());
ConfigValidatorService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__config_service__["a" /* ConfigService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__config_service__["a" /* ConfigService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__pi_service__["a" /* PiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__pi_service__["a" /* PiService */]) === "function" && _b || Object])
], ConfigValidatorService);

var _a, _b;
//# sourceMappingURL=config-validator.service.js.map

/***/ }),

/***/ "../../../../../src/app/config.guard.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config_service__ = __webpack_require__("../../../../../src/app/config.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfigGuard; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ConfigGuard = (function () {
    function ConfigGuard(configService, router) {
        this.configService = configService;
        this.router = router;
    }
    ConfigGuard.prototype.canActivate = function (next, state) {
        if (this.configService.configLoaded.getValue() == true) {
            return true;
        }
        else {
            this.router.navigate(['capture']);
            return false;
        }
    };
    return ConfigGuard;
}());
ConfigGuard = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__config_service__["a" /* ConfigService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__config_service__["a" /* ConfigService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _b || Object])
], ConfigGuard);

var _a, _b;
//# sourceMappingURL=config.guard.js.map

/***/ }),

/***/ "../../../../../src/app/config.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__ = __webpack_require__("../../../../rxjs/BehaviorSubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__socket_service__ = __webpack_require__("../../../../../src/app/socket.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfigService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ConfigService = (function () {
    function ConfigService(socketService) {
        this.socketService = socketService;
        this.configLoaded = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["BehaviorSubject"](false);
        // public configFile: string = '/home/pi/cavicapture/config.ini';
        // public configFile: string = './dummy_pi_fs/config.ini';
        this.configFile = '/home/pi/caviconsole/default-config.ini';
        this.scriptPath = '/home/pi/cavicapture/cavicapture.py';
        this.processorPath = '/home/pi/caviprocess/caviprocess.py';
        this.config = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["BehaviorSubject"](null);
        this.wifiConfig = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["BehaviorSubject"](null);
        console.log("Config service constructor");
        this.setupSocketEvents();
    }
    ConfigService.prototype.setupSocketEvents = function () {
        var _this = this;
        this.socketService.connected.subscribe(function (connected) {
            if (connected) {
                _this.socketService.socket.emit("pi:wifi:config");
                _this.socketService.socket.emit("config:get:current");
                _this.socketService.socket.emit("config:get:file");
            }
            else {
                _this.configLoaded.next(false);
            }
        });
        this.socketService.socket.on('config:current', function (config) {
            console.log("Current config", config);
            _this.setConfig(config);
        });
        // this.socketService.socket.on('config:updated', (config) => {
        //   console.log("Config updated", config);
        //   this.setConfig(config);
        // })
        this.socketService.socket.on('config:file', function (configFilePath) {
            console.log("Config file", configFilePath);
            _this.configFile = configFilePath;
        });
        this.socketService.socket.on('config:unloaded', function () {
            if (_this.configLoaded.getValue() !== false) {
                _this.configLoaded.next(false);
                _this.config.next(null);
            }
        });
        this.socketService.socket.on('pi:wifi:config', function (config) {
            console.log("Wifi config", config);
            _this.setWifiConfig(config);
        });
    };
    ConfigService.prototype.setConfig = function (config) {
        console.log("Setting config", config);
        this.config.next(config);
        if (this.configLoaded.getValue() !== true) {
            this.configLoaded.next(true);
        }
    };
    ConfigService.prototype.setWifiConfig = function (config) {
        this.wifiConfig.next(config);
    };
    ConfigService.prototype.updateWifiConfig = function (config) {
        this.socketService.socket.emit("pi:wifi:update", config);
    };
    ConfigService.prototype.readConfig = function () {
        if (!this.configFile) {
            return;
        }
        this.socketService.socket.emit('config:read', this.configFile);
    };
    ConfigService.prototype.updateConfig = function (config) {
        if (!this.configFile) {
            return;
        }
        this.socketService.socket.emit("config:update", config, this.configFile);
    };
    ConfigService.prototype.getCaptureDimensions = function () {
        console.log("Resolution ", this.config.getValue().capture.resolution);
        console.log("Crop ", this.config.getValue().capture.crop);
        return {
            height: 400,
            width: 600
        };
    };
    return ConfigService;
}());
ConfigService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__socket_service__["a" /* SocketService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__socket_service__["a" /* SocketService */]) === "function" && _a || Object])
], ConfigService);

var _a;
//# sourceMappingURL=config.service.js.map

/***/ }),

/***/ "../../../../../src/app/crop/crop.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"modal-header\">\n  <button *ngIf=\"newROI\" type=\"button\" class=\"btn btn-primary\" (click)=\"saveCrop()\">Save</button>\n  <button type=\"button\" class=\"btn btn-default pull-right\" (click)=\"bsModalRef.hide()\">Close</button>\n</div>\n<div class=\"modal-body\">\n  <p class=\"lead\" *ngIf=\"!imagePreviewSrc\">Generating preview...</p>\n  <roi-selector\n    *ngIf=\"imagePreviewSrc\" \n    (roiChange)=\"roiChanged($event)\" \n    [imagePreviewSrc]=\"imagePreviewSrc\"\n    [roi]=\"roi\"></roi-selector>\n  <div class=\"clearfix\"></div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/crop/crop.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/crop/crop.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pi_service__ = __webpack_require__("../../../../../src/app/pi.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__socket_service__ = __webpack_require__("../../../../../src/app/socket.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config_service__ = __webpack_require__("../../../../../src/app/config.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ngx_bootstrap_modal_modal_options_class__ = __webpack_require__("../../../../ngx-bootstrap/modal/modal-options.class.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Subject__ = __webpack_require__("../../../../rxjs/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_takeUntil__ = __webpack_require__("../../../../rxjs/add/operator/takeUntil.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_takeUntil___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_takeUntil__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_moment__ = __webpack_require__("../../../../moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_constants__ = __webpack_require__("../../../../../src/app/app.constants.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CropComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var CropComponent = (function () {
    function CropComponent(piService, socketService, configService, bsModalRef, appConstants) {
        this.piService = piService;
        this.socketService = socketService;
        this.configService = configService;
        this.bsModalRef = bsModalRef;
        this.appConstants = appConstants;
        this.newROI = false;
        this.componentDestroyed = new __WEBPACK_IMPORTED_MODULE_5_rxjs_Subject__["Subject"]();
    }
    CropComponent.prototype.roiChanged = function (roi) {
        this.roi = roi;
        this.newROI = true;
    };
    CropComponent.prototype.saveCrop = function () {
        this.config.capture.crop = [
            this.roi.hRelImageHeight,
            this.roi.wRelImageWidth,
            this.roi.topRelImageHeight,
            this.roi.leftRelImageWidth
        ].join(",");
        console.log("Saving ROI", this.config);
        this.configService.updateConfig(this.config);
        this.newROI = false;
        this.bsModalRef.hide();
    };
    CropComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.socketService.socket.on('crop:previewGenerated', function () {
            _this.imagePreviewSrc = _this.appConstants.serverURL + "/capture/preview?" + __WEBPACK_IMPORTED_MODULE_7_moment__().format('MMDDYYYYHHmmss');
        });
        this.configService.config.takeUntil(this.componentDestroyed.asObservable()).subscribe(function (config) {
            if (!config)
                return;
            _this.config = Object.assign({}, config);
            var parsedCrop = _this.config.capture.crop.split(",");
            if (!parsedCrop.length)
                return;
            _this.roi = {
                hRelImageHeight: parseFloat(parsedCrop[0]),
                wRelImageWidth: parseFloat(parsedCrop[1]),
                topRelImageHeight: parseFloat(parsedCrop[2]),
                leftRelImageWidth: parseFloat(parsedCrop[3])
            };
            console.log("config ROI", _this.roi);
        });
        console.log("here?");
        this.piService.generatePreview();
    };
    CropComponent.prototype.ngOnDestroy = function () {
        this.componentDestroyed.next(true);
        this.componentDestroyed.complete();
    };
    return CropComponent;
}());
CropComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'modal-content',
        template: __webpack_require__("../../../../../src/app/crop/crop.component.html"),
        styles: [__webpack_require__("../../../../../src/app/crop/crop.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__pi_service__["a" /* PiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__pi_service__["a" /* PiService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__socket_service__["a" /* SocketService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__socket_service__["a" /* SocketService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__config_service__["a" /* ConfigService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__config_service__["a" /* ConfigService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4_ngx_bootstrap_modal_modal_options_class__["f" /* BsModalRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_ngx_bootstrap_modal_modal_options_class__["f" /* BsModalRef */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_8__app_constants__["a" /* AppConstants */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__app_constants__["a" /* AppConstants */]) === "function" && _e || Object])
], CropComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=crop.component.js.map

/***/ }),

/***/ "../../../../../src/app/data-roi/data-roi.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"modal-header\">\n  <button *ngIf=\"newROI\" type=\"button\" class=\"btn btn-primary\" (click)=\"saveROI()\">Save</button>\n  <button type=\"button\" class=\"btn btn-default pull-right\" (click)=\"bsModalRef.hide()\">Close</button>\n</div>\n<div class=\"modal-body\">\n  <p class=\"lead\" *ngIf=\"!imagePreviewSrc\">Loading...</p>\n  <div class=\"roiContainer\">\n    <roi-selector\n      *ngIf=\"imagePreviewSrc\" \n      (roiChange)=\"roiChanged($event)\" \n      [imagePreviewSrc]=\"imagePreviewSrc\"\n      [roi]=\"roi\"></roi-selector>\n  </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/data-roi/data-roi.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/data-roi/data-roi.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pi_service__ = __webpack_require__("../../../../../src/app/pi.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_constants__ = __webpack_require__("../../../../../src/app/app.constants.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__data_service__ = __webpack_require__("../../../../../src/app/data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__config_service__ = __webpack_require__("../../../../../src/app/config.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ngx_bootstrap_modal_modal_options_class__ = __webpack_require__("../../../../ngx-bootstrap/modal/modal-options.class.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Subject__ = __webpack_require__("../../../../rxjs/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_takeUntil__ = __webpack_require__("../../../../rxjs/add/operator/takeUntil.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_takeUntil___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_takeUntil__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataRoiComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var DataRoiComponent = (function () {
    function DataRoiComponent(piService, appConstants, configService, dataService, bsModalRef) {
        this.piService = piService;
        this.appConstants = appConstants;
        this.configService = configService;
        this.dataService = dataService;
        this.bsModalRef = bsModalRef;
        this.newROI = false;
        this.componentDestroyed = new __WEBPACK_IMPORTED_MODULE_6_rxjs_Subject__["Subject"]();
    }
    DataRoiComponent.prototype.roiChanged = function (roi) {
        this.roi = roi;
        this.newROI = true;
    };
    DataRoiComponent.prototype.saveROI = function () {
        var _this = this;
        this.config.process.roi = [
            this.roi.hRelImageHeight,
            this.roi.wRelImageWidth,
            this.roi.topRelImageHeight,
            this.roi.leftRelImageWidth
        ].join(",");
        console.log("Saving ROI", this.config);
        this.configService.updateConfig(this.config);
        this.newROI = false;
        setTimeout(function () { return _this.piService.startReprocessingAreas(); });
        this.bsModalRef.hide();
    };
    DataRoiComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.configService.config.takeUntil(this.componentDestroyed.asObservable()).subscribe(function (config) {
            if (!config)
                return;
            _this.config = Object.assign({}, config);
            var parsedROI = _this.config.process.roi.split(",");
            if (!parsedROI.length)
                return;
            _this.roi = {
                hRelImageHeight: parseFloat(parsedROI[0]),
                wRelImageWidth: parseFloat(parsedROI[1]),
                topRelImageHeight: parseFloat(parsedROI[2]),
                leftRelImageWidth: parseFloat(parsedROI[3])
            };
        });
        // Get the most recent captured image
        console.log("Last data item: ", this.dataService.data[this.dataService.data.length - 1]);
        var lastDataItem = this.dataService.data[this.dataService.data.length - 1];
        this.imagePreviewSrc = this.appConstants.serverURL + "/captured-image/" + lastDataItem.filename;
        // this.piService.latestCapturedImages.asObservable().takeUntil(this.componentDestroyed.asObservable()).filter(images => images.length > 0).subscribe((images) => {
        //   console.log("Images...", images);
        //   console.log("Setting preview src to ", this.imagePreviewSrc);
        // })
        // this.piService.getLatestCapturedImages(1);
    };
    DataRoiComponent.prototype.ngOnDestroy = function () {
        this.componentDestroyed.next(true);
        this.componentDestroyed.complete();
    };
    return DataRoiComponent;
}());
DataRoiComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'modal-content',
        template: __webpack_require__("../../../../../src/app/data-roi/data-roi.component.html"),
        styles: [__webpack_require__("../../../../../src/app/data-roi/data-roi.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__pi_service__["a" /* PiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__pi_service__["a" /* PiService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__app_constants__["a" /* AppConstants */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__app_constants__["a" /* AppConstants */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__config_service__["a" /* ConfigService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__config_service__["a" /* ConfigService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__data_service__["a" /* DataService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__data_service__["a" /* DataService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5_ngx_bootstrap_modal_modal_options_class__["f" /* BsModalRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5_ngx_bootstrap_modal_modal_options_class__["f" /* BsModalRef */]) === "function" && _e || Object])
], DataRoiComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=data-roi.component.js.map

/***/ }),

/***/ "../../../../../src/app/data.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__socket_service__ = __webpack_require__("../../../../../src/app/socket.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config_service__ = __webpack_require__("../../../../../src/app/config.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pi_service__ = __webpack_require__("../../../../../src/app/pi.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_BehaviorSubject__ = __webpack_require__("../../../../rxjs/BehaviorSubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_BehaviorSubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment__ = __webpack_require__("../../../../moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_moment__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var DataService = (function () {
    function DataService(socketService, configService, piService) {
        var _this = this;
        this.socketService = socketService;
        this.configService = configService;
        this.piService = piService;
        this._dataPoints = [];
        this._cumulativeTotal = 0;
        this.isCumulative = false;
        this.data = [];
        this.skipPointUpdates = false;
        this.reprocessing = false;
        this.queueSummary = new __WEBPACK_IMPORTED_MODULE_4_rxjs_BehaviorSubject__["BehaviorSubject"](null);
        this.dataPoints = new __WEBPACK_IMPORTED_MODULE_4_rxjs_BehaviorSubject__["BehaviorSubject"]([]);
        this.newDataPoints = new __WEBPACK_IMPORTED_MODULE_4_rxjs_BehaviorSubject__["BehaviorSubject"]([]);
        this.dbConnected = new __WEBPACK_IMPORTED_MODULE_4_rxjs_BehaviorSubject__["BehaviorSubject"](false);
        this.gettingLatestData = false;
        this.setupSocketEvents();
        configService.configLoaded.subscribe(function (loaded) {
            if (loaded == true) {
                socketService.socket.emit('data:db:connect');
            }
        });
        piService.processing.subscribe(function (processing) {
            if (processing == true && _this.reprocessing == false) {
                _this.getLatestData();
            }
        });
        piService.reprocessing.subscribe(function (reprocessing) {
            console.log("Data service: reprocessing", reprocessing);
            if (_this.reprocessing == true && reprocessing == false) {
                console.log("Processing is finished - reloading data");
                _this.reloadData();
            }
            else {
                console.log("Data service: setting reprocessing:", reprocessing);
                _this.reprocessing = reprocessing;
            }
        });
    }
    DataService.prototype.setupSocketEvents = function () {
        var _this = this;
        this.socketService.socket.on('capture:db', function (data) {
            _this.socketService.socket.emit("data:db:connect");
        });
        this.socketService.socket.on('data:db:connected', function (data) {
            _this.dbConnected.next(true);
            _this.reloadData();
        });
        this.socketService.socket.on('data:db:data:all', function (data) {
            _this.data = data;
            _this._cumulativeTotal = 0;
            _this.loadData(data);
        });
        this.socketService.socket.on('data:db:missing', function () {
            _this.dbConnected.next(false);
        });
        this.socketService.socket.on('data:updated', function (dataItem) {
            _this.setDataItemUpdated(dataItem);
            console.log("Data item updated", dataItem);
        });
        this.socketService.socket.on('data:queue:summary', function (summary) {
            _this.queueSummary.next(summary);
        });
        this.socketService.socket.on('data:db:data:latest', function (data) {
            if (data.length) {
                _this.data = _this.data.concat(data);
                _this.loadData(data, true);
            }
        });
    };
    DataService.prototype.getQueueSummary = function () {
        this.socketService.socket.emit('data:get:queue:summary');
    };
    DataService.prototype.exportData = function () {
        this.socketService.socket.emit("data:export");
    };
    DataService.prototype.resetData = function () {
        console.log("Resetting data");
        this._cumulativeTotal = 0;
        this.data = [];
        this.dataPoints.next([]);
        this.newDataPoints.next([]);
    };
    DataService.prototype.setDataItemUpdated = function (dataItem) {
        this.data = this.data.map(function (item) {
            if (item.id == dataItem.id) {
                item.area = parseInt(dataItem.area);
                // console.log("UPdated item", item);
            }
            return item;
        });
        this.loadData(this.data);
    };
    DataService.prototype.getLatestData = function () {
        var _this = this;
        console.log("Getting latest data");
        if (this.piService.processing.getValue() == true) {
            if (this.data.length) {
                var lastId = this.data[this.data.length - 1].id;
                this.socketService.socket.emit("data:get:latest", lastId);
            }
            else {
                this.socketService.socket.emit("data:get:all");
            }
            setTimeout(function () { _this.getLatestData(); }, 2000);
        }
        else {
            this.gettingLatestData = false;
        }
    };
    DataService.prototype.loadData = function (data, newData) {
        if (newData === void 0) { newData = false; }
        this._dataPoints = [];
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var item = data_1[_i];
            this._dataPoints.push(this.createDataPoint(item));
        }
        if (this.skipPointUpdates) {
            return;
        }
        if (newData) {
            this.newDataPoints.next(this._dataPoints);
        }
        else {
            this.dataPoints.next(this._dataPoints);
        }
    };
    DataService.prototype.updateData = function (dataItem) {
        console.log("Updating dataitem", dataItem);
        this.socketService.socket.emit("data:update", dataItem);
    };
    DataService.prototype.deleteData = function (dataItem) {
        console.log("Deleting dataitem", dataItem);
        this.socketService.socket.emit("data:delete", dataItem);
    };
    DataService.prototype.reloadData = function () {
        this.socketService.socket.emit("data:reload");
    };
    DataService.prototype.toggleCumulativeData = function () {
        this.skipPointUpdates = true;
        this._cumulativeTotal = 0;
        this.isCumulative = !this.isCumulative;
        this.loadData(this.data);
        this.dataPoints.next(this._dataPoints);
        this.skipPointUpdates = false;
    };
    DataService.prototype.createDataPoint = function (dataItem) {
        if (this.isCumulative) {
            this._cumulativeTotal += dataItem.area;
        }
        console.log("Cumulative total", this._cumulativeTotal);
        var point = {
            t: __WEBPACK_IMPORTED_MODULE_5_moment__(dataItem.timestamp, "YYYYMMDD-HHmmss").valueOf(),
            label: __WEBPACK_IMPORTED_MODULE_5_moment__(dataItem.timestamp, "YYYYMMDD-HHmmss"),
            x: __WEBPACK_IMPORTED_MODULE_5_moment__(dataItem.timestamp, "YYYYMMDD-HHmmss").format('MM/DD/YYYY HH:mm:ss'),
            y: this.isCumulative ? this._cumulativeTotal : dataItem.area
        };
        return point;
    };
    return DataService;
}());
DataService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__socket_service__["a" /* SocketService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__socket_service__["a" /* SocketService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__config_service__["a" /* ConfigService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__config_service__["a" /* ConfigService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__pi_service__["a" /* PiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__pi_service__["a" /* PiService */]) === "function" && _c || Object])
], DataService);

var _a, _b, _c;
//# sourceMappingURL=data.service.js.map

/***/ }),

/***/ "../../../../../src/app/data/_components/data-plot/data-plot.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".chart-container {\n  position: relative;\n  width: 100%;\n  height: 40vw; }\n\n.btn-cumulative {\n  position: absolute;\n  top: 15px;\n  left: 85px;\n  z-index: 500; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/data/_components/data-plot/data-plot.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_chart_js__ = __webpack_require__("../../../../chart.js/src/chart.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_chart_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_chart_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_service__ = __webpack_require__("../../../../../src/app/data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__ = __webpack_require__("../../../../rxjs/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_takeUntil__ = __webpack_require__("../../../../rxjs/add/operator/takeUntil.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_takeUntil___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_takeUntil__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_takeWhile__ = __webpack_require__("../../../../rxjs/add/operator/takeWhile.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_takeWhile___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_takeWhile__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_filter__ = __webpack_require__("../../../../rxjs/add/operator/filter.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_filter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ngx_bootstrap_modal__ = __webpack_require__("../../../../ngx-bootstrap/modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__point_editor_point_editor_component__ = __webpack_require__("../../../../../src/app/point-editor/point-editor.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataPlotComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var DataPlotComponent = (function () {
    function DataPlotComponent(dataService, modalService) {
        this.dataService = dataService;
        this.modalService = modalService;
        this.cumulativeTotal = 0;
        this.componentDestroyed = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"]();
        this.isCumulative = false;
        this.chartDataSet = {
            datasets: [{
                    label: 'Dataset',
                    lineTension: 0,
                    borderColor: '#ff6384',
                    borderWidth: 1,
                    backgroundColor: '#ff6384',
                    // backgroundColor: 'rgba(0, 0, 0, 0)',
                    fill: false,
                    data: []
                }]
        };
    }
    DataPlotComponent.prototype.ngOnDestroy = function () {
        this.componentDestroyed.next(true);
        this.componentDestroyed.complete();
        this.reloadData.unsubscribe();
    };
    DataPlotComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isCumulative = this.dataService.isCumulative;
        this.dataService.dataPoints
            .asObservable()
            .takeUntil(this.componentDestroyed.asObservable())
            .subscribe(function (dataPoints) {
            console.log("Bulk data points update", dataPoints);
            if (!_this.chart) {
                _this.initChart(dataPoints);
            }
            _this.chart.data.datasets[0].data = dataPoints;
            _this.chart.update();
        });
        this.dataService.newDataPoints
            .asObservable()
            .takeUntil(this.componentDestroyed.asObservable())
            .subscribe(function (dataPoints) {
            console.log("New data points update", dataPoints);
            if (!_this.chart) {
                _this.initChart(dataPoints);
            }
            console.log("data before", _this.chart.data.datasets[0].data);
            for (var _i = 0, dataPoints_1 = dataPoints; _i < dataPoints_1.length; _i++) {
                var point = dataPoints_1[_i];
                _this.chart.data.datasets[0].data.push(point);
            }
            console.log("data after", _this.chart.data.datasets[0].data);
            _this.chart.update();
        });
        this.reloadData.subscribe(function (event) {
            console.log("Reload event!!");
            _this.dataService.reloadData();
        });
    };
    DataPlotComponent.prototype.toggleCumulative = function () {
        var _this = this;
        this.dataService.toggleCumulativeData();
        if (this.dataService.isCumulative) {
            this.chart.config.type = "line";
            // this.chart.config.data.datasets[0].type = type;
        }
        else {
            this.chart.config.type = "bar";
            // this.chart.type = "scatter"
        }
        setTimeout(function () {
            _this.chart.update();
        });
    };
    DataPlotComponent.prototype.clickChart = function (event) {
        console.log("Chart click event");
        var item = this.chart.getElementAtEvent(event)[0];
        if (item) {
            this.editDataItemAtIndex(item._index);
        }
    };
    DataPlotComponent.prototype.touchChart = function (event) {
        console.log("Chart touch event");
        var item = this.chart.getElementAtEvent(event)[0];
        if (item) {
            this.editDataItemAtIndex(item._index);
        }
    };
    DataPlotComponent.prototype.editDataItemAtIndex = function (index) {
        this.pointEditorModalRef = this.modalService.show(__WEBPACK_IMPORTED_MODULE_8__point_editor_point_editor_component__["a" /* PointEditorComponent */], { class: 'modal-lg', ignoreBackdropClick: true });
        this.pointEditorModalRef.content.dataItemIndex = index;
    };
    DataPlotComponent.prototype.initChart = function (dataPoints) {
        __WEBPACK_IMPORTED_MODULE_1_chart_js___default.a.defaults.global.legend = false;
        // Chart.defaults.bar.barPercentage = 0.1
        // Chart.defaults.bar.categoryPercentage = 0.1
        __WEBPACK_IMPORTED_MODULE_1_chart_js___default.a.defaults.bar.maxBarThickness = 0.1;
        // Chart.defaults.bar.barThickness = 0.2
        this.chartDataSet.datasets[0].data = dataPoints;
        this.chart = new __WEBPACK_IMPORTED_MODULE_1_chart_js___default.a('dataPlot', {
            type: 'bar',
            data: this.chartDataSet,
            options: {
                maintainAspectRatio: false,
                events: ['click'],
                // animation: {
                //   duration: 0
                // },
                scales: {
                    xAxes: [{
                            type: "time",
                            display: true,
                            scaleLabel: {
                                display: false,
                                labelString: 'Date'
                            }
                        }],
                    yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                }
            }
        });
    };
    return DataPlotComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_17" /* ViewChild */])('dataPlot'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* ElementRef */]) === "function" && _a || Object)
], DataPlotComponent.prototype, "dataPlot", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Input */])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"]) === "function" && _b || Object)
], DataPlotComponent.prototype, "reloadData", void 0);
DataPlotComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'data-plot',
        template: "\n    <div class=\"chart-container\">\n      <canvas #dataPlot id=\"dataPlot\" (click)=\"clickChart($event)\" (touchstart)=\"touchChart($event)\"></canvas>\n      <button type=\"button\" class=\"btn btn-sm btn-cumulative\" [ngClass]=\"{'btn-primary': dataService.isCumulative, 'btn-secondary': !dataService.isCumulative}\" (click)=\"toggleCumulative()\">Cumulative</button>\n    </div>\n  ",
        styles: [__webpack_require__("../../../../../src/app/data/_components/data-plot/data-plot.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__data_service__["a" /* DataService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__data_service__["a" /* DataService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_7_ngx_bootstrap_modal__["b" /* BsModalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7_ngx_bootstrap_modal__["b" /* BsModalService */]) === "function" && _d || Object])
], DataPlotComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=data-plot.component.js.map

/***/ }),

/***/ "../../../../../src/app/data/_components/roi-selector/roi-selector.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_service__ = __webpack_require__("../../../../../src/app/data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pi_service__ = __webpack_require__("../../../../../src/app/pi.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__socket_service__ = __webpack_require__("../../../../../src/app/socket.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__ = __webpack_require__("../../../../rxjs/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_takeUntil__ = __webpack_require__("../../../../rxjs/add/operator/takeUntil.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_takeUntil___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_takeUntil__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_roi__ = __webpack_require__("../../../../../src/app/models/roi.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_roi___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__models_roi__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RoiSelectorComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var RoiSelectorComponent = (function () {
    function RoiSelectorComponent(dataService, piService, socketService) {
        this.dataService = dataService;
        this.piService = piService;
        this.socketService = socketService;
        this.roiChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */]();
        this.marq = {
            top: 0,
            left: 0,
            height: 0,
            width: 0,
            hRelImageHeight: 0,
            wRelImageWidth: 0,
            topRelImageHeight: 0,
            leftRelImageWidth: 0
        };
        this.cursorType = "crosshair";
        this.componentDestroyed = new __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__["Subject"]();
        this.mouseDown = false;
        this.touching = false;
        this.touchDisabled = false;
    }
    RoiSelectorComponent.prototype.ngOnInit = function () {
    };
    RoiSelectorComponent.prototype.doImageLoaded = function (event) {
        if (this.roi) {
            console.log("Image loaded with roi", this.roi);
            this.marq.hRelImageHeight = this.roi.hRelImageHeight;
            this.marq.wRelImageWidth = this.roi.wRelImageWidth;
            this.marq.topRelImageHeight = this.roi.topRelImageHeight;
            this.marq.leftRelImageWidth = this.roi.leftRelImageWidth;
            this.getContainerDimensions();
            this.updateMarqueePosition();
        }
    };
    RoiSelectorComponent.prototype.onResize = function (event) {
        this.getContainerDimensions();
        this.updateMarqueePosition();
    };
    RoiSelectorComponent.prototype.getMouseRelPos = function (event) {
        var containerXPos = this.containerDimensions.left;
        var containerYPos = this.containerDimensions.top;
        var mouseYPos = event.clientY;
        var mouseXPos = event.clientX;
        return {
            yRelHeight: (mouseYPos - containerYPos) / this.containerDimensions.height,
            xRelWidth: (mouseXPos - containerXPos) / this.containerDimensions.width
        };
    };
    RoiSelectorComponent.prototype.getContainerDimensions = function () {
        this.containerDimensions = this.container.nativeElement.getBoundingClientRect();
    };
    RoiSelectorComponent.prototype.doMouseDown = function (event) {
        if (this.touchDisabled == true || this.touching == true) {
            event.preventDefault();
            return;
        }
        this.mouseDown = true;
        this.getContainerDimensions();
        var pos = this.getMouseRelPos(event);
        this.marq.hRelImageHeight = 0;
        this.marq.wRelImageWidth = 0;
        this.marq.topRelImageHeight = pos.yRelHeight;
        this.marq.leftRelImageWidth = pos.xRelWidth;
        this.updateMarqueePosition();
    };
    RoiSelectorComponent.prototype.doMouseMove = function (event) {
        if (this.touchDisabled == true || this.touching == true) {
            event.preventDefault();
            return;
        }
        if (this.mouseDown == true) {
            this.getContainerDimensions();
            var pos = this.getMouseRelPos(event);
            this.marq.hRelImageHeight = ((pos.yRelHeight * this.containerDimensions.height) - this.marq.top) / this.containerDimensions.height;
            this.marq.wRelImageWidth = ((pos.xRelWidth * this.containerDimensions.width) - this.marq.left) / this.containerDimensions.width;
            this.updateMarqueePosition();
        }
    };
    RoiSelectorComponent.prototype.doMouseUp = function (event) {
        if (this.touchDisabled == true || this.touching == true) {
            event.preventDefault();
            return;
        }
        this.mouseDown = false;
        this.roiChange.emit({
            hRelImageHeight: this.marq.hRelImageHeight,
            wRelImageWidth: this.marq.wRelImageWidth,
            topRelImageHeight: this.marq.topRelImageHeight,
            leftRelImageWidth: this.marq.leftRelImageWidth
        });
    };
    RoiSelectorComponent.prototype.getTouchRelPos = function (event) {
        var containerXPos = this.containerDimensions.left;
        var containerYPos = this.containerDimensions.top;
        var touch = event.touches[0];
        var touchYPos = touch.clientY;
        var touchXPos = touch.clientX;
        return {
            yRelHeight: (touchYPos - containerYPos) / this.containerDimensions.height,
            xRelWidth: (touchXPos - containerXPos) / this.containerDimensions.width
        };
    };
    RoiSelectorComponent.prototype.doTouchStart = function (event) {
        var _this = this;
        if (this.touchDisabled == true) {
            event.preventDefault();
            return;
        }
        this.touchDisabled = true;
        setTimeout(function () { return _this.touchDisabled = false; }, 800);
        this.getContainerDimensions();
        if (this.touching == true) {
            var pos = this.getTouchRelPos(event);
            this.marq.hRelImageHeight = ((pos.yRelHeight * this.containerDimensions.height) - this.marq.top) / this.containerDimensions.height;
            this.marq.wRelImageWidth = ((pos.xRelWidth * this.containerDimensions.width) - this.marq.left) / this.containerDimensions.width;
            this.updateMarqueePosition();
            this.roiChange.emit({
                hRelImageHeight: this.marq.hRelImageHeight,
                wRelImageWidth: this.marq.wRelImageWidth,
                topRelImageHeight: this.marq.topRelImageHeight,
                leftRelImageWidth: this.marq.leftRelImageWidth
            });
            this.touching = false;
        }
        else {
            this.touching = true;
            var pos = this.getTouchRelPos(event);
            this.marq.hRelImageHeight = 0;
            this.marq.wRelImageWidth = 0;
            this.marq.topRelImageHeight = pos.yRelHeight;
            this.marq.leftRelImageWidth = pos.xRelWidth;
            this.updateMarqueePosition();
        }
    };
    // doTouchMove(event) {
    //   if(this.touching == true) {
    //     this.getContainerDimensions();
    //     let pos = this.getTouchRelPos(event);
    //     this.marq.hRelImageHeight = ((pos.yRelHeight * this.containerDimensions.height) - this.marq.top) / this.containerDimensions.height;
    //     this.marq.wRelImageWidth = ((pos.xRelWidth * this.containerDimensions.width) - this.marq.left) / this.containerDimensions.width;
    //     this.updateMarqueePosition();
    //   }
    // }
    // doTouchEnd(event) {
    //   this.touching = false;
    //   this.roiChange.emit(<ROI>{
    //     hRelImageHeight: this.marq.hRelImageHeight,
    //     wRelImageWidth: this.marq.wRelImageWidth,
    //     topRelImageHeight: this.marq.topRelImageHeight,
    //     leftRelImageWidth: this.marq.leftRelImageWidth
    //   });
    // }
    RoiSelectorComponent.prototype.updateMarqueePosition = function () {
        this.containerDimensions = this.container.nativeElement.getBoundingClientRect();
        this.marq.height = this.marq.hRelImageHeight * this.containerDimensions.height;
        this.marq.width = this.marq.wRelImageWidth * this.containerDimensions.width;
        this.marq.left = this.marq.leftRelImageWidth * this.containerDimensions.width;
        this.marq.top = this.marq.topRelImageHeight * this.containerDimensions.height;
    };
    RoiSelectorComponent.prototype.ngOnDestroy = function () {
        this.componentDestroyed.next(true);
        this.componentDestroyed.complete();
    };
    return RoiSelectorComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_17" /* ViewChild */])('container'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* ElementRef */]) === "function" && _a || Object)
], RoiSelectorComponent.prototype, "container", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Output */])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* EventEmitter */]) === "function" && _b || Object)
], RoiSelectorComponent.prototype, "roiChange", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Input */])(),
    __metadata("design:type", typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_6__models_roi__["ROI"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__models_roi__["ROI"]) === "function" && _c || Object)
], RoiSelectorComponent.prototype, "roi", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Input */])(),
    __metadata("design:type", String)
], RoiSelectorComponent.prototype, "imagePreviewSrc", void 0);
RoiSelectorComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'roi-selector',
        template: "\n    <div #container class=\"roi-container clearfix\"\n      [style.cursor]=\"cursorType\"\n      (mousemove)=\"doMouseMove($event)\"\n      (mousedown)=\"doMouseDown($event)\"\n      (touchstart)=\"doTouchStart($event)\"\n      (mouseup)=\"doMouseUp($event)\"\n      (window:resize)=\"onResize($event)\">\n      <img \n        (load)=\"doImageLoaded($event)\" \n        [src]=\"imagePreviewSrc\" \n        class=\"img-fluid\" \n        *ngIf=\"imagePreviewSrc\" />\n      <div \n        #marquee \n        [style.top]=\"marq.top + 'px'\" \n        [style.left]=\"marq.left + 'px'\"\n        [style.width]=\"marq.width + 'px'\"\n        [style.height]=\"marq.height + 'px'\"\n        class=\"marquee\"></div>\n    </div>\n  ",
        styles: ["\n    img {\n      -webkit-user-drag: none;\n    }\n    .btn { \n      position: absolute; top: -46px; right: 0px;\n      z-index: 100;\n    }\n    .roi-container {\n      position: relative;\n      float: left;\n    }\n    .marquee {\n      position: absolute;\n      border: 2px solid lime;\n      z-index: 98;\n    }\n  "]
    }),
    __metadata("design:paramtypes", [typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__data_service__["a" /* DataService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__data_service__["a" /* DataService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2__pi_service__["a" /* PiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__pi_service__["a" /* PiService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_3__socket_service__["a" /* SocketService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__socket_service__["a" /* SocketService */]) === "function" && _f || Object])
], RoiSelectorComponent);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=roi-selector.component.js.map

/***/ }),

/***/ "../../../../../src/app/data/data.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"col\">\n    <data-plot [reloadData]=\"reloadData\"></data-plot>\n  </div>\n</div>\n<div class=\"row mt-1\" *ngIf=\"queueSummary\">\n  <div class=\"col\">\n    <hr />\n    <progressbar [max]=\"queueSummary.total\" [value]=\"queueSummary.processed\">\n      <span style=\"color:white; white-space:nowrap;\"></span>\n    </progressbar>\n    <small>Processed {{queueSummary.processed}} / {{queueSummary.total}}</small>\n  </div>\n</div>    \n<div class=\"row\">\n  <div class=\"col\">\n    <hr />\n    <form>\n      <div class=\"form-row align-items-center\">\n        <div class=\"col-auto\"><button type=\"button\" class=\"btn btn-primary\" [ngClass]=\"{'btn-primary': ROIActive, 'btn-secondary': !ROIActive}\" (click)=\"showROI()\"><i class=\"fa fa-crop\" aria-hidden=\"true\"></i> Set ROI</button></div>\n        <div class=\"col-auto\"><button type=\"button\" class=\"btn btn-secondary\" (click)=\"reload()\" *ngIf=\"!ROIActive\">Reload Data</button></div>\n        <label class=\"col-auto col-form-label\" *ngIf=\"config.process.filtering_enabled == 'On'\">Filter Threshold</label>\n        <div class=\"col-auto\" *ngIf=\"config.process.filtering_enabled == 'On'\"><input type=\"number\" name=\"filterThreshold\" placeholder=\"7\" class=\"form-control\" [(ngModel)]=\"config.process.filter_threshold\"></div>\n        <div class=\"col-auto\" *ngIf=\"config.process.filtering_enabled == 'On'\">\n          <div class=\"btn-group\">\n            <button type=\"button\" class=\"btn btn-secondary\" (click)=\"config.process.filter_threshold = config.process.filter_threshold - 1\"><i class=\"fa fa-minus\" aria-hidden=\"true\"></i></button>\n            <button type=\"button\" class=\"btn btn-secondary\" (click)=\"config.process.filter_threshold = config.process.filter_threshold + 1\"><i class=\"fa fa-plus\" aria-hidden=\"true\"></i></button>\n          </div>\n        </div>\n        <div class=\"col-auto\"><button type=\"button\" class=\"btn btn-secondary\" (click)=\"reprocess()\"><i class=\"fa fa-repeat\" aria-hidden=\"true\"></i> Reprocess</button></div>\n        <div class=\"col-auto\"><button type=\"button\" class=\"btn btn-secondary\" (click)=\"showLog()\"><i class=\"fa fa-file-text-o\" aria-hidden=\"true\"></i> View Log</button></div>\n      </div>\n    </form>\n  </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/data/data.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/data/data.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__("../../../../rxjs/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_takeUntil__ = __webpack_require__("../../../../rxjs/add/operator/takeUntil.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_takeUntil___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_takeUntil__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config_service__ = __webpack_require__("../../../../../src/app/config.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__data_service__ = __webpack_require__("../../../../../src/app/data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pi_service__ = __webpack_require__("../../../../../src/app/pi.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__socket_service__ = __webpack_require__("../../../../../src/app/socket.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__data_roi_data_roi_component__ = __webpack_require__("../../../../../src/app/data-roi/data-roi.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ngx_bootstrap_modal__ = __webpack_require__("../../../../ngx-bootstrap/modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__process_log_process_log_component__ = __webpack_require__("../../../../../src/app/process-log/process-log.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var DataComponent = (function () {
    function DataComponent(configService, dataService, piService, socketService, modalService) {
        this.configService = configService;
        this.dataService = dataService;
        this.piService = piService;
        this.socketService = socketService;
        this.modalService = modalService;
        this.reloadData = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        this.componentDestroyed = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
        this.imagePreviewSrc = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
    }
    DataComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.configService.config.takeUntil(this.componentDestroyed.asObservable()).subscribe(function (config) {
            if (config) {
                _this.config = Object.assign({}, config);
            }
        });
        this.dataService.queueSummary.takeUntil(this.componentDestroyed.asObservable()).subscribe(function (summary) {
            console.log("Updating summary");
            _this.queueSummary = summary;
            setTimeout(function () {
                _this.dataService.getQueueSummary();
            }, 2000);
        });
    };
    DataComponent.prototype.reprocess = function () {
        console.log("Starting reprocessing");
        this.configService.updateConfig(this.config);
        this.piService.startReprocessing();
        this.showLog();
    };
    DataComponent.prototype.ngOnDestroy = function () {
        this.componentDestroyed.next(true);
        this.componentDestroyed.complete();
    };
    DataComponent.prototype.reload = function () {
        this.reloadData.next(true);
    };
    DataComponent.prototype.showLog = function () {
        this.logModalRef = this.modalService.show(__WEBPACK_IMPORTED_MODULE_9__process_log_process_log_component__["a" /* ProcessLogComponent */], { class: 'modal-lg' });
    };
    DataComponent.prototype.showROI = function () {
        this.roiModalRef = this.modalService.show(__WEBPACK_IMPORTED_MODULE_7__data_roi_data_roi_component__["a" /* DataRoiComponent */], { class: 'modal-lg' });
    };
    return DataComponent;
}());
DataComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-data',
        template: __webpack_require__("../../../../../src/app/data/data.component.html"),
        styles: [__webpack_require__("../../../../../src/app/data/data.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__config_service__["a" /* ConfigService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__config_service__["a" /* ConfigService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__data_service__["a" /* DataService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__data_service__["a" /* DataService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__pi_service__["a" /* PiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__pi_service__["a" /* PiService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_6__socket_service__["a" /* SocketService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__socket_service__["a" /* SocketService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_8_ngx_bootstrap_modal__["b" /* BsModalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8_ngx_bootstrap_modal__["b" /* BsModalService */]) === "function" && _e || Object])
], DataComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=data.component.js.map

/***/ }),

/***/ "../../../../../src/app/live/live.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"modal-header\">\n  <button type=\"button\" class=\"btn\" [ngClass]=\"{'btn-primary':!streaming, 'btn-danger':streaming}\" (click)=\"toggleStreaming()\">{{streaming ? 'Stop' : 'Start Streaming'}}</button>\n  <div>\n    <button type=\"button\" class=\"btn\" [ngClass]=\"{'btn-secondary': !light, 'btn-primary': light}\" (click)=\"piService.toggleLight()\">Light <i class=\"fa fa-lightbulb-o\" aria-hidden=\"true\"></i></button>  \n    <button type=\"button\" class=\"btn btn-secondary\" (click)=\"bsModalRef.hide()\">Close</button>\n  </div>\n</div>\n<div class=\"modal-body\">\n  <div id=\"cameraPreview\">\n    <img *ngIf=\"streaming\" [src]=\"streamingURL\" class=\"rounded mx-auto d-block stream img-fluid\" />\n  </div>  \n</div>\n"

/***/ }),

/***/ "../../../../../src/app/live/live.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#cameraPreview {\n  width: 640px;\n  height: 480px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/live/live.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pi_service__ = __webpack_require__("../../../../../src/app/pi.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ngx_bootstrap_modal_modal_options_class__ = __webpack_require__("../../../../ngx-bootstrap/modal/modal-options.class.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_constants__ = __webpack_require__("../../../../../src/app/app.constants.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__ = __webpack_require__("../../../../rxjs/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_takeUntil__ = __webpack_require__("../../../../rxjs/add/operator/takeUntil.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_takeUntil___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_takeUntil__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LiveComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var LiveComponent = (function () {
    function LiveComponent(piService, bsModalRef, appConstants) {
        var _this = this;
        this.piService = piService;
        this.bsModalRef = bsModalRef;
        this.appConstants = appConstants;
        this.streaming = false;
        this.light = false;
        this.componentDestroyed = new __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__["Subject"]();
        this.streamingURL = this.appConstants.previewURL + "/?action=stream";
        this.piService.streamingPreview.takeUntil(this.componentDestroyed.asObservable()).subscribe(function (streaming) {
            _this.streaming = streaming;
        });
        piService.light.takeUntil(this.componentDestroyed.asObservable()).subscribe(function (light) {
            _this.light = light;
        });
    }
    LiveComponent.prototype.ngOnInit = function () {
    };
    LiveComponent.prototype.toggleStreaming = function () {
        this.piService.togglePreviewStreaming();
    };
    LiveComponent.prototype.ngOnDestroy = function () {
        this.componentDestroyed.next(true);
        this.componentDestroyed.complete();
    };
    return LiveComponent;
}());
LiveComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'modal-content',
        template: __webpack_require__("../../../../../src/app/live/live.component.html"),
        styles: [__webpack_require__("../../../../../src/app/live/live.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__pi_service__["a" /* PiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__pi_service__["a" /* PiService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_ngx_bootstrap_modal_modal_options_class__["f" /* BsModalRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ngx_bootstrap_modal_modal_options_class__["f" /* BsModalRef */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__app_constants__["a" /* AppConstants */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__app_constants__["a" /* AppConstants */]) === "function" && _c || Object])
], LiveComponent);

var _a, _b, _c;
//# sourceMappingURL=live.component.js.map

/***/ }),

/***/ "../../../../../src/app/log.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__socket_service__ = __webpack_require__("../../../../../src/app/socket.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config_service__ = __webpack_require__("../../../../../src/app/config.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pi_service__ = __webpack_require__("../../../../../src/app/pi.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_BehaviorSubject__ = __webpack_require__("../../../../rxjs/BehaviorSubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_BehaviorSubject__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LogService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var LogService = (function () {
    function LogService(socketService, configService, piService) {
        this.socketService = socketService;
        this.configService = configService;
        this.piService = piService;
        this.captureLog = new __WEBPACK_IMPORTED_MODULE_4_rxjs_BehaviorSubject__["BehaviorSubject"]([]);
        this._captureLog = [];
        this.processLog = new __WEBPACK_IMPORTED_MODULE_4_rxjs_BehaviorSubject__["BehaviorSubject"]([]);
        this._processLog = [];
        this.setupSocketEvents();
    }
    LogService.prototype.setupSocketEvents = function () {
        var _this = this;
        this.socketService.socket.on('process:info', function (data) {
            _this.addProcessEntry({ type: 'info', value: data });
        });
        this.socketService.socket.on('process:error', function (data) {
            _this.addProcessEntry({ type: 'error', value: data });
        });
        this.socketService.socket.on('capture:info', function (data) {
            _this.addCaptureEntry({ type: 'info', value: data });
        });
        this.socketService.socket.on('capture:error', function (data) {
            _this.addCaptureEntry({ type: 'error', value: data });
        });
    };
    LogService.prototype.addCaptureEntry = function (entry) {
        this._captureLog.push(entry);
        if (this._captureLog.length > 100) {
            this._captureLog.shift();
        }
        this.captureLog.next(this._captureLog);
    };
    LogService.prototype.addProcessEntry = function (entry) {
        this._processLog.push(entry);
        if (this._processLog.length > 100) {
            this._processLog.shift();
        }
        this.processLog.next(this._processLog);
    };
    return LogService;
}());
LogService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__socket_service__["a" /* SocketService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__socket_service__["a" /* SocketService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__config_service__["a" /* ConfigService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__config_service__["a" /* ConfigService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__pi_service__["a" /* PiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__pi_service__["a" /* PiService */]) === "function" && _c || Object])
], LogService);

var _a, _b, _c;
//# sourceMappingURL=log.service.js.map

/***/ }),

/***/ "../../../../../src/app/models/roi.ts":
/***/ (function(module, exports) {

//# sourceMappingURL=roi.js.map

/***/ }),

/***/ "../../../../../src/app/pi.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__socket_service__ = __webpack_require__("../../../../../src/app/socket.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config_service__ = __webpack_require__("../../../../../src/app/config.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__ = __webpack_require__("../../../../rxjs/BehaviorSubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PiService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PiService = (function () {
    function PiService(socketService, configService) {
        var _this = this;
        this.socketService = socketService;
        this.configService = configService;
        this.light = new __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__["BehaviorSubject"](false);
        this.capturing = new __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__["BehaviorSubject"](null);
        this.processing = new __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__["BehaviorSubject"](null);
        this.reprocessing = new __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__["BehaviorSubject"](false);
        this.streamingPreview = new __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__["BehaviorSubject"](null);
        this.latestCapturedImages = new __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__["BehaviorSubject"]([]);
        this.storageList = new __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__["BehaviorSubject"](null);
        this.setupSocketEvents();
        configService.configLoaded.subscribe(function (loaded) {
            if (loaded === true) {
                // this.getLightStatus();
                _this.getStorageList();
                _this.getCaptureStatus();
                _this.getProcessingStatus();
                _this.getPreviewStatus();
            }
        });
    }
    PiService.prototype.setupSocketEvents = function () {
        var _this = this;
        this.socketService.socket.on('pi:lightStatus', function (status) {
            _this.light.next(status);
        });
        this.socketService.socket.on('storage:list', function (list) {
            _this.storageList.next(list);
            _this.checkConfigStorage();
        });
        this.socketService.socket.on('capture:started', function () {
            _this.capturing.next(true);
        });
        this.socketService.socket.on('capture:finished', function () {
            _this.capturing.next(false);
        });
        this.socketService.socket.on('process:started', function () {
            _this.processing.next(true);
        });
        this.socketService.socket.on('reprocessing:started', function () {
            _this.reprocessing.next(true);
        });
        this.socketService.socket.on('process:finished', function () {
            _this.processing.next(false);
            if (_this.reprocessing.getValue() == true) {
                _this.reprocessing.next(false);
            }
        });
        this.socketService.socket.on('capture:status', function (status) {
            _this.capturing.next(status);
        });
        this.socketService.socket.on('process:status', function (status) {
            _this.processing.next(status);
        });
        this.socketService.socket.on('camera:previewStatus', function (status) {
            _this.streamingPreview.next(status);
        });
        this.socketService.socket.on('capture:latestImages', function (images) {
            _this.latestCapturedImages.next(JSON.parse(images));
        });
        this.socketService.socket.on('config:unloaded', function () {
            _this.getStorageList();
        });
        this.socketService.socket.on('storage:unmounted', function () {
            console.log("Storage unmounted");
            _this.getStorageList();
        });
    };
    PiService.prototype.checkConfigStorage = function () {
        var config = this.configService.config.getValue();
        if (!this.storageList.getValue().find(function (item) { return item == config.capture.external_storage; })) {
            config.capture.external_storage = "";
            config.capture.output_dir = "";
            this.configService.config.next(config);
        }
    };
    PiService.prototype.unmountStorage = function (device) {
        this.socketService.socket.emit('storage:unmount', device);
    };
    PiService.prototype.getStorageList = function () {
        this.socketService.socket.emit('storage:list');
    };
    PiService.prototype.getLightStatus = function () {
        this.socketService.socket.emit('pi:readLightStatus');
    };
    PiService.prototype.getPreviewStatus = function () {
        this.socketService.socket.emit('camera:getPreviewStatus');
    };
    PiService.prototype.getCaptureStatus = function () {
        this.socketService.socket.emit('capture:status');
    };
    PiService.prototype.getProcessingStatus = function () {
        this.socketService.socket.emit('process:status');
    };
    PiService.prototype.toggleLight = function () {
        if (this.socketService.connected.getValue() === false)
            return;
        if (this.light.getValue() === null)
            return;
        this.socketService.socket.emit('pi:light', !this.light.getValue());
    };
    PiService.prototype.lightOff = function () {
        this.socketService.socket.emit('pi:light', false);
    };
    PiService.prototype.restartPi = function () {
        if (this.socketService.connected.getValue() === false)
            return;
        this.socketService.socket.emit('pi:restart');
    };
    PiService.prototype.shutdownPi = function () {
        if (this.socketService.connected.getValue() === false)
            return;
        this.socketService.socket.emit('pi:shutdown');
    };
    PiService.prototype.generatePreview = function () {
        this.socketService.socket.emit('crop:generatePreview');
    };
    PiService.prototype.stopPreview = function () {
        this.socketService.socket.emit('camera:stopPreview');
    };
    PiService.prototype.startCapture = function () {
        var _this = this;
        if (this.capturing.getValue() !== true) {
            this.stopPreview();
            this.lightOff();
            setTimeout(function () {
                _this.socketService.socket.emit('capture:start');
            }, 1000);
        }
    };
    PiService.prototype.stopCapture = function () {
        if (this.capturing.getValue() === true) {
            this.socketService.socket.emit('capture:stop');
        }
    };
    PiService.prototype.startProcessing = function () {
        if (this.processing.getValue() !== true) {
            this.socketService.socket.emit('process:start');
        }
    };
    PiService.prototype.startReprocessing = function () {
        var _this = this;
        if (this.processing.getValue() === true) {
            this.stopProcessing();
            setTimeout(function () {
                _this.socketService.socket.emit('process:reprocess');
            }, 3000);
        }
        else {
            this.socketService.socket.emit('process:reprocess');
        }
    };
    PiService.prototype.startReprocessingAreas = function () {
        var _this = this;
        if (this.processing.getValue() === true) {
            this.stopProcessing();
            setTimeout(function () {
                _this.socketService.socket.emit('process:reprocess:areas');
            }, 3000);
        }
        else {
            this.socketService.socket.emit('process:reprocess:areas');
        }
    };
    PiService.prototype.stopProcessing = function () {
        if (this.processing.getValue() === true) {
            this.socketService.socket.emit('process:stop');
        }
    };
    PiService.prototype.togglePreviewStreaming = function () {
        if (this.socketService.connected.getValue() === false)
            return;
        if (this.streamingPreview.getValue() === null)
            return;
        if (this.streamingPreview.getValue() === false) {
            this.socketService.socket.emit('camera:startPreview');
        }
        else {
            this.socketService.socket.emit('camera:stopPreview');
        }
    };
    return PiService;
}());
PiService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__socket_service__["a" /* SocketService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__socket_service__["a" /* SocketService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__config_service__["a" /* ConfigService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__config_service__["a" /* ConfigService */]) === "function" && _b || Object])
], PiService);

var _a, _b;
//# sourceMappingURL=pi.service.js.map

/***/ }),

/***/ "../../../../../src/app/point-editor/point-editor.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"modal-header\">\n  <button type=\"button\" class=\"btn btn-default pull-right\" (click)=\"bsModalRef.hide()\">Close</button>\n  <button type=\"button\" class=\"btn pull-right\" [ngClass]=\"{'btn-primary': processed, 'btn-default': !processed}\" (click)=\"processed = !processed\">Processed</button>\n</div>\n<div class=\"modal-body\">\n  <p class=\"lead\" *ngIf=\"loading\">Loading...</p>\n  <div \n    *ngIf=\"!loading && !processed\" \n    class=\"preview-container\" \n    (swipeleft)=\"swipe($event.type)\" \n    (swiperight)=\"swipe($event.type)\">\n    <div \n      *ngFor=\"let image of images; let idx=index\"\n      [class.visible]=\"image.visible\" \n      [class.hidden]=\"!image.visible\">\n      <img [src]=\"image.src\" class=\"mx-auto d-block img-fluid\">\n      <small class=\"info\">{{ image.original ? '(current) ' : ''}}{{image.timestamp}} </small>\n    </div>\n  </div>\n  <div \n    *ngIf=\"!loading && processed\" \n    class=\"preview-container\" \n    (swipeleft)=\"swipe($event.type)\" \n    (swiperight)=\"swipe($event.type)\">\n    <div \n      *ngFor=\"let image of images; let idx=index\"\n      [class.visible]=\"image.visible\" \n      [class.hidden]=\"!image.visible\">\n      <img [src]=\"image.processedSrc\" class=\"mx-auto d-block img-fluid\">\n      <small class=\"info\">{{ image.original ? '(current) ' : ''}}{{image.timestamp}} </small>\n    </div>\n  </div>\n  <div *ngIf=\"!loading\" class=\"mt-4\">\n    <form class=\"form-inline\">\n      <label class=\"sr-only\" for=\"inlineFormInputGroupUsername2\">Area</label>\n      <div class=\"input-group mb-2 mr-sm-2 mb-sm-0\">\n        <div class=\"input-group-addon\">Area</div>\n        <input type=\"text\" class=\"form-control\" name=\"area\" [(ngModel)]=\"area\">\n      </div>\n      <button type=\"submit\" class=\"btn btn-primary\" (click)=\"updateArea()\">Update</button>\n    </form>\n  </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/point-editor/point-editor.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".preview-container {\n  position: relative;\n  background-color: #000000; }\n  .preview-container img {\n    -webkit-user-drag: none; }\n\n.info {\n  position: absolute;\n  top: 2px;\n  right: 4px;\n  color: #ffffff;\n  padding: 2px; }\n\n.visible {\n  display: block; }\n\n.hidden {\n  display: none; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/point-editor/point-editor.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ngx_bootstrap_modal_modal_options_class__ = __webpack_require__("../../../../ngx-bootstrap/modal/modal-options.class.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__ = __webpack_require__("../../../../rxjs/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_takeUntil__ = __webpack_require__("../../../../rxjs/add/operator/takeUntil.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_takeUntil___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_takeUntil__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__data_service__ = __webpack_require__("../../../../../src/app/data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__socket_service__ = __webpack_require__("../../../../../src/app/socket.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__config_service__ = __webpack_require__("../../../../../src/app/config.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_moment__ = __webpack_require__("../../../../moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_constants__ = __webpack_require__("../../../../../src/app/app.constants.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PointEditorComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var PointEditorComponent = (function () {
    function PointEditorComponent(dataService, bsModalRef, socketService, configService, appConstants) {
        this.dataService = dataService;
        this.bsModalRef = bsModalRef;
        this.socketService = socketService;
        this.configService = configService;
        this.appConstants = appConstants;
        this.SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
        this.PREVIEW_RANGE = 5;
        this.loading = true;
        this.componentDestroyed = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["Subject"]();
        this.processed = false;
        this.images = [];
    }
    PointEditorComponent.prototype.onKeyDown = function (event) {
        if (this.loading) {
            return;
        }
        switch (event.key) {
            case "ArrowUp":
            case "ArrowRight":
                this.swipe(this.SWIPE_ACTION.LEFT);
                break;
            case "ArrowDown":
            case "ArrowLeft":
                this.swipe(this.SWIPE_ACTION.RIGHT);
                break;
        }
    };
    PointEditorComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            _this._dataItemIndex = _this.bsModalRef.content.dataItemIndex;
            _this.dataItem = _this.dataService.data[_this._dataItemIndex];
            _this.loadImages();
        });
    };
    PointEditorComponent.prototype.loadImages = function () {
        var _this = this;
        this.images = [];
        this._dataIndexRange = {
            start: this._dataItemIndex > this.PREVIEW_RANGE ? this._dataItemIndex - this.PREVIEW_RANGE : 0,
            end: (this._dataItemIndex + this.PREVIEW_RANGE) <= (this.dataService.data.length - 1) ? (this._dataItemIndex + this.PREVIEW_RANGE) : this.dataService.data.length - 1,
        };
        var imageLoaded = function () {
            _this._totalNumImages = _this._totalNumImages - 1;
            if (_this._totalNumImages == 0) {
                _this.loading = false;
            }
        };
        this._totalNumImages = (this._dataIndexRange.end - this._dataIndexRange.start + 1) * 2;
        for (var i = this._dataIndexRange.start; i <= this._dataIndexRange.end; i++) {
            var previewImage = {
                image: new Image(),
                processedImage: new Image(),
                dataItem: this.dataService.data[i],
                timestamp: __WEBPACK_IMPORTED_MODULE_7_moment__(this.dataService.data[i].timestamp, "YYYYMMDD-HHmmss").format('MM/DD/YYYY HH:mm:ss'),
                original: this.dataService.data[i].id == this.dataItem.id,
                visible: this.dataService.data[i].id == this.dataItem.id,
                src: this.appConstants.serverURL + "/captured-image/" + this.dataService.data[i].filename,
                processedSrc: this.appConstants.serverURL + "/processed-image/" + this.dataService.data[i].filename
            };
            previewImage.image.src = previewImage.src;
            previewImage.processedImage.src = previewImage.processedSrc;
            previewImage.image.onload = imageLoaded;
            previewImage.processedImage.onload = imageLoaded;
            this.images.push(previewImage);
        }
        this._currentIndex = this.images.findIndex(function (item) { return item.visible; });
        this.currentDataItem = this.images[this._currentIndex].dataItem;
        this.area = this.currentDataItem.area;
    };
    PointEditorComponent.prototype.swipe = function (action) {
        var _this = this;
        if (action === this.SWIPE_ACTION.LEFT) {
            if (this._currentIndex == (this.images.length - 1)) {
                return;
            }
            this._currentIndex++;
        }
        // swipe left, previous avatar
        if (action === this.SWIPE_ACTION.RIGHT) {
            if (this._currentIndex == 0) {
                return;
            }
            this._currentIndex--;
        }
        this.images.forEach(function (x, i) { return x.visible = (i === _this._currentIndex); });
        this.currentDataItem = this.images[this._currentIndex].dataItem;
        this.area = this.currentDataItem.area;
    };
    PointEditorComponent.prototype.updateArea = function () {
        this.currentDataItem.area = this.area;
        this.dataService.updateData(this.currentDataItem);
    };
    PointEditorComponent.prototype.ngOnInit = function () {
        this.captureDimensions = this.configService.getCaptureDimensions();
    };
    PointEditorComponent.prototype.ngOnDestroy = function () {
        this.componentDestroyed.next(true);
        this.componentDestroyed.complete();
    };
    return PointEditorComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_17" /* ViewChild */])('canvas'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* ElementRef */]) === "function" && _a || Object)
], PointEditorComponent.prototype, "canvas", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["p" /* HostListener */])('window:keydown', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PointEditorComponent.prototype, "onKeyDown", null);
PointEditorComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'modal-content',
        template: __webpack_require__("../../../../../src/app/point-editor/point-editor.component.html"),
        styles: [__webpack_require__("../../../../../src/app/point-editor/point-editor.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__data_service__["a" /* DataService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__data_service__["a" /* DataService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ngx_bootstrap_modal_modal_options_class__["f" /* BsModalRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ngx_bootstrap_modal_modal_options_class__["f" /* BsModalRef */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__socket_service__["a" /* SocketService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__socket_service__["a" /* SocketService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_6__config_service__["a" /* ConfigService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__config_service__["a" /* ConfigService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_8__app_constants__["a" /* AppConstants */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__app_constants__["a" /* AppConstants */]) === "function" && _f || Object])
], PointEditorComponent);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=point-editor.component.js.map

/***/ }),

/***/ "../../../../../src/app/preview/preview.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"modal-header\">\n  <button type=\"button\" class=\"btn btn-default pull-right\" (click)=\"bsModalRef.hide()\">Close</button>\n</div>\n<div class=\"modal-body\">\n  <p class=\"lead\" *ngIf=\"!imagePreviewSrc\">Generating preview...</p>\n  <img [src]=\"imagePreviewSrc\" class=\"img-fluid\" *ngIf=\"imagePreviewSrc\" />\n</div>"

/***/ }),

/***/ "../../../../../src/app/preview/preview.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/preview/preview.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pi_service__ = __webpack_require__("../../../../../src/app/pi.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__socket_service__ = __webpack_require__("../../../../../src/app/socket.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ngx_bootstrap_modal_modal_options_class__ = __webpack_require__("../../../../ngx-bootstrap/modal/modal-options.class.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__ = __webpack_require__("../../../../rxjs/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_takeUntil__ = __webpack_require__("../../../../rxjs/add/operator/takeUntil.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_takeUntil___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_takeUntil__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_moment__ = __webpack_require__("../../../../moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_constants__ = __webpack_require__("../../../../../src/app/app.constants.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PreviewComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var PreviewComponent = (function () {
    function PreviewComponent(piService, socketService, bsModalRef, appConstants) {
        this.piService = piService;
        this.socketService = socketService;
        this.bsModalRef = bsModalRef;
        this.appConstants = appConstants;
        this.componentDestroyed = new __WEBPACK_IMPORTED_MODULE_4_rxjs_Subject__["Subject"]();
    }
    PreviewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.socketService.socket.on('crop:previewGenerated', function () {
            console.log("Preview generated");
            _this.imagePreviewSrc = _this.appConstants.serverURL + "/capture/preview?" + __WEBPACK_IMPORTED_MODULE_6_moment__().format('MMDDYYYYHHmmss');
        });
        this.piService.generatePreview();
    };
    PreviewComponent.prototype.ngOnDestroy = function () {
        this.componentDestroyed.next(true);
        this.componentDestroyed.complete();
    };
    return PreviewComponent;
}());
PreviewComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'modal-content',
        template: __webpack_require__("../../../../../src/app/preview/preview.component.html"),
        styles: [__webpack_require__("../../../../../src/app/preview/preview.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__pi_service__["a" /* PiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__pi_service__["a" /* PiService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__socket_service__["a" /* SocketService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__socket_service__["a" /* SocketService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3_ngx_bootstrap_modal_modal_options_class__["f" /* BsModalRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_ngx_bootstrap_modal_modal_options_class__["f" /* BsModalRef */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_7__app_constants__["a" /* AppConstants */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__app_constants__["a" /* AppConstants */]) === "function" && _d || Object])
], PreviewComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=preview.component.js.map

/***/ }),

/***/ "../../../../../src/app/process-log/process-log.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"modal-header\">\n  <button type=\"button\" class=\"btn btn-default pull-right\" (click)=\"bsModalRef.hide()\">Close</button>\n</div>\n<div class=\"modal-body\">\n  <div class=\"log\" #logElement>\n    <div *ngIf=\"log.length == 0\">Log is empty</div>\n    <div *ngFor=\"let entry of log\" [ngClass]=\"entry.type\">{{entry.value}}</div>\n  </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/process-log/process-log.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".log {\n  height: 300px;\n  overflow-y: scroll;\n  width: 100%; }\n  .log div {\n    padding: 2px 15px; }\n    .log div:nth-child(odd) {\n      background-color: #f9f9f9; }\n    .log div.error {\n      color: #fe767a; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/process-log/process-log.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__log_service__ = __webpack_require__("../../../../../src/app/log.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ngx_bootstrap_modal_modal_options_class__ = __webpack_require__("../../../../ngx-bootstrap/modal/modal-options.class.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__ = __webpack_require__("../../../../rxjs/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_takeUntil__ = __webpack_require__("../../../../rxjs/add/operator/takeUntil.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_takeUntil___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_takeUntil__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProcessLogComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ProcessLogComponent = (function () {
    function ProcessLogComponent(logService, bsModalRef) {
        this.logService = logService;
        this.bsModalRef = bsModalRef;
        this.componentDestroyed = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"]();
        this.log = [];
    }
    ProcessLogComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.logService.processLog.takeUntil(this.componentDestroyed.asObservable()).subscribe(function (log) {
            _this.log = log;
            setTimeout(function () {
                _this.logElement.nativeElement.scrollTop = _this.logElement.nativeElement.scrollHeight;
            });
        });
    };
    ProcessLogComponent.prototype.ngOnDestroy = function () {
        this.componentDestroyed.next(true);
        this.componentDestroyed.complete();
    };
    return ProcessLogComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_17" /* ViewChild */])('logElement'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* ElementRef */]) === "function" && _a || Object)
], ProcessLogComponent.prototype, "logElement", void 0);
ProcessLogComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'modal-content',
        template: __webpack_require__("../../../../../src/app/process-log/process-log.component.html"),
        styles: [__webpack_require__("../../../../../src/app/process-log/process-log.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__log_service__["a" /* LogService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__log_service__["a" /* LogService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2_ngx_bootstrap_modal_modal_options_class__["f" /* BsModalRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ngx_bootstrap_modal_modal_options_class__["f" /* BsModalRef */]) === "function" && _c || Object])
], ProcessLogComponent);

var _a, _b, _c;
//# sourceMappingURL=process-log.component.js.map

/***/ }),

/***/ "../../../../../src/app/process-queue/process-queue.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"modal-header\">\n  <button type=\"button\" class=\"btn btn-default pull-right\" (click)=\"bsModalRef.hide()\">Close</button>\n</div>\n<div class=\"modal-body\">\n  <progressbar [max]=\"queueSummary.total\" [value]=\"queueSummary.processed\" *ngIf=\"queueSummary\">\n    <span style=\"color:white; white-space:nowrap;\">{{queueSummary.processed}} / {{queueSummary.total}}</span>\n  </progressbar>\n</div>"

/***/ }),

/***/ "../../../../../src/app/process-queue/process-queue.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".log {\n  height: 300px;\n  overflow-y: scroll;\n  width: 100%; }\n  .log div {\n    padding: 2px 15px; }\n    .log div:nth-child(odd) {\n      background-color: #f9f9f9; }\n    .log div.error {\n      color: #fe767a; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/process-queue/process-queue.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_service__ = __webpack_require__("../../../../../src/app/data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ngx_bootstrap_modal_modal_options_class__ = __webpack_require__("../../../../ngx-bootstrap/modal/modal-options.class.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__ = __webpack_require__("../../../../rxjs/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_takeUntil__ = __webpack_require__("../../../../rxjs/add/operator/takeUntil.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_takeUntil___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_takeUntil__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProcessQueueComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ProcessQueueComponent = (function () {
    function ProcessQueueComponent(dataService, bsModalRef) {
        this.dataService = dataService;
        this.bsModalRef = bsModalRef;
        this.componentDestroyed = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"]();
    }
    ProcessQueueComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataService.queueSummary.takeUntil(this.componentDestroyed.asObservable()).subscribe(function (summary) {
            console.log("Updating summary");
            _this.queueSummary = summary;
            setTimeout(function () {
                _this.dataService.getQueueSummary();
            }, 2000);
        });
    };
    ProcessQueueComponent.prototype.ngOnDestroy = function () {
        this.componentDestroyed.next(true);
        this.componentDestroyed.complete();
    };
    return ProcessQueueComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_17" /* ViewChild */])('logElement'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* ElementRef */]) === "function" && _a || Object)
], ProcessQueueComponent.prototype, "logElement", void 0);
ProcessQueueComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'modal-content',
        template: __webpack_require__("../../../../../src/app/process-queue/process-queue.component.html"),
        styles: [__webpack_require__("../../../../../src/app/process-queue/process-queue.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__data_service__["a" /* DataService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__data_service__["a" /* DataService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2_ngx_bootstrap_modal_modal_options_class__["f" /* BsModalRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ngx_bootstrap_modal_modal_options_class__["f" /* BsModalRef */]) === "function" && _c || Object])
], ProcessQueueComponent);

var _a, _b, _c;
//# sourceMappingURL=process-queue.component.js.map

/***/ }),

/***/ "../../../../../src/app/process/process.component.html":
/***/ (function(module, exports) {

module.exports = "<form #processForm=\"ngForm\" novalidate>\n  <div class=\"row\">\n    <div class=\"col-xs-12 col-sm-12 col-md-6\">\n      <div class=\"form-group row\">\n        <label class=\"col-xs-12 col-md-4 col-form-label\">Intermediates</label>\n        <div class=\"col\">\n          <div class=\"form-check form-check-inline\">\n            <label class=\"form-check-label\">\n              <input class=\"form-check-input\" type=\"radio\" [(ngModel)]=\"config.process.intermediates_enabled\" name=\"intermediates_enabled\" value=\"On\"> Yes\n            </label>\n          </div>\n          <div class=\"form-check form-check-inline\">\n            <label class=\"form-check-label\">\n              <input class=\"form-check-input\" type=\"radio\" [(ngModel)]=\"config.process.intermediates_enabled\" name=\"intermediates_enabled\" value=\"Off\"> No\n            </label>\n          </div>\n        </div>\n      </div>\n      <div class=\"form-group row\">\n        <label class=\"col-xs-12 col-md-4 col-form-label\">Outlier Removal</label>\n        <div class=\"col\">\n          <div class=\"form-check form-check-inline\">\n            <label class=\"form-check-label\">\n              <input class=\"form-check-input\" type=\"radio\" [(ngModel)]=\"config.process.outlier_removal_enabled\" name=\"outlier_removal_enabled\" value=\"On\"> Enabled\n            </label>\n          </div>\n          <div class=\"form-check form-check-inline\">\n            <label class=\"form-check-label\">\n              <input class=\"form-check-input\" type=\"radio\" [(ngModel)]=\"config.process.outlier_removal_enabled\" name=\"outlier_removal_enabled\" value=\"Off\"> Disabled\n            </label>\n          </div>\n        </div>\n      </div>\n      <div class=\"form-group row\">\n        <label class=\"col-xs-12 col-md-4 col-form-label\">Thresholding</label>\n        <div class=\"col\">\n          <div class=\"form-check form-check-inline\">\n            <label class=\"form-check-label\">\n              <input class=\"form-check-input\" type=\"radio\" [(ngModel)]=\"config.process.thresholding_enabled\" name=\"thresholding_enabled\" value=\"On\"> Enabled\n            </label>\n          </div>\n          <div class=\"form-check form-check-inline\">\n            <label class=\"form-check-label\">\n              <input class=\"form-check-input\" type=\"radio\" [(ngModel)]=\"config.process.thresholding_enabled\" name=\"thresholding_enabled\" value=\"Off\"> Disabled\n            </label>\n          </div>\n        </div>\n      </div>    \n      <div class=\"form-group row\">\n        <label class=\"col-xs-12 col-md-4 col-form-label\">Filtering</label>\n        <div class=\"col\">\n          <div class=\"form-check form-check-inline\">\n            <label class=\"form-check-label\">\n              <input class=\"form-check-input\" type=\"radio\" [(ngModel)]=\"config.process.filtering_enabled\" name=\"filtering_enabled\" value=\"On\"> Enabled\n            </label>\n          </div>\n          <div class=\"form-check form-check-inline\">\n            <label class=\"form-check-label\">\n              <input class=\"form-check-input\" type=\"radio\" [(ngModel)]=\"config.process.filtering_enabled\" name=\"filtering_enabled\" value=\"Off\"> Disabled\n            </label>\n          </div>\n        </div>\n      </div>\n      <div class=\"form-group row\" *ngIf=\"config.process.filtering_enabled\">\n        <label class=\"col-xs-12 col-md-4 col-form-label\">Filter Threshold</label>\n        <div class=\"col\">\n          <input type=\"number\" name=\"filterThreshold\" placeholder=\"7\" class=\"form-control\" [(ngModel)]=\"config.process.filter_threshold\">\n        </div>\n        <div class=\"col-3\">\n          <div class=\"btn-group\">\n            <button type=\"button\" class=\"btn btn-secondary\" (click)=\"config.process.filter_threshold = config.process.filter_threshold - 1\"><i class=\"fa fa-minus\" aria-hidden=\"true\"></i></button>\n            <button type=\"button\" class=\"btn btn-secondary\" (click)=\"config.process.filter_threshold = config.process.filter_threshold + 1\"><i class=\"fa fa-plus\" aria-hidden=\"true\"></i></button>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"col-xs-12 col-sm-12 col-md-6\">\n      <div class=\"form-group row\">\n        <label class=\"col-xs-12 col-md-4 col-form-label\">Data ROI</label>\n        <div class=\"col\">\n          <div class=\"form-check form-check-inline\">\n            <label class=\"form-check-label\">\n              <input class=\"form-check-input\" type=\"radio\" [(ngModel)]=\"config.process.roi_enabled\" name=\"roi_enabled\" value=\"On\"> Enabled\n            </label>\n          </div>\n          <div class=\"form-check form-check-inline\">\n            <label class=\"form-check-label\">\n              <input class=\"form-check-input\" type=\"radio\" [(ngModel)]=\"config.process.roi_enabled\" name=\"roi_enabled\" value=\"Off\"> Disabled\n            </label>\n          </div>\n          <div class=\"row\" *ngIf=\"config.process.roi_enabled == 'On'\">\n            <div class=\"col\">\n              <button type=\"button\" class=\"btn btn-secondary\" (click)=\"setROI()\" *ngIf=\"configLoaded\"><i class=\"fa fa-crop\" aria-hidden=\"true\"></i> Set ROI</button>\n            </div>\n          </div>\n        </div>\n      </div>    \n    </div>\n  </div>\n  <div class=\"row\">\n    <div class=\"col\">\n      <hr />\n      <div class=\"d-flex justify-content-start\">\n        <div>\n          <button type=\"button\" class=\"btn mb-1 btn-primary\" (click)=\"updateConfig()\" *ngIf=\"processForm.valid && processForm.dirty\">Update Config</button>\n          <button type=\"button\" class=\"btn mb-1 btn-secondary\" (click)=\"configVisible = !configVisible\" *ngIf=\"configLoaded\">{{configVisible ? 'Hide' : 'Show'}} Config</button>    \n          <button type=\"button\" class=\"btn mb-1 btn-secondary\" (click)=\"showLog()\"><i class=\"fa fa-file-text-o\" aria-hidden=\"true\"></i> View Log</button>\n          <button type=\"button\" class=\"btn mb-1 btn-secondary\" (click)=\"showQueue()\"><i class=\"fa fa-list-ol\" aria-hidden=\"true\"></i> Queue</button>\n          <button type=\"button\" class=\"btn mb-1 btn-secondary\" (click)=\"reprocess()\"><i class=\"fa fa-repeat\" aria-hidden=\"true\"></i> Reprocess</button>\n          <button type=\"button\" class=\"btn mb-1 btn-secondary\" (click)=\"exportData()\"><i class=\"fa fa-repeat\" aria-hidden=\"true\"></i> Export Data</button>\n        </div>\n        <div class=\"ml-auto p-2\" *ngIf=\"configLoaded\">\n          <button type=\"button\" class=\"btn mb-1 btn-lg btn-danger\" (click)=\"stopProcessing()\" *ngIf=\"configLoaded && processing\">Stop</button>\n          <button type=\"button\" class=\"btn mb-1 btn-lg btn-primary\" (click)=\"startProcessing()\" *ngIf=\"configLoaded && !processing && !processForm.dirty && processForm.valid\">Start</button>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"row\" *ngIf=\"configVisible\">\n    <div class=\"col\">\n      <pre>{{ config | json }}</pre>\n    </div>\n  </div>\n</form>"

/***/ }),

/***/ "../../../../../src/app/process/process.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/process/process.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__ = __webpack_require__("../../../../rxjs/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_takeUntil__ = __webpack_require__("../../../../rxjs/add/operator/takeUntil.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_takeUntil___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_takeUntil__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__config_service__ = __webpack_require__("../../../../../src/app/config.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pi_service__ = __webpack_require__("../../../../../src/app/pi.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__data_service__ = __webpack_require__("../../../../../src/app/data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ngx_bootstrap_modal__ = __webpack_require__("../../../../ngx-bootstrap/modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__process_log_process_log_component__ = __webpack_require__("../../../../../src/app/process-log/process-log.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__process_queue_process_queue_component__ = __webpack_require__("../../../../../src/app/process-queue/process-queue.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__data_roi_data_roi_component__ = __webpack_require__("../../../../../src/app/data-roi/data-roi.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProcessComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var ProcessComponent = (function () {
    function ProcessComponent(configService, piService, modalService, dataService) {
        var _this = this;
        this.configService = configService;
        this.piService = piService;
        this.modalService = modalService;
        this.dataService = dataService;
        this.capturing = false;
        this.processing = false;
        this.configVisible = false;
        this.configLoaded = false;
        this.componentDestroyed = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["Subject"]();
        this.piService.processing.takeUntil(this.componentDestroyed.asObservable()).subscribe(function (processing) {
            _this.processing = processing;
        });
    }
    ProcessComponent.prototype.setROI = function () {
        this.roiModalRef = this.modalService.show(__WEBPACK_IMPORTED_MODULE_10__data_roi_data_roi_component__["a" /* DataRoiComponent */], { class: 'modal-lg' });
    };
    ProcessComponent.prototype.updateConfig = function () {
        this.configService.updateConfig(this.config);
    };
    ProcessComponent.prototype.startProcessing = function () {
        console.log("Starting processing");
        this.piService.startProcessing();
    };
    ProcessComponent.prototype.stopProcessing = function () {
        console.log("Stopping processing");
        this.piService.stopProcessing();
    };
    ProcessComponent.prototype.exportData = function () {
        console.log("Exporting data");
        this.dataService.exportData();
    };
    ProcessComponent.prototype.ngOnDestroy = function () {
        this.componentDestroyed.next(true);
        this.componentDestroyed.complete();
    };
    ProcessComponent.prototype.reprocess = function () {
        console.log("Starting reprocessing");
        this.configService.updateConfig(this.config);
        this.piService.startReprocessing();
    };
    ProcessComponent.prototype.showLog = function () {
        this.logModalRef = this.modalService.show(__WEBPACK_IMPORTED_MODULE_8__process_log_process_log_component__["a" /* ProcessLogComponent */], { class: 'modal-lg' });
    };
    ProcessComponent.prototype.showQueue = function () {
        this.queueModalRef = this.modalService.show(__WEBPACK_IMPORTED_MODULE_9__process_queue_process_queue_component__["a" /* ProcessQueueComponent */], { class: 'modal-lg' });
    };
    ProcessComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.configService.configLoaded.takeUntil(this.componentDestroyed.asObservable()).subscribe(function (isLoaded) {
            _this.configLoaded = isLoaded;
        });
        this.processForm.valueChanges.takeUntil(this.componentDestroyed.asObservable()).subscribe(function (change) {
            console.log("Change!", change);
            _this.processForm.form.markAsDirty();
        });
        this.configService.config.takeUntil(this.componentDestroyed.asObservable()).subscribe(function (config) {
            if (config) {
                _this.config = Object.assign({}, config);
                if (_this.processForm) {
                    setTimeout(function () {
                        _this.processForm.form.markAsPristine();
                    });
                }
            }
        });
    };
    return ProcessComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_17" /* ViewChild */])('processForm'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* NgForm */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* NgForm */]) === "function" && _a || Object)
], ProcessComponent.prototype, "processForm", void 0);
ProcessComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-process',
        template: __webpack_require__("../../../../../src/app/process/process.component.html"),
        styles: [__webpack_require__("../../../../../src/app/process/process.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__config_service__["a" /* ConfigService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__config_service__["a" /* ConfigService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__pi_service__["a" /* PiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__pi_service__["a" /* PiService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_7_ngx_bootstrap_modal__["b" /* BsModalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7_ngx_bootstrap_modal__["b" /* BsModalService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_6__data_service__["a" /* DataService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__data_service__["a" /* DataService */]) === "function" && _e || Object])
], ProcessComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=process.component.js.map

/***/ }),

/***/ "../../../../../src/app/socket.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_socket_io_client__ = __webpack_require__("../../../../socket.io-client/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_socket_io_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_socket_io_client__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__ = __webpack_require__("../../../../rxjs/BehaviorSubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_constants__ = __webpack_require__("../../../../../src/app/app.constants.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SocketService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SocketService = (function () {
    function SocketService(router, appConstants) {
        var _this = this;
        this.router = router;
        this.appConstants = appConstants;
        this.connected = new __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__["BehaviorSubject"](false);
        this.reconnectionAttempts = new __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__["BehaviorSubject"](null);
        this._reconnectionAttempts = 0;
        this.socket = __WEBPACK_IMPORTED_MODULE_1_socket_io_client__(this.appConstants.serverURL);
        this.socket.on('connected', function (socket) {
            _this.connected.next(true);
            _this._reconnectionAttempts = 0;
            _this.reconnectionAttempts.next(null);
        });
        this.socket.on('disconnect', function (socket) {
            _this.connected.next(false);
            _this.router.navigate(['capture']);
        });
        this.socket.on('reconnect_attempt', function (socket) {
            _this._reconnectionAttempts++;
            _this.reconnectionAttempts.next(_this._reconnectionAttempts);
        });
    }
    return SocketService;
}());
SocketService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__app_constants__["a" /* AppConstants */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__app_constants__["a" /* AppConstants */]) === "function" && _b || Object])
], SocketService);

var _a, _b;
//# sourceMappingURL=socket.service.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ "../../../../moment/locale recursive ^\\.\\/.*$":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "../../../../moment/locale/af.js",
	"./af.js": "../../../../moment/locale/af.js",
	"./ar": "../../../../moment/locale/ar.js",
	"./ar-dz": "../../../../moment/locale/ar-dz.js",
	"./ar-dz.js": "../../../../moment/locale/ar-dz.js",
	"./ar-kw": "../../../../moment/locale/ar-kw.js",
	"./ar-kw.js": "../../../../moment/locale/ar-kw.js",
	"./ar-ly": "../../../../moment/locale/ar-ly.js",
	"./ar-ly.js": "../../../../moment/locale/ar-ly.js",
	"./ar-ma": "../../../../moment/locale/ar-ma.js",
	"./ar-ma.js": "../../../../moment/locale/ar-ma.js",
	"./ar-sa": "../../../../moment/locale/ar-sa.js",
	"./ar-sa.js": "../../../../moment/locale/ar-sa.js",
	"./ar-tn": "../../../../moment/locale/ar-tn.js",
	"./ar-tn.js": "../../../../moment/locale/ar-tn.js",
	"./ar.js": "../../../../moment/locale/ar.js",
	"./az": "../../../../moment/locale/az.js",
	"./az.js": "../../../../moment/locale/az.js",
	"./be": "../../../../moment/locale/be.js",
	"./be.js": "../../../../moment/locale/be.js",
	"./bg": "../../../../moment/locale/bg.js",
	"./bg.js": "../../../../moment/locale/bg.js",
	"./bn": "../../../../moment/locale/bn.js",
	"./bn.js": "../../../../moment/locale/bn.js",
	"./bo": "../../../../moment/locale/bo.js",
	"./bo.js": "../../../../moment/locale/bo.js",
	"./br": "../../../../moment/locale/br.js",
	"./br.js": "../../../../moment/locale/br.js",
	"./bs": "../../../../moment/locale/bs.js",
	"./bs.js": "../../../../moment/locale/bs.js",
	"./ca": "../../../../moment/locale/ca.js",
	"./ca.js": "../../../../moment/locale/ca.js",
	"./cs": "../../../../moment/locale/cs.js",
	"./cs.js": "../../../../moment/locale/cs.js",
	"./cv": "../../../../moment/locale/cv.js",
	"./cv.js": "../../../../moment/locale/cv.js",
	"./cy": "../../../../moment/locale/cy.js",
	"./cy.js": "../../../../moment/locale/cy.js",
	"./da": "../../../../moment/locale/da.js",
	"./da.js": "../../../../moment/locale/da.js",
	"./de": "../../../../moment/locale/de.js",
	"./de-at": "../../../../moment/locale/de-at.js",
	"./de-at.js": "../../../../moment/locale/de-at.js",
	"./de-ch": "../../../../moment/locale/de-ch.js",
	"./de-ch.js": "../../../../moment/locale/de-ch.js",
	"./de.js": "../../../../moment/locale/de.js",
	"./dv": "../../../../moment/locale/dv.js",
	"./dv.js": "../../../../moment/locale/dv.js",
	"./el": "../../../../moment/locale/el.js",
	"./el.js": "../../../../moment/locale/el.js",
	"./en-au": "../../../../moment/locale/en-au.js",
	"./en-au.js": "../../../../moment/locale/en-au.js",
	"./en-ca": "../../../../moment/locale/en-ca.js",
	"./en-ca.js": "../../../../moment/locale/en-ca.js",
	"./en-gb": "../../../../moment/locale/en-gb.js",
	"./en-gb.js": "../../../../moment/locale/en-gb.js",
	"./en-ie": "../../../../moment/locale/en-ie.js",
	"./en-ie.js": "../../../../moment/locale/en-ie.js",
	"./en-nz": "../../../../moment/locale/en-nz.js",
	"./en-nz.js": "../../../../moment/locale/en-nz.js",
	"./eo": "../../../../moment/locale/eo.js",
	"./eo.js": "../../../../moment/locale/eo.js",
	"./es": "../../../../moment/locale/es.js",
	"./es-do": "../../../../moment/locale/es-do.js",
	"./es-do.js": "../../../../moment/locale/es-do.js",
	"./es.js": "../../../../moment/locale/es.js",
	"./et": "../../../../moment/locale/et.js",
	"./et.js": "../../../../moment/locale/et.js",
	"./eu": "../../../../moment/locale/eu.js",
	"./eu.js": "../../../../moment/locale/eu.js",
	"./fa": "../../../../moment/locale/fa.js",
	"./fa.js": "../../../../moment/locale/fa.js",
	"./fi": "../../../../moment/locale/fi.js",
	"./fi.js": "../../../../moment/locale/fi.js",
	"./fo": "../../../../moment/locale/fo.js",
	"./fo.js": "../../../../moment/locale/fo.js",
	"./fr": "../../../../moment/locale/fr.js",
	"./fr-ca": "../../../../moment/locale/fr-ca.js",
	"./fr-ca.js": "../../../../moment/locale/fr-ca.js",
	"./fr-ch": "../../../../moment/locale/fr-ch.js",
	"./fr-ch.js": "../../../../moment/locale/fr-ch.js",
	"./fr.js": "../../../../moment/locale/fr.js",
	"./fy": "../../../../moment/locale/fy.js",
	"./fy.js": "../../../../moment/locale/fy.js",
	"./gd": "../../../../moment/locale/gd.js",
	"./gd.js": "../../../../moment/locale/gd.js",
	"./gl": "../../../../moment/locale/gl.js",
	"./gl.js": "../../../../moment/locale/gl.js",
	"./gom-latn": "../../../../moment/locale/gom-latn.js",
	"./gom-latn.js": "../../../../moment/locale/gom-latn.js",
	"./he": "../../../../moment/locale/he.js",
	"./he.js": "../../../../moment/locale/he.js",
	"./hi": "../../../../moment/locale/hi.js",
	"./hi.js": "../../../../moment/locale/hi.js",
	"./hr": "../../../../moment/locale/hr.js",
	"./hr.js": "../../../../moment/locale/hr.js",
	"./hu": "../../../../moment/locale/hu.js",
	"./hu.js": "../../../../moment/locale/hu.js",
	"./hy-am": "../../../../moment/locale/hy-am.js",
	"./hy-am.js": "../../../../moment/locale/hy-am.js",
	"./id": "../../../../moment/locale/id.js",
	"./id.js": "../../../../moment/locale/id.js",
	"./is": "../../../../moment/locale/is.js",
	"./is.js": "../../../../moment/locale/is.js",
	"./it": "../../../../moment/locale/it.js",
	"./it.js": "../../../../moment/locale/it.js",
	"./ja": "../../../../moment/locale/ja.js",
	"./ja.js": "../../../../moment/locale/ja.js",
	"./jv": "../../../../moment/locale/jv.js",
	"./jv.js": "../../../../moment/locale/jv.js",
	"./ka": "../../../../moment/locale/ka.js",
	"./ka.js": "../../../../moment/locale/ka.js",
	"./kk": "../../../../moment/locale/kk.js",
	"./kk.js": "../../../../moment/locale/kk.js",
	"./km": "../../../../moment/locale/km.js",
	"./km.js": "../../../../moment/locale/km.js",
	"./kn": "../../../../moment/locale/kn.js",
	"./kn.js": "../../../../moment/locale/kn.js",
	"./ko": "../../../../moment/locale/ko.js",
	"./ko.js": "../../../../moment/locale/ko.js",
	"./ky": "../../../../moment/locale/ky.js",
	"./ky.js": "../../../../moment/locale/ky.js",
	"./lb": "../../../../moment/locale/lb.js",
	"./lb.js": "../../../../moment/locale/lb.js",
	"./lo": "../../../../moment/locale/lo.js",
	"./lo.js": "../../../../moment/locale/lo.js",
	"./lt": "../../../../moment/locale/lt.js",
	"./lt.js": "../../../../moment/locale/lt.js",
	"./lv": "../../../../moment/locale/lv.js",
	"./lv.js": "../../../../moment/locale/lv.js",
	"./me": "../../../../moment/locale/me.js",
	"./me.js": "../../../../moment/locale/me.js",
	"./mi": "../../../../moment/locale/mi.js",
	"./mi.js": "../../../../moment/locale/mi.js",
	"./mk": "../../../../moment/locale/mk.js",
	"./mk.js": "../../../../moment/locale/mk.js",
	"./ml": "../../../../moment/locale/ml.js",
	"./ml.js": "../../../../moment/locale/ml.js",
	"./mr": "../../../../moment/locale/mr.js",
	"./mr.js": "../../../../moment/locale/mr.js",
	"./ms": "../../../../moment/locale/ms.js",
	"./ms-my": "../../../../moment/locale/ms-my.js",
	"./ms-my.js": "../../../../moment/locale/ms-my.js",
	"./ms.js": "../../../../moment/locale/ms.js",
	"./my": "../../../../moment/locale/my.js",
	"./my.js": "../../../../moment/locale/my.js",
	"./nb": "../../../../moment/locale/nb.js",
	"./nb.js": "../../../../moment/locale/nb.js",
	"./ne": "../../../../moment/locale/ne.js",
	"./ne.js": "../../../../moment/locale/ne.js",
	"./nl": "../../../../moment/locale/nl.js",
	"./nl-be": "../../../../moment/locale/nl-be.js",
	"./nl-be.js": "../../../../moment/locale/nl-be.js",
	"./nl.js": "../../../../moment/locale/nl.js",
	"./nn": "../../../../moment/locale/nn.js",
	"./nn.js": "../../../../moment/locale/nn.js",
	"./pa-in": "../../../../moment/locale/pa-in.js",
	"./pa-in.js": "../../../../moment/locale/pa-in.js",
	"./pl": "../../../../moment/locale/pl.js",
	"./pl.js": "../../../../moment/locale/pl.js",
	"./pt": "../../../../moment/locale/pt.js",
	"./pt-br": "../../../../moment/locale/pt-br.js",
	"./pt-br.js": "../../../../moment/locale/pt-br.js",
	"./pt.js": "../../../../moment/locale/pt.js",
	"./ro": "../../../../moment/locale/ro.js",
	"./ro.js": "../../../../moment/locale/ro.js",
	"./ru": "../../../../moment/locale/ru.js",
	"./ru.js": "../../../../moment/locale/ru.js",
	"./sd": "../../../../moment/locale/sd.js",
	"./sd.js": "../../../../moment/locale/sd.js",
	"./se": "../../../../moment/locale/se.js",
	"./se.js": "../../../../moment/locale/se.js",
	"./si": "../../../../moment/locale/si.js",
	"./si.js": "../../../../moment/locale/si.js",
	"./sk": "../../../../moment/locale/sk.js",
	"./sk.js": "../../../../moment/locale/sk.js",
	"./sl": "../../../../moment/locale/sl.js",
	"./sl.js": "../../../../moment/locale/sl.js",
	"./sq": "../../../../moment/locale/sq.js",
	"./sq.js": "../../../../moment/locale/sq.js",
	"./sr": "../../../../moment/locale/sr.js",
	"./sr-cyrl": "../../../../moment/locale/sr-cyrl.js",
	"./sr-cyrl.js": "../../../../moment/locale/sr-cyrl.js",
	"./sr.js": "../../../../moment/locale/sr.js",
	"./ss": "../../../../moment/locale/ss.js",
	"./ss.js": "../../../../moment/locale/ss.js",
	"./sv": "../../../../moment/locale/sv.js",
	"./sv.js": "../../../../moment/locale/sv.js",
	"./sw": "../../../../moment/locale/sw.js",
	"./sw.js": "../../../../moment/locale/sw.js",
	"./ta": "../../../../moment/locale/ta.js",
	"./ta.js": "../../../../moment/locale/ta.js",
	"./te": "../../../../moment/locale/te.js",
	"./te.js": "../../../../moment/locale/te.js",
	"./tet": "../../../../moment/locale/tet.js",
	"./tet.js": "../../../../moment/locale/tet.js",
	"./th": "../../../../moment/locale/th.js",
	"./th.js": "../../../../moment/locale/th.js",
	"./tl-ph": "../../../../moment/locale/tl-ph.js",
	"./tl-ph.js": "../../../../moment/locale/tl-ph.js",
	"./tlh": "../../../../moment/locale/tlh.js",
	"./tlh.js": "../../../../moment/locale/tlh.js",
	"./tr": "../../../../moment/locale/tr.js",
	"./tr.js": "../../../../moment/locale/tr.js",
	"./tzl": "../../../../moment/locale/tzl.js",
	"./tzl.js": "../../../../moment/locale/tzl.js",
	"./tzm": "../../../../moment/locale/tzm.js",
	"./tzm-latn": "../../../../moment/locale/tzm-latn.js",
	"./tzm-latn.js": "../../../../moment/locale/tzm-latn.js",
	"./tzm.js": "../../../../moment/locale/tzm.js",
	"./uk": "../../../../moment/locale/uk.js",
	"./uk.js": "../../../../moment/locale/uk.js",
	"./ur": "../../../../moment/locale/ur.js",
	"./ur.js": "../../../../moment/locale/ur.js",
	"./uz": "../../../../moment/locale/uz.js",
	"./uz-latn": "../../../../moment/locale/uz-latn.js",
	"./uz-latn.js": "../../../../moment/locale/uz-latn.js",
	"./uz.js": "../../../../moment/locale/uz.js",
	"./vi": "../../../../moment/locale/vi.js",
	"./vi.js": "../../../../moment/locale/vi.js",
	"./x-pseudo": "../../../../moment/locale/x-pseudo.js",
	"./x-pseudo.js": "../../../../moment/locale/x-pseudo.js",
	"./yo": "../../../../moment/locale/yo.js",
	"./yo.js": "../../../../moment/locale/yo.js",
	"./zh-cn": "../../../../moment/locale/zh-cn.js",
	"./zh-cn.js": "../../../../moment/locale/zh-cn.js",
	"./zh-hk": "../../../../moment/locale/zh-hk.js",
	"./zh-hk.js": "../../../../moment/locale/zh-hk.js",
	"./zh-tw": "../../../../moment/locale/zh-tw.js",
	"./zh-tw.js": "../../../../moment/locale/zh-tw.js"
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "../../../../moment/locale recursive ^\\.\\/.*$";

/***/ }),

/***/ 0:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[2]);
//# sourceMappingURL=main.bundle.js.map