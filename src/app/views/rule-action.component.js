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
var otto_rest_service_1 = require("../services/otto-rest.service");
var RuleAction = (function () {
    function RuleAction(ottoService) {
        this.ottoService = ottoService;
        this.debug = true;
        this.longText = "xxxxxxxxxxxxxxxx40-charsxxxxxxxxxxxxxxxx";
        // Action Type Options
        this.uiActionTypeOptions = [];
        var options = ["service", "delay", "condition"];
        for (var _i = 0, options_1 = options; _i < options_1.length; _i++) {
            var option = options_1[_i];
            this.uiActionTypeOptions.push({ label: option, value: option });
        }
        // Domain Options
        // Service Options
    }
    RuleAction.prototype.ngOnInit = function () {
    };
    RuleAction.prototype.populateOptions = function (option_list, options) {
        option_list.length = 0; // Clear the array
        for (var _i = 0, options_2 = options; _i < options_2.length; _i++) {
            var option = options_2[_i];
            option_list.push({ label: option, value: option });
        }
    };
    RuleAction.prototype.onActionTypeChange = function () {
        // When the actionType changes, we just re-intitialize the action
        // Set the uiXXX fields to initial values
        if (this.uiActionType == 'service') {
            this.uiDomain = null;
            this.uiService = null;
            this.uiDataObj = {};
        }
        else if (this.uiActionType == 'delay') {
            this.uiDelay = null;
        }
        else if (this.uiActionType == 'condition') {
            // A ConditionAction has no uiXXX elements
            // because all the uiXXX elements are in the RuleCondition (not RuleActionItem).
            // So just create a new, default ConditionAction/AndCondition
            this.action = new rule_actions_1.ConditionAction(new rule_conditions_1.AndCondition());
        }
        this.recreateAction();
    };
    RuleAction.prototype.onChange = function () {
        this.recreateAction();
    };
    RuleAction.prototype.onRemoveClick = function () {
        throw new Error("onRemoveClick not implemented");
    };
    RuleAction.prototype.recreateAction = function () {
        // When the action changes, we just re-intitialize the action
        if (this.uiActionType == 'service') {
            this.replaceAction(new rule_actions_1.ServiceAction(this.uiDomain, this.uiService, this.uiDataObj));
        }
        else if (this.uiActionType == 'numeric_state') {
        }
        else if (this.uiActionType == 'delay') {
            this.replaceAction(new rule_actions_1.DelayAction(this.uiDelay));
        }
    };
    RuleAction.prototype.replaceAction = function (newAction) {
        if (this.parentSeq == null) {
            console.log("ERROR: this.parent is NULL in replaceCondition");
        }
        this.parentSeq.replace_action(this.parentIndex, newAction);
    };
    return RuleAction;
}()); // class RuleAction
__decorate([
    core_1.Input(),
    __metadata("design:type", rule_actions_1.RuleActionItem)
], RuleAction.prototype, "action", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", rule_actions_1.RuleActionSequence)
], RuleAction.prototype, "parentSeq", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], RuleAction.prototype, "parentIndex", void 0);
RuleAction = __decorate([
    core_1.Component({
        selector: 'rule-action',
        templateUrl: './templates/rule-action.component.html'
    }),
    __metadata("design:paramtypes", [otto_rest_service_1.OttoRestService])
], RuleAction);
exports.RuleAction = RuleAction;
//# sourceMappingURL=rule-action.component.js.map