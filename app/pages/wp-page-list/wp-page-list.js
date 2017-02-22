"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var wp_page_1 = require('../wp-page/wp-page');
var WpPageList = (function () {
    function WpPageList(nav, wp, up) {
        var _this = this;
        this.nav = nav;
        this.wp = wp;
        this.up = up;
        var loader = this.up.getLoader('در حال بارگذاری ...');
        this.nav.present(loader);
        this.wp.getPages()
            .subscribe(function (pages) {
            _this.pages = pages;
            loader.dismiss();
        }, function () {
            loader.dismiss();
        });
    }
    WpPageList.prototype.openPage = function (page) {
        this.nav.push(wp_page_1.WpPage, { page: page });
    };
    WpPageList = __decorate([
        core_1.Component({
            templateUrl: 'build/pages/wp-page-list/wp-page-list.html'
        })
    ], WpPageList);
    return WpPageList;
}());
exports.WpPageList = WpPageList;
//# sourceMappingURL=wp-page-list.js.map