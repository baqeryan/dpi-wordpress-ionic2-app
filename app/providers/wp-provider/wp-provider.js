"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
require('rxjs/add/operator/map');
var constants_1 = require('../constants');
var WpProvider = (function () {
    function WpProvider(http) {
        this.http = http;
        this.apiURL = constants_1.SITE_URL + '/wp-rest/wp/v2';
    }
    WpProvider.prototype.getPosts = function (query) {
        var _this = this;
        query = this.transformRequest(query);
        var url = this.apiURL + "/posts?" + query + '&_embed';
        return this.http.get(url)
            .map(function (data) {
            var posts = data.json();
            posts.forEach(function (post) {
                if (post.featured_media) {
                    post.featuredMedia = _this.getMedia(post.featured_media);
                }
            });
            return posts;
        });
    };
    WpProvider.prototype.getMedia = function (id) {
        return this.http.get(this.apiURL + ("/media/" + id)).map(function (data) { return data.json(); });
    };
    WpProvider.prototype.getPages = function () {
        return this.http.get(this.apiURL + '/pages').map(function (data) { return data.json(); });
    };
    WpProvider.prototype.getCategories = function () {
        return this.http.get(this.apiURL + '/categories').map(function (data) { return data.json(); });
    };
    WpProvider.prototype.transformRequest = function (obj) {
        var p, str;
        str = [];
        for (p in obj) {
            str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
        }
        return str.join('&');
    };
    WpProvider = __decorate([
        core_1.Injectable()
    ], WpProvider);
    return WpProvider;
}());
exports.WpProvider = WpProvider;
//# sourceMappingURL=wp-provider.js.map