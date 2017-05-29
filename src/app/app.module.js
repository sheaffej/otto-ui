"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
var animations_1 = require("@angular/platform-browser/animations");
var primeng_1 = require("primeng/primeng");
var app_component_1 = require("./app.component");
var rules_list_component_1 = require("./views/rules-list.component");
var rule_condition_component_1 = require("./views/rule-condition.component");
var rule_trigger_component_1 = require("./views/rule-trigger.component");
var otto_rest_service_1 = require("./services/otto-rest.service");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            http_1.HttpModule,
            forms_1.FormsModule,
            animations_1.BrowserAnimationsModule,
            primeng_1.DropdownModule,
            primeng_1.InputTextModule,
            primeng_1.SpinnerModule,
            primeng_1.ButtonModule,
            primeng_1.SelectButtonModule,
            primeng_1.InputMaskModule,
        ],
        declarations: [
            app_component_1.AppComponent,
            rules_list_component_1.RulesListComponent,
            rule_condition_component_1.RuleConditionComponent,
            rule_trigger_component_1.RuleTriggerComponent,
            rule_condition_component_1.RuleConditionComponent,
        ],
        providers: [otto_rest_service_1.OttoRestService],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map