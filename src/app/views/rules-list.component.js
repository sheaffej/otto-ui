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
        this.groups = [];
    }
    RulesListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.ottoService.getRules().then(function (rules) { return _this._process_rules(rules); });
        // this.ottoService.getRules().then(rules => this.rules = rules.slice(0,1));
        // console.log('TEMP: Only displaying 1st rule');
    };
    RulesListComponent.prototype._process_rules = function (rules) {
        this.rules = rules;
        var group_dict = {};
        for (var _i = 0, rules_1 = rules; _i < rules_1.length; _i++) {
            var rule = rules_1[_i];
            if (!(rule.group in group_dict)) {
                group_dict[rule.group] = [];
            }
            group_dict[rule.group].push(rule);
        }
        for (var group in group_dict) {
            // console.log(group);
            var g = { "group": group, "rules": group_dict[group] };
            this.groups.push(g);
        }
        // console.log(JSON.stringify(this.groups));
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