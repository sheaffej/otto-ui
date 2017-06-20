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
var DataFieldsComponent = (function () {
    function DataFieldsComponent(ottoService) {
        this.ottoService = ottoService;
        this.onChange = new core_1.EventEmitter();
        this.debug = true;
        this.longText = "xxxxxxxxxxxxxxxx40-charsxxxxxxxxxxxxxxxx";
        this.keyFieldLength = 15;
        this.valFieldLength = 50;
        console.log("DataFieldsComponent constructor");
    }
    DataFieldsComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Initially populate the key/value arrays
        if (this.obj != null) {
            this.fieldKeys = [];
            this.fieldValues = [];
            Object.keys(this.obj)
                .forEach(function (key) {
                _this.fieldKeys.push(key);
                _this.fieldValues.push(_this.obj[key]);
            });
            // Load Entity Id Options
            this.uiEntityIdOptions = [{ label: this.longText, value: null }];
            this.ottoService.getEntities().then(function (entities) { return _this.populateEntityIdOptions(entities); });
        }
    };
    DataFieldsComponent.prototype.onKeyChange = function (index) {
        this.reCreateObject();
    };
    DataFieldsComponent.prototype.onValueChange = function (index) {
        this.reCreateObject();
    };
    DataFieldsComponent.prototype.onAddClick = function () {
        this.fieldKeys.push("");
        this.fieldValues.push("");
        this.reCreateObject();
    };
    DataFieldsComponent.prototype.onRemoveClick = function (index) {
        this.fieldKeys.splice(index, 1);
        this.fieldValues.splice(index, 1);
        this.reCreateObject();
    };
    DataFieldsComponent.prototype.reCreateObject = function () {
        var _this = this;
        var newObj = {};
        this.fieldKeys.forEach(function (key, index) {
            newObj[key] = _this.fieldValues[index];
        });
        this.onChange.emit(newObj);
        console.log("reCreateObject(): " + JSON.stringify(newObj));
    };
    DataFieldsComponent.prototype.trackByIndex = function (index, item) {
        return index;
    };
    DataFieldsComponent.prototype.populateEntityIdOptions = function (entities) {
        this.uiEntityIdOptions = [];
        var options = [];
        for (var _i = 0, entities_1 = entities; _i < entities_1.length; _i++) {
            var option = entities_1[_i];
            this.uiEntityIdOptions.push({ label: option, value: option });
        }
    };
    return DataFieldsComponent;
}()); // constructor DataFieldsComponent
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DataFieldsComponent.prototype, "obj", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], DataFieldsComponent.prototype, "onChange", void 0);
DataFieldsComponent = __decorate([
    core_1.Component({
        selector: 'data-fields',
        templateUrl: './templates/data-fields.component.html'
    }),
    __metadata("design:paramtypes", [otto_rest_service_1.OttoRestService])
], DataFieldsComponent);
exports.DataFieldsComponent = DataFieldsComponent;
//# sourceMappingURL=data-fields.component.js.map