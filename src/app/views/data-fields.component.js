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
var DataFieldsComponent = (function () {
    function DataFieldsComponent() {
        this.debug = true;
        console.log("DataFieldsComponent constructor");
    }
    DataFieldsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.fieldKeys = [];
        this.fieldValues = [];
        Object.keys(this.obj)
            .forEach(function (key) {
            _this.fieldKeys.push(key);
            _this.fieldValues.push(_this.obj[key]);
        });
    };
    DataFieldsComponent.prototype.onKeyChange = function (event, index) {
        console.log(JSON.stringify(event));
    };
    DataFieldsComponent.prototype.onKeyBlur = function (event, index) {
        console.log("blur " + this.fieldKeys[index]);
    };
    DataFieldsComponent.prototype.onKeyUp = function (event) {
        console.log("Up " + JSON.stringify(event));
    };
    DataFieldsComponent.prototype.keyTrackByFn = function (index, item) {
        return index;
    };
    return DataFieldsComponent;
}()); // constructor DataFieldsComponent
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DataFieldsComponent.prototype, "obj", void 0);
DataFieldsComponent = __decorate([
    core_1.Component({
        selector: 'data-fields',
        templateUrl: './templates/data-fields.component.html'
    }),
    __metadata("design:paramtypes", [])
], DataFieldsComponent);
exports.DataFieldsComponent = DataFieldsComponent;
//# sourceMappingURL=data-fields.component.js.map