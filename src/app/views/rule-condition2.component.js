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
var rule_automation_1 = require("../objects/rule-automation");
var rule_conditions_1 = require("../objects/rule-conditions");
var RuleConditionComponent = (function () {
    function RuleConditionComponent(ottoService) {
        var _this = this;
        this.ottoService = ottoService;
        this.debug = true;
        this.longText = "xxxxxxxxxxxxxxxx40-charsxxxxxxxxxxxxxxxx";
        this.mediumText = "xxxxxxx20-charxxxxxx";
        this.saveNeeded = false;
        // Condition options
        this.uiConditionOptions = [];
        var options = ["and", "or", "state", "numeric_state", "sun", "time", "zone"];
        for (var _i = 0, options_1 = options; _i < options_1.length; _i++) {
            var option = options_1[_i];
            this.uiConditionOptions.push({ label: option, value: option });
        }
        // Sun options
        this.uiSunOptions = [];
        options = ["null", "sunrise", "sunset"];
        for (var _a = 0, options_2 = options; _a < options_2.length; _a++) {
            var option = options_2[_a];
            this.uiSunOptions.push({ label: option, value: option });
        }
        // Time Weekday options
        this.uiTimeWeekdayOptions = [];
        options = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
        for (var _b = 0, options_3 = options; _b < options_3.length; _b++) {
            var option = options_3[_b];
            this.uiTimeWeekdayOptions.push({ label: option, value: option });
        }
        ottoService.getEntities().then(function (entities) { return _this.populateOptions(_this.uiEntityIdOptions, entities); });
        this.uiEntityIdOptions = [{ label: this.longText, value: null }];
        ottoService.getZones().then(function (zones) { return _this.populateOptions(_this.uiZoneOptions, zones); });
        this.uiZoneOptions = [{ label: this.mediumText, value: null }];
        this.saveNeeded = false;
    }
    Object.defineProperty(RuleConditionComponent.prototype, "jsonString", {
        // Properties
        get: function () { return JSON.stringify(this.condition); },
        enumerable: true,
        configurable: true
    });
    RuleConditionComponent.prototype.ngOnInit = function () {
        if (this.condition != null) {
        }
    }; // ngOnInit()
    RuleConditionComponent.prototype.populateOptions = function (option_list, options) {
        option_list.length = 0; // Clear the array
        for (var _i = 0, options_4 = options; _i < options_4.length; _i++) {
            var option = options_4[_i];
            option_list.push({ label: option, value: option });
        }
    };
    RuleConditionComponent.prototype.onConditionChange = function () {
        console.log("condition change");
        // When the platform changes, we just re-intitialize the condition
        if (this.condition.condition == 'state') {
            this.replaceCondition(new rule_conditions_1.StateCondition(null, null));
        }
        else if (this.condition.condition == 'numeric_state') {
            this.replaceCondition(new rule_conditions_1.NumericStateCondition(null));
        }
        else if (this.condition.condition == 'sun') {
            this.replaceCondition(new rule_conditions_1.SunCondition());
        }
        else if (this.condition.condition == 'time') {
            this.replaceCondition(new rule_conditions_1.TimeCondition());
        }
        else if (this.condition.condition == 'zone') {
            this.replaceCondition(new rule_conditions_1.ZoneCondition(null, null));
        }
        else if (this.condition.condition == 'and') {
            this.replaceCondition(new rule_conditions_1.AndCondition());
        }
        else if (this.condition.condition == 'or') {
            this.replaceCondition(new rule_conditions_1.OrCondition());
        }
        // this.saveNeeded = true;
    };
    RuleConditionComponent.prototype.replaceCondition = function (newCondition) {
        if (this.parentCondition != null) {
            this.parentCondition[this.parentIndex] = newCondition;
        }
        else {
            this.rule.add_condition(newCondition);
        }
    };
    RuleConditionComponent.prototype.onChange = function () {
        // console.log(this.uiTimeWeekday);
        // this.checkSaveNeeded();
    };
    //   checkSaveNeeded(): void {
    //     let needed = false;
    //     if (this.condition == null) {   // New trigger not yet saved
    //       this.saveNeeded = true;
    //       return;
    //     }
    //     if (this.uiCondition != this.condition.condition) { needed = true; }
    //     if (
    //       (this.condition instanceof StateCondition) || 
    //       (this.condition instanceof NumericStateCondition) ||
    //       (this.condition instanceof ZoneCondition)
    //     ) {
    //         if (this.uiEntityId != this.condition.entity_id) { needed = true;}
    //     }
    //     if (this.condition instanceof StateCondition) {
    //       if (this.uiState != this.condition.state) { needed = true; }
    //     }
    //     else if (this.condition instanceof NumericStateCondition) {
    //       if (this.uiAboveValue != this.condition.above_value) { needed = true; }
    //       if (this.uiBelowValue != this.condition.below_value) { needed = true; }
    //     }
    //     else if (this.condition instanceof SunCondition) {
    //       if (this.uiSunAfter != this.condition.after) { needed = true; }
    //       if (this.uiSunAfterOffset != this.condition.after_offset) { needed = true; }
    //       if (this.uiSunBefore != this.condition.before) { needed = true; }
    //       if (this.uiSunBeforeOffset != this.condition.before_offset) { needed = true; }
    //     }
    //     else if (this.condition instanceof TimeCondition) {
    //       if (this.uiTimeAfter != this.condition.after) { needed = true; }
    //       if (this.uiTimeBefore != this.condition.before) { needed = true; }
    //       if (this.uiTimeWeekday != this.condition.weekday) { needed = true; }
    //     }
    //     else if (this.condition instanceof ZoneCondition) {
    //       if (this.uiZone != this.condition.zone) { needed = true; }
    //     }
    //     else if (
    //       (this.condition instanceof AndCondition) ||
    //       (this.condition instanceof OrCondition)
    //     ) {
    //       if (this.uiNestedConditions.length != this.condition.conditions.length) { needed = true; }
    //     }
    //     this.saveNeeded = needed;
    //   }
    RuleConditionComponent.prototype.onSaveClick = function () {
    };
    RuleConditionComponent.prototype.onAddClick = function () {
        console.log("Add Condition clicked");
        if ((this.condition instanceof rule_conditions_1.AndCondition) || (this.condition instanceof rule_conditions_1.OrCondition)) {
            if (this.condition.conditions == null) {
                this.condition.conditions = [];
            }
            // Use AndCondition as a placeholder condition since its very simple
            this.condition.conditions.push(new rule_conditions_1.AndCondition());
        }
    };
    RuleConditionComponent.prototype.onRemoveClick = function () {
        if (this.parentCondition == null) {
            this.rule.remove_condition();
        }
        else if ((this.parentCondition instanceof rule_conditions_1.AndCondition) ||
            (this.parentCondition instanceof rule_conditions_1.OrCondition)) {
            this.parentCondition.conditions.splice(this.parentIndex, 1);
        }
    };
    return RuleConditionComponent;
}()); // class RuleConditionComponent
__decorate([
    core_1.Input(),
    __metadata("design:type", rule_conditions_1.RuleCondition)
], RuleConditionComponent.prototype, "condition", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", rule_automation_1.AutomationRule)
], RuleConditionComponent.prototype, "rule", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", rule_conditions_1.RuleCondition)
], RuleConditionComponent.prototype, "parentCondition", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], RuleConditionComponent.prototype, "parentIndex", void 0);
RuleConditionComponent = __decorate([
    core_1.Component({
        selector: 'rule-condition',
        templateUrl: './templates/rule-condition2.component.html',
    }),
    __metadata("design:paramtypes", [otto_rest_service_1.OttoRestService])
], RuleConditionComponent);
exports.RuleConditionComponent = RuleConditionComponent;
//# sourceMappingURL=rule-condition2.component.js.map