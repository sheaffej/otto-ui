"use strict";
var ServiceDomain = (function () {
    function ServiceDomain(domain) {
        this.domain = domain;
        this.services = [];
    }
    ServiceDomain.prototype.addService = function (service) {
        this.services.push(service);
    };
    ServiceDomain.fromRestResponse = function (response) {
        var domains = [];
        for (var _i = 0, response_1 = response; _i < response_1.length; _i++) {
            var domain = response_1[_i];
            var domain_name = domain.domain;
            var newDomain = new ServiceDomain(domain_name);
            for (var _a = 0, _b = domain.services; _a < _b.length; _a++) {
                var service_obj = _b[_a];
                var service = new Service(domain_name, service_obj.service, service_obj.description);
                for (var _c = 0, _d = service_obj.fields; _c < _d.length; _c++) {
                    var field = _d[_c];
                    service.fields.push(new ServiceField(field.name, field.description, field.example));
                }
                newDomain.addService(service);
            }
            domains.push(newDomain);
        }
        return domains;
    };
    return ServiceDomain;
}()); // class ServiceDomain
exports.ServiceDomain = ServiceDomain;
var Service = (function () {
    function Service(domain, service_name, description) {
        this.domain = domain;
        this.service_name = service_name;
        this.description = description;
        this.fields = [];
    }
    Service.prototype.addField = function (field) {
        this.fields.push(field);
    };
    return Service;
}()); // class Service
exports.Service = Service;
var ServiceField = (function () {
    function ServiceField(name, description, example) {
        this.name = name;
        this.description = description;
        this.example = example;
    }
    return ServiceField;
}()); // class ServiceField
exports.ServiceField = ServiceField;
//# sourceMappingURL=services.js.map