"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ionic_angular_1 = require('ionic-angular');
var UtilProvider = (function () {
    function UtilProvider() {
    }
    UtilProvider.prototype.getLoader = function (content) {
        var loading = ionic_angular_1.Loading.create({
            content: content,
            duration: 3000
        });
        return loading;
    };
    UtilProvider.prototype.getToast = function (message) {
        var toast = ionic_angular_1.Toast.create({
            message: message,
            duration: 2000
        });
        return toast;
    };
    UtilProvider = __decorate([
        core_1.Injectable()
    ], UtilProvider);
    return UtilProvider;
}());
exports.UtilProvider = UtilProvider;
//# sourceMappingURL=util-provider.js.map