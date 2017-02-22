"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ionic_native_1 = require('ionic-native');
var htmlPipe_1 = require('../../pipes/htmlPipe');
var ionic_native_2 = require('ionic-native');
var PostCmp = (function () {
    function PostCmp(wp) {
        this.wp = wp;
        this.read = new core_1.EventEmitter();
        this.favorite = new core_1.EventEmitter();
        this.featuredMedia = {};
        this.authorData = {};
        this.comments = [];
        this.favoriteList = [];
    }
    PostCmp.prototype.ngOnInit = function () {
        var _this = this;
        this.authorData = this.postData["_embedded"].author[0];
        this.postData.featuredMedia = this.postData.featuredMedia || false;
        if (this.postData.featuredMedia) {
            this.postData.featuredMedia.subscribe(function (data) {
                _this.featuredMedia = data;
            });
        }
        if (this.postData["_embedded"].replies) {
            this.comments = this.postData["_embedded"].replies[0];
        }
    };
    PostCmp.prototype.readBtn = function () {
        ionic_native_1.GoogleAnalytics.trackView(this.postData.link);
        this.read.emit({ post: this.postData, author: this.authorData, media: this.featuredMedia, comments: this.comments });
    };
    PostCmp.prototype.favoriteBtn = function () {
        this.favorite.emit({ post: this.postData, author: this.authorData, media: this.featuredMedia, comments: this.comments });
    };
    PostCmp.prototype.shareBtn = function () {
        var title = this.postData.title.rendered;
        var author = this.authorData['name'];
        var message = "\u062E\u0648\u0627\u0646\u062F\u0646 \u067E\u0633\u062A  " + title + " \u062A\u0648\u0633\u0637 " + author + ".";
        var url = this.postData.link;
        ionic_native_2.SocialSharing.share(message, "ادامه خبر", null, url);
    };
    __decorate([
        core_1.Input()
    ], PostCmp.prototype, "postData");
    __decorate([
        core_1.Output()
    ], PostCmp.prototype, "read");
    __decorate([
        core_1.Output()
    ], PostCmp.prototype, "favorite");
    PostCmp = __decorate([
        core_1.Component({
            selector: 'post',
            templateUrl: 'build/components/post/post.html',
            pipes: [htmlPipe_1.HtmlPipe]
        })
    ], PostCmp);
    return PostCmp;
}());
exports.PostCmp = PostCmp;
//# sourceMappingURL=post.js.map