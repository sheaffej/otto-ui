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
var RuleActionComponent = (function () {
    function RuleActionComponent(ottoService) {
        this.ottoService = ottoService;
        // @Input() parentSeq: RuleActionSequence;
        // @Input() parentIndex: number;
        this.onReCreate = new core_1.EventEmitter();
        this.onRemove = new core_1.EventEmitter();
        this.debug = true;
        this.longText = "xxxxxxxxxxxxxxxx40-charsxxxxxxxxxxxxxxxx";
    }
    RuleActionComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Action Type Options
        this.uiActionTypeOptions = [];
        var options = ["service", "delay", "condition"];
        for (var _i = 0, options_1 = options; _i < options_1.length; _i++) {
            var option = options_1[_i];
            this.uiActionTypeOptions.push({ label: option, value: option });
        }
        // Domain & Service Options
        this.uiDomainOptions = [{ label: this.longText, value: '' }]; // Don't set to null, as that is
        this.uiServiceOptions = [{ label: this.longText, value: '' }]; // the default value, set to '' instead
        this.ottoService.getServices().then(function (domains) { return _this.processServiceDomains(domains); });
        // Initialize uiXXX properties
        if (this.action != null) {
            if (this.action instanceof rule_actions_1.ServiceAction) {
                // console.log("I am a ServiceAction");
                this.uiActionType = "service";
                this.uiDomain = this.action.domain;
                this.uiService = this.action.service;
                // console.log(this.uiService);
                // this.uiDataObj = JSON.stringify(this.action.data);
                this.uiDataObj = this.action.data;
            }
            else if (this.action instanceof rule_actions_1.DelayAction) {
                this.uiActionType = "delay";
                this.uiDelay = this.action.delay;
            }
            else if (this.action instanceof rule_actions_1.ConditionAction) {
                this.uiActionType = "condition";
            }
        }
    };
    RuleActionComponent.prototype.processServiceDomains = function (domains) {
        this.serviceDomains = domains;
        this.populateDomainOptions(); // This will also call populateServiceOptions
        this.populateServiceOptions();
    };
    RuleActionComponent.prototype.populateDomainOptions = function () {
        var _this = this;
        this.uiDomainOptions.length = 0; // Clear the array    
        this.serviceDomains.map(function (domain) { return _this.uiDomainOptions.push({ label: domain.domain, value: domain.domain }); });
        // Re-select dropdown
        // if (this.action instanceof ServiceAction) {
        //   let curUiDomain = this.uiDomain;
        //   this.uiDomain = null;
        //   setTimeout(() => {
        //     this.uiDomain = curUiDomain;
        //     this.populateServiceOptions();  // Re-popluate Service Options
        //   }, 0);
        // }
    };
    RuleActionComponent.prototype.populateServiceOptions = function () {
        var _this = this;
        if ((this.serviceDomains != null) && (this.uiDomain != null)) {
            this.uiServiceOptions.length = 0; // Clear the array
            this.serviceDomains
                .filter(function (domain) { return domain.domain == _this.uiDomain; })[0] // Return only 1 domain
                .services.map(function (service) { return _this.uiServiceOptions.push({ label: service.service_name, value: service.service_name }); });
        }
    };
    RuleActionComponent.prototype.onActionTypeChange = function () {
        // When the actionType changes, we just re-intitialize the action
        console.log("Action type changed: " + this.uiActionType);
        // Set the uiXXX fields to initial values
        if (this.uiActionType == 'service') {
            this.uiDomain = null;
            this.uiService = null;
            // this.uiDataObj = JSON.stringify({});
            this.uiDataObj = null;
        }
        else if (this.uiActionType == 'delay') {
            this.uiDelay = null;
        }
        else if (this.uiActionType == 'condition') {
        }
        this.recreateAction();
    };
    RuleActionComponent.prototype.onDomainChange = function () {
        console.log("Domain Change => " + this.uiDomain);
        // Update Service Options based on the current domain
        this.uiService = '';
        this.populateServiceOptions();
        this.onChange();
    };
    RuleActionComponent.prototype.onChange = function () {
        this.recreateAction();
    };
    RuleActionComponent.prototype.onRemoveClick = function () {
        // throw new Error("onRemoveClick not implemented");
        // this.parentSeq.sequence.splice(this.parentIndex, 1);
        this.onRemove.emit();
    };
    RuleActionComponent.prototype.recreateAction = function () {
        // When the action changes, we just re-intitialize the action
        if (this.uiActionType == 'service') {
            // console.log(this.uiDataObj);
            // if (this.uiDataObj == null) { 
            //   // console.log("uiDataObj was null");
            //   this.uiDataObj = {}; 
            // }
            // console.log(this.uiDataObj);
            this.replaceAction(new rule_actions_1.ServiceAction(this.uiDomain, this.uiService, this.uiDataObj));
        }
        else if (this.uiActionType == 'condition') {
            // Do nothing since Condition has its own component with its own uiXXX elements
            this.replaceAction(new rule_actions_1.ConditionAction(new rule_conditions_1.AndCondition()));
        }
        else if (this.uiActionType == 'delay') {
            this.replaceAction(new rule_actions_1.DelayAction(this.uiDelay));
        }
    };
    RuleActionComponent.prototype.replaceAction = function (newAction) {
        // if (this.parentSeq == null) {
        // console.log("ERROR: this.parent is NULL in replaceCondition");
        // }
        // this.parentSeq.replace_action(this.parentIndex, newAction);
        this.onReCreate.emit(newAction);
    };
    RuleActionComponent.prototype.onConditionReCreate = function (newCondition) {
        // this.rule.add_condition(newCondition); // Overwrites previous condition
        if (this.action instanceof rule_actions_1.ConditionAction) {
            this.action.condition = newCondition;
        }
    };
    RuleActionComponent.prototype.onConditionRemove = function () {
        // this.rule.remove_condition();
        // this.actionSeq.condition.remove_condition(index);
        //  NEED TO IMPLEMENT
        //  Emit event to remove this action from parent
    };
    RuleActionComponent.prototype.onDataChange = function (newObj) {
        console.log("onDataChange(): " + JSON.stringify(newObj));
        this.uiDataObj = newObj;
        this.onChange();
    };
    return RuleActionComponent;
}()); // class RuleAction
__decorate([
    core_1.Input(),
    __metadata("design:type", rule_actions_1.RuleActionItem)
], RuleActionComponent.prototype, "action", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], RuleActionComponent.prototype, "onReCreate", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], RuleActionComponent.prototype, "onRemove", void 0);
RuleActionComponent = __decorate([
    core_1.Component({
        selector: 'rule-action',
        templateUrl: './templates/rule-action.component.html'
    }),
    __metadata("design:paramtypes", [otto_rest_service_1.OttoRestService])
], RuleActionComponent);
exports.RuleActionComponent = RuleActionComponent;
//# sourceMappingURL=rule-action.component.js.map