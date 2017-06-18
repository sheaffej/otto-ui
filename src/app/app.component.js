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
var otto_rest_service_1 = require("./services/otto-rest.service");
var AppComponent = (function () {
    function AppComponent(ottoService) {
        this.ottoService = ottoService;
        this.title = 'Ottomation UI';
        // Populate the OttoRestService caches
        this.ottoService.getServices();
        this.ottoService.getEntities();
        this.ottoService.getRules();
    }
    AppComponent.prototype.ngOnInit = function () { };
    return AppComponent;
}()); // class AppComponent
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        template: "\n  <div class=\"text-center\">\n    <h1 class=\"title\">{{title}}</h1>\n  </div>\n  <router-outlet></router-outlet>\n  ",
    }),
    __metadata("design:paramtypes", [otto_rest_service_1.OttoRestService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map