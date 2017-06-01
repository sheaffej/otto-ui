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
var rule_actions_1 = require("../objects/rule-actions");
var RuleActionSeqComponent = (function () {
    function RuleActionSeqComponent() {
        this.debug = true;
    }
    RuleActionSeqComponent.prototype.ngOnInit = function () { };
    return RuleActionSeqComponent;
}()); // class RuleActionSeqComponent
__decorate([
    core_1.Input(),
    __metadata("design:type", rule_actions_1.RuleActionSequence)
], RuleActionSeqComponent.prototype, "actionSeq", void 0);
RuleActionSeqComponent = __decorate([
    core_1.Component({
        selector: 'rule-action-seq',
        templateUrl: './templates/rule-action-seq.component.html'
    }),
    __metadata("design:paramtypes", [])
], RuleActionSeqComponent);
exports.RuleActionSeqComponent = RuleActionSeqComponent;
//# sourceMappingURL=rule-action-seq.component.js.map