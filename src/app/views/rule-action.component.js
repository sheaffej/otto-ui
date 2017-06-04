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
        var _this = this;
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
        // Domain & Service Options
        this.uiDomainOptions = [{ label: this.longText, value: '' }]; // Don't set to null, as that is
        this.uiServiceOptions = [{ label: this.longText, value: '' }]; // the default value, set to '' instead
        ottoService.getServices().then(function (domains) { return _this.processServiceDomains(domains); });
    }
    RuleAction.prototype.ngOnInit = function () {
        if (this.action != null) {
            if (this.action instanceof rule_actions_1.ServiceAction) {
                console.log("I am a ServiceAction");
                this.uiActionType = "service";
                this.uiDomain = this.action.domain;
                this.uiService = this.action.service;
                console.log(this.uiService);
                this.uiDataObj = JSON.stringify(this.action.data);
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
    RuleAction.prototype.processServiceDomains = function (domains) {
        this.serviceDomains = domains;
        this.populateDomainOptions(); // This will also call populateServiceOptions
    };
    RuleAction.prototype.populateDomainOptions = function () {
        var _this = this;
        var curUiDomain = this.uiDomain;
        this.uiDomain = null;
        this.uiDomainOptions.length = 0; // Clear the array    
        this.serviceDomains.map(function (domain) { return _this.uiDomainOptions.push({ label: domain.domain, value: domain.domain }); });
        // Re-select dropdown
        if (this.action instanceof rule_actions_1.ServiceAction) {
            setTimeout(function () {
                _this.uiDomain = curUiDomain;
                _this.populateServiceOptions(); // Re-popluate Service Options
            }, 100);
        }
    };
    RuleAction.prototype.populateServiceOptions = function () {
        var _this = this;
        if ((this.serviceDomains != null) && (this.uiDomain != null)) {
            var curUiService_1 = this.uiService;
            this.uiService = null;
            this.uiServiceOptions.length = 0; // Clear the array
            this.serviceDomains
                .filter(function (domain) { return domain.domain == _this.uiDomain; })[0] // Return only 1 domain
                .services.map(function (service) { return _this.uiServiceOptions.push({ label: service.service_name, value: service.service_name }); });
            // Re-select the dropdown
            if (this.action instanceof rule_actions_1.ServiceAction) {
                setTimeout(function () { return _this.uiService = curUiService_1; }, 100);
            }
        }
    };
    RuleAction.prototype.onActionTypeChange = function () {
        // When the actionType changes, we just re-intitialize the action
        console.log("Action type changed: " + this.uiActionType);
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
        }
        this.recreateAction();
    };
    RuleAction.prototype.onDomainChange = function () {
        console.log("Domain Change => " + this.uiDomain);
        // Update Service Options based on the current domain
        this.uiService = '';
        this.populateServiceOptions();
        this.onChange();
    };
    RuleAction.prototype.onChange = function () {
        this.recreateAction();
    };
    RuleAction.prototype.onRemoveClick = function () {
        // throw new Error("onRemoveClick not implemented");
        this.parentSeq.sequence.splice(this.parentIndex, 1);
    };
    RuleAction.prototype.recreateAction = function () {
        // When the action changes, we just re-intitialize the action
        if (this.uiActionType == 'service') {
            this.replaceAction(new rule_actions_1.ServiceAction(this.uiDomain, this.uiService, JSON.parse(this.uiDataObj)));
        }
        else if (this.uiActionType == 'condition') {
            // Do nothing since Condition has its own component with its own uiXXX elements
            this.replaceAction(new rule_actions_1.ConditionAction(new rule_conditions_1.AndCondition()));
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