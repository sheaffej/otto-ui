"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var rule_automation_1 = require("../objects/rule-automation");
var OttoRestService = (function () {
    function OttoRestService(http) {
        this.http = http;
        this.ottoRestUrl = 'http://localhost:5000/rest';
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.rules = [];
        this.entities = [];
        this.getEntities();
    }
    OttoRestService.prototype.getRules = function () {
        if (this.rules.length == 0) {
            return this.http.get(this.ottoRestUrl + "/rules")
                .toPromise()
                .then(function (response) { return response.json().data.map(function (rule_obj) { return rule_automation_1.AutomationRule.from_object(rule_obj); }); })
                .catch(this.handleError);
        }
        return Promise.resolve(this.rules.slice()); // Return a copy of the cached rules
    };
    OttoRestService.prototype.getEntities = function () {
        var _this = this;
        if (this.entities.length == 0) {
            // console.log("getEntities getting a fresh copy");
            this.entitiesRequested = true;
            return this.http.get(this.ottoRestUrl + "/entities")
                .toPromise()
                .then(function (response) {
                _this.entities = response.json().data;
                return _this.entities;
            })
                .catch(this.handleError);
        }
        // console.log("getEntities serving a cached copy");
        return Promise.resolve(this.entities.slice()); // Return a copy of the cached entities
    };
    OttoRestService.prototype.getZones = function () {
        if (this.entities.length == 0) {
            return this.getEntities()
                .then(function (entities) { return entities.filter(function (entity) { return entity.startsWith("zone."); }); });
        }
        return Promise.resolve(this.entities.filter(function (entity) { return entity.startsWith("zone."); }));
    };
    OttoRestService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    return OttoRestService;
}());
OttoRestService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], OttoRestService);
exports.OttoRestService = OttoRestService;
//# sourceMappingURL=otto-rest.service.js.map