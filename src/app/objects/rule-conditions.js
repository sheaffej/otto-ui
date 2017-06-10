"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RuleCondition = (function () {
    function RuleCondition(condition) {
        this.condition = condition;
    }
    RuleCondition.fromObject = function (obj) {
        var cond = null;
        if (obj.condition == 'and') {
            cond = new AndCondition();
            for (var _i = 0, _a = obj.conditions; _i < _a.length; _i++) {
                var subcond = _a[_i];
                cond.add_condition(RuleCondition.fromObject(subcond));
            }
        }
        else if (obj.condition == 'or') {
            cond = new OrCondition();
            for (var _b = 0, _c = obj.conditions; _b < _c.length; _b++) {
                var subcond = _c[_b];
                cond.add_condition(RuleCondition.fromObject(subcond));
            }
        }
        else if (obj.condition == 'numeric_state') {
            cond = new NumericStateCondition(obj.entity_id, obj.above, obj.below);
        }
        else if (obj.condition == 'state') {
            cond = new StateCondition(obj.entity_id, obj.state);
        }
        else if (obj.condition == 'sun') {
            cond = new SunCondition(obj.after, obj.before, obj.after_offest, obj.before_offset);
        }
        else if (obj.condition == 'time') {
            cond = new TimeCondition(obj.after, obj.before, obj.weekday);
        }
        else if (obj.condition == 'zone') {
            cond = new ZoneCondition(obj.entity_id, obj.zone);
        }
        else {
            console.log("ERROR: Rule condition not matched: " + obj.condition);
        }
        return cond;
    };
    return RuleCondition;
}());
exports.RuleCondition = RuleCondition;
var ParentCondition = (function (_super) {
    __extends(ParentCondition, _super);
    function ParentCondition(condition) {
        var _this = _super.call(this, condition) || this;
        _this.conditions = [];
        return _this;
    }
    ParentCondition.prototype.add_condition = function (condition) {
        this.conditions.push(condition);
    };
    ParentCondition.prototype.remove_condition = function (index) {
        this.conditions.splice(index, 1);
    };
    ParentCondition.prototype.replace_condition = function (condition, index) {
        this.conditions[index] = condition;
    };
    return ParentCondition;
}(RuleCondition));
exports.ParentCondition = ParentCondition;
var AndCondition = (function (_super) {
    __extends(AndCondition, _super);
    function AndCondition() {
        var _this = _super.call(this, "and") || this;
        _this.conditions = [];
        return _this;
    }
    return AndCondition;
}(ParentCondition));
exports.AndCondition = AndCondition;
var OrCondition = (function (_super) {
    __extends(OrCondition, _super);
    function OrCondition() {
        var _this = _super.call(this, "or") || this;
        _this.conditions = [];
        return _this;
    }
    return OrCondition;
}(ParentCondition));
exports.OrCondition = OrCondition;
var NumericStateCondition = (function (_super) {
    __extends(NumericStateCondition, _super);
    function NumericStateCondition(entity_id, above_value, below_value) {
        if (above_value === void 0) { above_value = null; }
        if (below_value === void 0) { below_value = null; }
        var _this = _super.call(this, "numeric_state") || this;
        _this.entity_id = entity_id;
        _this.above_value = above_value;
        _this.below_value = below_value;
        return _this;
    }
    return NumericStateCondition;
}(RuleCondition));
exports.NumericStateCondition = NumericStateCondition;
var StateCondition = (function (_super) {
    __extends(StateCondition, _super);
    function StateCondition(entity_id, state) {
        var _this = _super.call(this, "state") || this;
        _this.entity_id = entity_id;
        _this.state = state;
        return _this;
    }
    return StateCondition;
}(RuleCondition));
exports.StateCondition = StateCondition;
var SunCondition = (function (_super) {
    __extends(SunCondition, _super);
    function SunCondition(after, before, after_offset, before_offset) {
        if (after === void 0) { after = null; }
        if (before === void 0) { before = null; }
        if (after_offset === void 0) { after_offset = null; }
        if (before_offset === void 0) { before_offset = null; }
        var _this = _super.call(this, "sun") || this;
        _this.after = after;
        _this.before = before;
        _this.after_offset = after_offset;
        _this.before_offset = before_offset;
        return _this;
    }
    return SunCondition;
}(RuleCondition));
exports.SunCondition = SunCondition;
var TimeCondition = (function (_super) {
    __extends(TimeCondition, _super);
    function TimeCondition(after, before, weekday) {
        if (after === void 0) { after = null; }
        if (before === void 0) { before = null; }
        if (weekday === void 0) { weekday = null; }
        var _this = _super.call(this, "time") || this;
        _this.after = after;
        _this.before = before;
        _this.weekday = weekday;
        return _this;
    }
    return TimeCondition;
}(RuleCondition));
exports.TimeCondition = TimeCondition;
var ZoneCondition = (function (_super) {
    __extends(ZoneCondition, _super);
    function ZoneCondition(entity_id, zone) {
        var _this = _super.call(this, "zone") || this;
        _this.entity_id = entity_id;
        _this.zone = zone;
        return _this;
    }
    return ZoneCondition;
}(RuleCondition));
exports.ZoneCondition = ZoneCondition;
//# sourceMappingURL=rule-conditions.js.map