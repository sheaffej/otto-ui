"use strict";
var DataFieldsObject = (function () {
    function DataFieldsObject(obj) {
        var _this = this;
        this.obj = {};
        this.toJSON = function () {
            return _this.obj;
        };
        this.obj = obj;
    }
    DataFieldsObject.prototype.addField = function (key, value) {
        this.obj[key] = value;
    };
    DataFieldsObject.prototype.removeField = function (key) {
        delete this.obj[key];
    };
    DataFieldsObject.prototype.getValue = function (key) {
        return this.obj[key];
    };
    DataFieldsObject.prototype.setValue = function (key, value) {
        this.obj[key] = value;
    };
    Object.defineProperty(DataFieldsObject.prototype, "keys", {
        get: function () {
            var keys = [];
            for (var key in this.obj) {
                keys.push(key);
            }
            return keys;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataFieldsObject.prototype, "fields", {
        get: function () {
            var fields = [];
            for (var _i = 0, _a = this.keys; _i < _a.length; _i++) {
                var key = _a[_i];
                fields.push(new DataField(key, this.obj[key]));
            }
            return fields;
        },
        enumerable: true,
        configurable: true
    });
    return DataFieldsObject;
}()); // class DataFieldsObject
exports.DataFieldsObject = DataFieldsObject;
var DataField = (function () {
    function DataField(key, value) {
        this.key = key;
        this.value = value;
    }
    return DataField;
}()); // class DataField
exports.DataField = DataField;
//# sourceMappingURL=data-fields.js.map