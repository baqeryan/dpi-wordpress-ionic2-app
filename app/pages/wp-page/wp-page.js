"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var htmlPipe_1 = require('../../pipes/htmlPipe');
var WpPage = (function () {
    function WpPage(params) {
        this.params = params;
        this.page = this.params.get('page');
    }
    WpPage = __decorate([
        core_1.Component({
            templateUrl: 'build/pages/wp-page/wp-page.html',
            pipes: [htmlPipe_1.HtmlPipe]
        })
    ], WpPage);
    return WpPage;
}());
exports.WpPage = WpPage;
//# sourceMappingURL=wp-page.js.map