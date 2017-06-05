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
var rule_triggers_1 = require("../objects/rule-triggers");
var otto_rest_service_1 = require("../services/otto-rest.service");
var RuleTriggerComponent = (function () {
    function RuleTriggerComponent(ottoService) {
        this.ottoService = ottoService;
        this.onReCreate = new core_1.EventEmitter();
        this.onRemove = new core_1.EventEmitter();
        this.debug = false;
        this.longText = "xxxxxxxxxxxxxxxx40-charsxxxxxxxxxxxxxxxx";
    }
    RuleTriggerComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Load Platform Options
        this.uiPlatformOptions = [];
        var options = ["state", "numeric_state", "event"];
        options.map(function (option) { return _this.uiPlatformOptions.push({ label: option, value: option }); });
        // Load Entity Id Options
        this.uiEntityIdOptions = [{ label: this.longText, value: null }];
        this.ottoService.getEntities().then(function (entities) { return _this.populateEntityIdOptions(entities); });
        // Load Event Type
        this.uiEventTypeOptions = [];
        options = [
            "homeassistant_start",
            "homeassistant_stop",
            "state_changed",
            "time_changed",
            "service_registered",
            "call_service",
            "service_executed",
            "platform_discovered",
            "component_loaded",
        ];
        options.map(function (option) { return _this.uiEventTypeOptions.push({ label: option, value: option }); });
        // Initialize uiXXX components
        // this.trigger = this.rule.triggers[this.triggerIndex];
        if (this.trigger != null) {
            this.uiPlatform = this.trigger.platform;
            if (this.trigger instanceof rule_triggers_1.StateTrigger) {
                this.uiEntityId = this.trigger.entity_id;
                this.uiToState = this.trigger.to;
                this.uiFromState = this.trigger.from;
            }
            else if (this.trigger instanceof rule_triggers_1.NumericStateTrigger) {
                this.uiEntityId = this.trigger.entity_id;
                this.uiAboveValue = this.trigger.above_value;
                this.uiBelowValue = this.trigger.below_value;
            }
            else if (this.trigger instanceof rule_triggers_1.EventTrigger) {
                this.uiEventType = this.trigger.event_type;
                this.uiEventDataObj = JSON.stringify(this.trigger.event_data_obj);
            }
        }
    }; // ngOnInit
    RuleTriggerComponent.prototype.populateEntityIdOptions = function (entities) {
        this.uiEntityIdOptions = [];
        var options = [];
        for (var _i = 0, entities_1 = entities; _i < entities_1.length; _i++) {
            var option = entities_1[_i];
            this.uiEntityIdOptions.push({ label: option, value: option });
        }
    };
    RuleTriggerComponent.prototype.onPlatformChange = function () {
        // When the platform changes, we just re-intitialize the trigger
        // Set the uiXXX fields to initial values
        if (this.uiPlatform == 'state') {
            this.uiEntityId = null;
            this.uiToState = null;
            this.uiFromState = null;
        }
        else if (this.uiPlatform == 'numeric_state') {
            this.uiEntityId = null;
            this.uiAboveValue = null;
            this.uiBelowValue = null;
        }
        else if (this.uiPlatform == 'event') {
            this.uiEventType = null;
            this.uiEventDataObj = '{}';
        }
        this.recreateTrigger();
    };
    RuleTriggerComponent.prototype.onChange = function () {
        this.recreateTrigger();
    };
    RuleTriggerComponent.prototype.recreateTrigger = function () {
        // When the platform changes, we just re-intitialize the trigger
        if (this.uiPlatform == 'state') {
            this.replaceTrigger(new rule_triggers_1.StateTrigger(this.uiEntityId, this.uiToState, this.uiFromState));
        }
        else if (this.uiPlatform == 'numeric_state') {
            this.replaceTrigger(new rule_triggers_1.NumericStateTrigger(this.uiEntityId, this.uiAboveValue, this.uiBelowValue));
        }
        else if (this.uiPlatform == 'event') {
            this.replaceTrigger(new rule_triggers_1.EventTrigger(this.uiEventType, JSON.parse(this.uiEventDataObj)));
        }
    };
    RuleTriggerComponent.prototype.replaceTrigger = function (trigger) {
        this.onReCreate.emit(trigger);
    };
    RuleTriggerComponent.prototype.onRemoveClick = function () {
        this.onRemove.emit();
    };
    return RuleTriggerComponent;
}()); // class RuleTriggerComponent
__decorate([
    core_1.Input(),
    __metadata("design:type", rule_triggers_1.RuleTrigger)
], RuleTriggerComponent.prototype, "trigger", void 0);
__decorate([
    core_1.Input('index'),
    __metadata("design:type", Number)
], RuleTriggerComponent.prototype, "triggerIndex", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], RuleTriggerComponent.prototype, "onReCreate", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], RuleTriggerComponent.prototype, "onRemove", void 0);
RuleTriggerComponent = __decorate([
    core_1.Component({
        selector: 'rule-trigger',
        templateUrl: './templates/rule-trigger.component.html'
    }),
    __metadata("design:paramtypes", [otto_rest_service_1.OttoRestService])
], RuleTriggerComponent);
exports.RuleTriggerComponent = RuleTriggerComponent;
//# sourceMappingURL=rule-trigger.component.js.map