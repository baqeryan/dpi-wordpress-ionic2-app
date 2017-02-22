"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
require('rxjs/add/operator/map');
var ionic_angular_1 = require('ionic-angular');
var ionic_native_1 = require('ionic-native');
var constants_1 = require('../constants');
var PushProvider = (function () {
    function PushProvider(http) {
        this.http = http;
        this.apiURL = constants_1.SITE_URL;
        this.storage = new ionic_angular_1.Storage(ionic_angular_1.LocalStorage);
    }
    PushProvider.prototype.init = function () {
        var _this = this;
        this.push = ionic_native_1.Push.init({
            android: { senderID: constants_1.GCM_SENDER_ID },
            ios: {
                alert: "true",
                badge: true,
                sound: 'false'
            },
            windows: {}
        });
        this.push.on('registration', function (data) {
            _this.storage.set('token', data.registrationId);
            _this.registerDevice();
        });
        this.push.on('notification', function (data) {
            console.log(data);
        });
    };
    PushProvider.prototype.transformRequest = function (obj) {
        var p, str;
        str = [];
        for (p in obj) {
            str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
        }
        return str.join('&');
    };
    PushProvider.prototype.registerDevice = function () {
        var _this = this;
        var email = ionic_native_1.Device.device.serial;
        var url = this.apiURL + '/wp-rest/apnwp/register?';
        var os = ionic_native_1.Device.device.platform;
        return this.storage.get('token')
            .then(function (data) {
            if (!data)
                data = '0000010000';
            if (!email)
                email = "test@test.com";
            if (!os)
                os = "android";
            var request = _this.transformRequest({ os_type: os, user_email_id: email, device_token: data });
            url = url + request;
            return _this.http.get(url).map(function (res) { return res.json(); })
                .subscribe(function (res) {
            });
        });
    };
    PushProvider.prototype.unregisterDevice = function () {
        var _this = this;
        var email = ionic_native_1.Device.device.serial;
        var url = this.apiURL + '/wp-rest/apnwp/unregister';
        var os = ionic_native_1.Device.device.platform;
        return this.storage.get('token')
            .then(function (data) {
            if (!data)
                data = '0000010000';
            if (!email)
                email = "test@test.com";
            if (!os)
                os = "android";
            var request = _this.transformRequest({ os_type: os, user_email_id: email, device_token: data });
            url = url + request;
            return _this.http.get(url);
        });
    };
    PushProvider = __decorate([
        core_1.Injectable()
    ], PushProvider);
    return PushProvider;
}());
exports.PushProvider = PushProvider;
//# sourceMappingURL=push-provider.js.map