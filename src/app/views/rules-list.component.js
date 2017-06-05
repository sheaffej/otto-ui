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
var otto_rest_service_1 = require("../services/otto-rest.service");
var RulesListComponent = (function () {
    function RulesListComponent(ottoService) {
        this.ottoService = ottoService;
        this.rules = [];
    }
    RulesListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.ottoService.getRules().then(function (rules) { return _this.rules = rules; });
    };
    return RulesListComponent;
}()); // class RulesListComponent
RulesListComponent = __decorate([
    core_1.Component({
        selector: 'rules-list',
        templateUrl: './templates/rules-list.component.html',
    }),
    __metadata("design:paramtypes", [otto_rest_service_1.OttoRestService])
], RulesListComponent);
exports.RulesListComponent = RulesListComponent;
//# sourceMappingURL=rules-list.component.js.map