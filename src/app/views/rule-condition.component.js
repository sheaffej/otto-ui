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
        this.ottoService = ottoService;
        // @Input() rule: AutomationRule;
        // @Input() parent: any;
        // @Input('index') parentIndex: number;
        this.onReCreate = new core_1.EventEmitter();
        this.onRemove = new core_1.EventEmitter();
        this.debug = false;
        this.longText = "xxxxxxxxxxxxxxxx40-charsxxxxxxxxxxxxxxxx";
        this.mediumText = "xxxxxxx20-charxxxxxx";
    }
    RuleConditionComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Create Condition options
        this.uiConditionOptions = [];
        var options = ["and", "or", "state", "numeric_state", "sun", "time", "zone"];
        options.map(function (option) { return _this.uiConditionOptions.push({ label: option, value: option }); });
        // for (let option of options) {
        //   this.uiConditionOptions.push({label: option, value: option});
        // }
        // Create Sun options
        this.uiSunOptions = [];
        options = ["sunrise", "sunset"];
        options.map(function (option) { return _this.uiSunOptions.push({ label: option, value: option }); });
        // for (let option of options) {
        //   this.uiSunOptions.push({label: option, value: option});
        // }
        // Create Time Weekday options
        this.uiTimeWeekdayOptions = [];
        options = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
        options.map(function (option) { return _this.uiTimeWeekdayOptions.push({ label: option, value: option }); });
        // for (let option of options) {
        //   this.uiTimeWeekdayOptions.push({label: option, value: option});
        // }
        // Create Entity ID Options
        this.uiEntityIdOptions = [{ label: this.longText, value: null }];
        this.ottoService.getEntities().then(function (entities) { return _this.populateOptions(_this.uiEntityIdOptions, entities); });
        // Create Zone Options
        this.uiZoneOptions = [{ label: this.mediumText, value: null }];
        this.ottoService.getZones().then(function (zones) { return _this.populateOptions(_this.uiZoneOptions, zones); });
        // Initialize uiXXX components
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
            else if (this.condition instanceof rule_conditions_1.ParentCondition) {
                this.uiNestedConditions = this.condition.conditions;
            }
        }
    }; // ngOnInit()
    RuleConditionComponent.prototype.populateOptions = function (option_list, options) {
        option_list.length = 0; // Clear the array
        for (var _i = 0, options_1 = options; _i < options_1.length; _i++) {
            var option = options_1[_i];
            option_list.push({ label: option, value: option });
        }
    };
    RuleConditionComponent.prototype.onConditionChange = function () {
        // When the platform changes, we just re-intitialize the condition
        // Set the uiXXX fields to initial values
        if (this.uiCondition == 'state') {
            this.uiEntityId = null;
            this.uiState = null;
        }
        else if (this.uiCondition == 'numeric_state') {
            this.uiEntityId = null;
            this.uiAboveValue = null;
            this.uiBelowValue = null;
        }
        else if (this.uiCondition == 'sun') {
            this.uiSunAfter = null;
            this.uiSunAfterOffset = null;
            this.uiSunBefore = null;
            this.uiSunBeforeOffset = null;
        }
        else if (this.uiCondition == 'time') {
            this.uiTimeAfter = null;
            this.uiTimeBefore = null;
            this.uiTimeWeekday = null;
        }
        else if (this.uiCondition == 'zone') {
            this.uiEntityId = null;
            this.uiZone = null;
        }
        else if ((this.uiCondition == 'and') || (this.uiCondition == 'or')) {
            this.uiNestedConditions = []; // initialize to an empty array
        }
        // Now recreate the condition
        this.recreateCondition();
    };
    RuleConditionComponent.prototype.onChange = function () {
        this.recreateCondition();
    };
    RuleConditionComponent.prototype.recreateCondition = function () {
        // When the condition changes, we just re-intitialize the condition
        if (this.uiCondition == 'state') {
            this.replaceCondition(new rule_conditions_1.StateCondition(this.uiEntityId, this.uiState));
        }
        else if (this.uiCondition == 'numeric_state') {
            this.replaceCondition(new rule_conditions_1.NumericStateCondition(this.uiEntityId, this.uiAboveValue, this.uiBelowValue));
        }
        else if (this.uiCondition == 'sun') {
            this.replaceCondition(new rule_conditions_1.SunCondition(this.uiSunAfter, this.uiSunBefore, this.uiSunAfterOffset, this.uiSunBeforeOffset));
        }
        else if (this.uiCondition == 'time') {
            this.replaceCondition(new rule_conditions_1.TimeCondition(this.uiTimeAfter, this.uiTimeBefore, this.uiTimeWeekday));
        }
        else if (this.uiCondition == 'zone') {
            this.replaceCondition(new rule_conditions_1.ZoneCondition(this.uiEntityId, this.uiZone));
        }
        else if (this.uiCondition == 'and') {
            this.replaceCondition(new rule_conditions_1.AndCondition());
        }
        else if (this.uiCondition == 'or') {
            this.replaceCondition(new rule_conditions_1.OrCondition());
        }
    };
    RuleConditionComponent.prototype.replaceCondition = function (newCondition) {
        // if (this.parent == null) {
        //   console.log("ERROR: this.parent is NULL in replaceCondition");
        // }
        // if (this.parent instanceof AutomationRule) {
        //   this.parent.add_condition(newCondition);    // Add overwrites previous condition
        // }
        // else if ((this.parent instanceof AndCondition) || (this.parent instanceof OrCondition)) {
        //   this.parent.conditions[this.parentIndex] = newCondition;
        // }
        // else if (this.parent instanceof RuleActionSequence) {
        //   this.parent.condition = newCondition;
        // }
        // else if (this.parent instanceof ConditionAction) {
        //   this.parent.replaceCondition(newCondition);
        // }
        this.onReCreate.emit(newCondition);
    };
    RuleConditionComponent.prototype.onAddClick = function () {
        // console.log("Add Condition clicked");
        if (this.condition instanceof rule_conditions_1.ParentCondition) {
            if (this.condition.conditions == null) {
                this.condition.conditions = [];
            }
            // this.condition.conditions.push(null);
            this.condition.add_condition(null);
        }
    };
    RuleConditionComponent.prototype.onRemoveClick = function () {
        // if (this.parent == null) {
        //   console.log("ERROR: this.parent is NULL in onRemoveClick");
        //   return;
        // }
        // if (this.parent instanceof AutomationRule) {
        //   this.parent.remove_condition();
        // }
        // else if (
        //   (this.parent instanceof AndCondition) ||
        //   (this.parent instanceof OrCondition)
        // ){
        //   this.parent.conditions.splice(this.parentIndex, 1);
        // }
        this.onRemove.emit();
    };
    RuleConditionComponent.prototype.onConditionReCreate = function (newCondition, index) {
        // this.rule.add_condition(newCondition); // Overwrites previous condition
        if (this.condition instanceof rule_conditions_1.ParentCondition) {
            this.condition.replace_condition(newCondition, index);
        }
    };
    RuleConditionComponent.prototype.onConditionRemove = function (index) {
        // this.rule.remove_condition();
        if (this.condition instanceof rule_conditions_1.ParentCondition) {
            this.condition.remove_condition(index);
        }
    };
    return RuleConditionComponent;
}()); // class RuleConditionComponent
__decorate([
    core_1.Input(),
    __metadata("design:type", rule_conditions_1.RuleCondition)
], RuleConditionComponent.prototype, "condition", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], RuleConditionComponent.prototype, "onReCreate", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], RuleConditionComponent.prototype, "onRemove", void 0);
RuleConditionComponent = __decorate([
    core_1.Component({
        selector: 'rule-condition',
        templateUrl: './templates/rule-condition.component.html',
    }),
    __metadata("design:paramtypes", [otto_rest_service_1.OttoRestService])
], RuleConditionComponent);
exports.RuleConditionComponent = RuleConditionComponent;
//# sourceMappingURL=rule-condition.component.js.map