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
var angular2_prettyjson_1 = require("angular2-prettyjson");
var rule_automation_1 = require("../objects/rule-automation");
var rule_conditions_1 = require("../objects/rule-conditions");
var rule_actions_1 = require("../objects/rule-actions");
var otto_rest_service_1 = require("../services/otto-rest.service");
var AutomationRuleComponent = (function () {
    function AutomationRuleComponent(ottoService) {
        this.ottoService = ottoService;
    }
    AutomationRuleComponent.prototype.ngOnInit = function () { };
    AutomationRuleComponent.prototype.onSaveClick = function () {
        console.log("Saving rule " + this.rule.id);
        this.ottoService.saveRule(this.rule)
            .then(function (resp) {
            console.log(resp);
        });
    };
    AutomationRuleComponent.prototype.onAddTriggerClick = function () {
        this.rule.add_trigger(null);
    };
    AutomationRuleComponent.prototype.onAddConditionClick = function () {
        this.rule.add_condition(new rule_conditions_1.AndCondition());
    };
    AutomationRuleComponent.prototype.onAddActionSequenceClick = function () {
        this.rule.add_action_sequence(new rule_actions_1.RuleActionSequence());
    };
    AutomationRuleComponent.prototype.onTriggerReCreate = function (newTrigger, index) {
        // console.log("Re-creating index: " + index);
        this.rule.replace_trigger(newTrigger, index);
    };
    AutomationRuleComponent.prototype.onTriggerRemove = function (index) {
        console.log("Removing index: " + index);
        this.rule.remove_trigger(index);
    };
    AutomationRuleComponent.prototype.onConditionReCreate = function (newCondition) {
        this.rule.add_condition(newCondition); // Overwrites previous condition
    };
    AutomationRuleComponent.prototype.onConditionRemove = function () {
        this.rule.remove_condition();
    };
    AutomationRuleComponent.prototype.onActionSequenceRemove = function (index) {
        this.rule.remove_action_sequence(index);
    };
    return AutomationRuleComponent;
}()); // class RuleAutomationComponent
__decorate([
    core_1.Input(),
    __metadata("design:type", rule_automation_1.AutomationRule)
], AutomationRuleComponent.prototype, "rule", void 0);
AutomationRuleComponent = __decorate([
    core_1.Component({
        selector: 'rule-automation',
        templateUrl: './templates/rule-automation.component.html',
        entryComponents: [angular2_prettyjson_1.PrettyJsonComponent],
    }),
    __metadata("design:paramtypes", [otto_rest_service_1.OttoRestService])
], AutomationRuleComponent);
exports.AutomationRuleComponent = AutomationRuleComponent;
//# sourceMappingURL=rule-automation.component.js.map