"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ionic_angular_1 = require('ionic-angular');
var post_1 = require('../post/post');
var FavoritePage = (function () {
    function FavoritePage(nav) {
        this.nav = nav;
        this.favoriteList = [];
        this.storage = new ionic_angular_1.Storage(ionic_angular_1.LocalStorage);
    }
    FavoritePage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.storage.get('favorite')
            .then(function (data) {
            if (data !== null) {
                _this.favoriteList = JSON.parse(data);
            }
        });
    };
    FavoritePage.prototype.read = function (post) {
        this.nav.push(post_1.PostPage, { postData: post });
    };
    FavoritePage.prototype.removeFavorite = function (index) {
        this.favoriteList.splice(index, 1);
        this.storage.set('favorite', this.favoriteList);
    };
    FavoritePage = __decorate([
        core_1.Component({
            templateUrl: 'build/pages/favorite/favorite.html'
        })
    ], FavoritePage);
    return FavoritePage;
}());
exports.FavoritePage = FavoritePage;
//# sourceMappingURL=favorite.js.map