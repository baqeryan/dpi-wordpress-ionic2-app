"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var ionic_angular_1 = require('ionic-angular');
var post_1 = require('../../components/post/post');
var post_2 = require('../post/post');
var settings_1 = require('../settings/settings');
require('rxjs/add/operator/debounceTime');
require('rxjs/add/operator/filter');
require('rxjs/add/operator/distinctUntilChanged');
var PostsPage = (function () {
    function PostsPage(params, nav, wp, up, events) {
        var _this = this;
        this.params = params;
        this.nav = nav;
        this.wp = wp;
        this.up = up;
        this.events = events;
        this.hideSearch = true;
        this.searchbar = new common_1.Control();
        this.pageCount = 1;
        this.favoriteList = [];
        this.getData = true;
        this.noMore = false;
        this.storage = new ionic_angular_1.Storage(ionic_angular_1.LocalStorage);
        this.category = {};
        this.category = this.params.get('category');
        // Getting Favorite List
        this.storage.get('favorite')
            .then(function (data) {
            if (data === null) {
                data = "[]";
            }
            _this.favoriteList = JSON.parse(data);
        });
        // Getting Settings
        this.storage.get('settings')
            .then(function (data) {
            _this.sort = JSON.parse(data).sort;
            var query = _this.createQuery();
            _this.getPosts(query);
        });
        // Search Subscription
        this.searchbar.valueChanges
            .debounceTime(2000)
            .filter(function (value) { return value.length === 0 || value.trim().length > 2; })
            .distinctUntilChanged()
            .subscribe(function (value) {
            _this.resetSettings();
            var query = _this.createQuery();
            _this.getPosts(query);
        });
        // If Sort Order Changed
        this.events.subscribe("sort:changed", function (value) {
            _this.resetSettings();
            _this.sort = value;
            var query = _this.createQuery();
            _this.getPosts(query);
        });
    }
    PostsPage.prototype.getPosts = function (query) {
        var _this = this;
        var loader = this.up.getLoader("در حال بارگذاری ...");
        this.nav.present(loader);
        this.wp.getPosts(query)
            .subscribe(function (posts) {
            _this.posts = posts;
            loader.dismiss();
        }, function (error) {
            loader.dismiss();
        });
    };
    PostsPage.prototype.loadMore = function (infinteScroll) {
        var _this = this;
        this.pageCount++;
        var query = this.createQuery();
        var toast = this.up.getToast("اخبار بیشتری یافت نشد.");
        this.wp.getPosts(query)
            .subscribe(function (posts) {
            infinteScroll.complete();
            if (posts.length < 1) {
                _this.noMore = true;
                infinteScroll.enable(!_this.noMore);
                _this.nav.present(toast);
            }
            else {
                _this.posts = _this.posts.concat(posts);
            }
        });
    };
    PostsPage.prototype.toggleSearch = function () {
        this.hideSearch = !this.hideSearch;
    };
    PostsPage.prototype.read = function (data) {
        this.nav.push(post_2.PostPage, { postData: data });
    };
    PostsPage.prototype.favorite = function (post) {
        var newPost = true;
        var toast;
        var message;
        this.favoriteList.forEach(function (favPost) {
            if (JSON.stringify(favPost) === JSON.stringify(post)) {
                newPost = false;
            }
        });
        if (newPost) {
            this.favoriteList.push(post);
            this.storage.set('favorite', JSON.stringify(this.favoriteList));
            message = "به لیست علاقه مندی ها اقزوده شد.";
        }
        else {
            message = "قبلا به لیست اضافه شده بود";
        }
        toast = this.up.getToast(message);
        this.nav.present(toast);
    };
    PostsPage.prototype.openSettings = function () {
        this.nav.push(settings_1.SettingsPage);
    };
    PostsPage.prototype.resetSettings = function () {
        this.noMore = false;
        this.pageCount = 1;
    };
    PostsPage.prototype.createQuery = function () {
        var query = {};
        query['page'] = this.pageCount;
        if (this.sort) {
            query['order'] = this.sort;
        }
        if (this.searchbar.value) {
            query['search'] = this.searchbar.value;
        }
        if (this.category) {
            query['categories'] = this.category.id;
        }
        return query;
    };
    PostsPage = __decorate([
        core_1.Component({
            templateUrl: 'build/pages/posts/posts.html',
            directives: [post_1.PostCmp]
        })
    ], PostsPage);
    return PostsPage;
}());
exports.PostsPage = PostsPage;
//# sourceMappingURL=posts.js.map