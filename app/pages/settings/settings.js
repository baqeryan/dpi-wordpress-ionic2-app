"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ionic_angular_1 = require('ionic-angular');
var common_1 = require('@angular/common');
var SettingsPage = (function () {
    function SettingsPage(pushProvider, events) {
        var _this = this;
        this.pushProvider = pushProvider;
        this.events = events;
        this.pushToggle = new common_1.Control();
        this.storage = new ionic_angular_1.Storage(ionic_angular_1.LocalStorage);
        this.settings = { sort: "desc", push: true };
        this.storage.get('settings')
            .then(function (data) {
            _this.settings = JSON.parse(data);
            _this.pushToggle.updateValue(_this.settings.push);
        });
        this.pushToggle.valueChanges
            .subscribe(function (value) {
            _this.changePush(value);
        });
    }
    SettingsPage.prototype.saveSettings = function () {
        this.storage.set('settings', JSON.stringify(this.settings));
    };
    SettingsPage.prototype.changeSort = function () {
        this.events.publish("sort:changed", this.settings.sort);
        this.saveSettings();
    };
    SettingsPage.prototype.changePush = function (push) {
        if (push === true) {
            this.pushProvider.registerDevice()
                .then(function () { });
        }
        else {
            this.pushProvider.unregisterDevice()
                .then(function () { });
        }
        this.saveSettings();
    };
    SettingsPage = __decorate([
        core_1.Component({
            templateUrl: 'build/pages/settings/settings.html'
        })
    ], SettingsPage);
    return SettingsPage;
}());
exports.SettingsPage = SettingsPage;
//# sourceMappingURL=settings.js.map