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
var rule_conditions_1 = require("../objects/rule-conditions");
var RuleActionSeqComponent = (function () {
    function RuleActionSeqComponent() {
        this.onRemove = new core_1.EventEmitter();
        this.debug = true;
    }
    RuleActionSeqComponent.prototype.ngOnInit = function () { };
    RuleActionSeqComponent.prototype.onRemoveSeqClick = function () {
        this.onRemove.emit();
    };
    RuleActionSeqComponent.prototype.onAddActionClick = function () {
        // this.actionSeq.sequence.push(null);
        this.actionSeq.add_action(new rule_actions_1.ServiceAction(null, null, null));
    };
    RuleActionSeqComponent.prototype.onAddConditionClick = function () {
        this.actionSeq.add_condition(new rule_conditions_1.AndCondition());
    };
    RuleActionSeqComponent.prototype.onConditionReCreate = function (newCondition) {
        // this.rule.add_condition(newCondition); // Overwrites previous condition
        this.actionSeq.replace_condition(newCondition);
    };
    RuleActionSeqComponent.prototype.onConditionRemove = function () {
        this.actionSeq.remove_condition();
    };
    RuleActionSeqComponent.prototype.onActionReCreate = function (newAction, index) {
        console.log("Recreating action at index: " + index);
        this.actionSeq.replace_action(index, newAction);
    };
    RuleActionSeqComponent.prototype.onActionRemove = function (index) {
        this.actionSeq.remove_action(index);
    };
    return RuleActionSeqComponent;
}()); // class RuleActionSeqComponent
__decorate([
    core_1.Input(),
    __metadata("design:type", rule_actions_1.RuleActionSequence)
], RuleActionSeqComponent.prototype, "actionSeq", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], RuleActionSeqComponent.prototype, "onRemove", void 0);
RuleActionSeqComponent = __decorate([
    core_1.Component({
        selector: 'rule-action-seq',
        templateUrl: './templates/rule-action-seq.component.html'
    }),
    __metadata("design:paramtypes", [])
], RuleActionSeqComponent);
exports.RuleActionSeqComponent = RuleActionSeqComponent;
//# sourceMappingURL=rule-action-seq.component.js.map