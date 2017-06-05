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
var ServiceInfoComponent = (function () {
    function ServiceInfoComponent(ottService) {
        this.ottService = ottService;
        this.debug = false;
    }
    ServiceInfoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.ottService.getServices().then(function (domains) { return _this.populateServiceInfo(domains); });
    };
    ServiceInfoComponent.prototype.populateServiceInfo = function (serviceDomains) {
        var _this = this;
        this.serviceInfo =
            serviceDomains
                .filter(function (domain) { return domain.domain === _this.domain; })[0] // Only the first
                .services.filter(function (service) { return service.service_name === _this.service; })[0]; // Only the first
    };
    return ServiceInfoComponent;
}()); // class DataFieldsComponent
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ServiceInfoComponent.prototype, "domain", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ServiceInfoComponent.prototype, "service", void 0);
ServiceInfoComponent = __decorate([
    core_1.Component({
        selector: 'service-info',
        templateUrl: './templates/service-info.component.html'
    }),
    __metadata("design:paramtypes", [otto_rest_service_1.OttoRestService])
], ServiceInfoComponent);
exports.ServiceInfoComponent = ServiceInfoComponent;
//# sourceMappingURL=service-info.component.js.map