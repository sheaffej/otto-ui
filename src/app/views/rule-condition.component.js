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
        options = ["sunrise", "sunset"];
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
            this.uiCondition = this.condition.condition;
            if (this.condition instanceof rule_conditions_1.StateCondition) {
                this.uiEntityId = this.condition.entity_id;
                this.uiState = this.condition.state;
            }
            else if (this.condition instanceof rule_conditions_1.NumericStateCondition) {
                this.uiEntityId = this.condition.entity_id;
                this.uiAboveValue = this.condition.above_value;
                this.uiBelowValue = this.condition.below_value;
            }
            else if (this.condition instanceof rule_conditions_1.SunCondition) {
                this.uiSunAfter = this.condition.after;
                this.uiSunAfterOffset = this.condition.after_offset;
                this.uiSunBefore = this.condition.before;
                this.uiSunBeforeOffset = this.condition.before_offset;
            }
            else if (this.condition instanceof rule_conditions_1.TimeCondition) {
                this.uiTimeAfter = this.condition.after;
                this.uiTimeBefore = this.condition.before;
                this.uiTimeWeekday = this.condition.weekday;
            }
            else if (this.condition instanceof rule_conditions_1.ZoneCondition) {
                this.uiEntityId = this.condition.entity_id;
                this.uiZone = this.condition.zone;
            }
            else if ((this.condition instanceof rule_conditions_1.AndCondition) ||
                (this.condition instanceof rule_conditions_1.OrCondition)) {
                this.uiNestedConditions = this.condition.conditions;
            }
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
        this.checkSaveNeeded();
    };
    RuleConditionComponent.prototype.onChange = function () {
        console.log(this.uiTimeWeekday);
        this.checkSaveNeeded();
    };
    RuleConditionComponent.prototype.checkSaveNeeded = function () {
    };
    RuleConditionComponent.prototype.onSaveClick = function () {
    };
    RuleConditionComponent.prototype.onRemoveClick = function () {
    };
    return RuleConditionComponent;
}()); // class RuleConditionComponent
__decorate([
    core_1.Input(),
    __metadata("design:type", rule_conditions_1.RuleCondition)
], RuleConditionComponent.prototype, "condition", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", rule_conditions_1.RuleCondition)
], RuleConditionComponent.prototype, "parentCondition", void 0);
RuleConditionComponent = __decorate([
    core_1.Component({
        selector: 'rule-condition',
        templateUrl: './templates/rule-condition.component.html',
    }),
    __metadata("design:paramtypes", [otto_rest_service_1.OttoRestService])
], RuleConditionComponent);
exports.RuleConditionComponent = RuleConditionComponent;
//# sourceMappingURL=rule-condition.component.js.map