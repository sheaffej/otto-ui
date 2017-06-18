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
var router_1 = require("@angular/router");
var otto_rest_service_1 = require("../services/otto-rest.service");
require("rxjs/add/operator/switchMap");
var RuleDetailComponent = (function () {
    function RuleDetailComponent(ottoService, route, 
        // private location: Location,
        router) {
        this.ottoService = ottoService;
        this.route = route;
        this.router = router;
    }
    RuleDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.ottoService.getRule(params['id']); })
            .subscribe(function (rule) { return _this.rule = rule; });
    };
    RuleDetailComponent.prototype.onGoBackClick = function () {
        this.router.navigate(['/rule-list']);
    };
    return RuleDetailComponent;
}()); // class RuleDetailComponent
RuleDetailComponent = __decorate([
    core_1.Component({
        selector: "rule-detail",
        templateUrl: "./templates/rule-detail.component.html",
    }),
    __metadata("design:paramtypes", [otto_rest_service_1.OttoRestService,
        router_1.ActivatedRoute,
        router_1.Router])
], RuleDetailComponent);
exports.RuleDetailComponent = RuleDetailComponent;
//# sourceMappingURL=rule-detail.component.js.map