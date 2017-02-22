"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ionic_angular_1 = require('ionic-angular');
var ionic_native_1 = require('ionic-native');
var tabs_1 = require('./pages/tabs/tabs');
var wp_provider_1 = require('./providers/wp-provider/wp-provider');
var push_provider_1 = require('./providers/push-provider/push-provider');
var util_provider_1 = require('./providers/util-provider/util-provider');
var constants_1 = require('./providers/constants');
var MyApp = (function () {
    function MyApp(platform, push, up) {
        this.platform = platform;
        this.push = push;
        this.up = up;
        this.rootPage = tabs_1.TabsPage;
        this.storage = new ionic_angular_1.Storage(ionic_angular_1.LocalStorage);
        this.settings = {};
        this.initializeApp();
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            var toast = _this.up.getToast("You are not connected to Internet.");
            var disconnectSubscription = ionic_native_1.Network.onDisconnect().subscribe(function () {
                _this.nav.present(toast);
            });
            ionic_native_1.GoogleAnalytics.startTrackerWithId(constants_1.GOOGLE_ANALYTICS_ID);
            _this.storage.get('settings')
                .then(function (data) {
                if (data === null) {
                    var settings = { push: true, sort: 'desc' };
                    _this.storage.set('settings', JSON.stringify(settings));
                }
            });
            ionic_native_1.StatusBar.styleDefault();
            if (_this.platform.is('mobile')) {
                _this.push.init();
            }
        });
    };
    __decorate([
        core_1.ViewChild(ionic_angular_1.Nav)
    ], MyApp.prototype, "nav");
    MyApp = __decorate([
        core_1.Component({
            templateUrl: 'build/app.html'
        })
    ], MyApp);
    return MyApp;
}());
ionic_angular_1.ionicBootstrap(MyApp, [wp_provider_1.WpProvider, push_provider_1.PushProvider, util_provider_1.UtilProvider]);
//# sourceMappingURL=app.js.map