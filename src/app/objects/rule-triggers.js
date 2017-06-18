"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RuleTrigger = (function () {
    function RuleTrigger(platform) {
        this.platform = platform;
    }
    RuleTrigger.fromObject = function (trig_obj) {
        var trig = null;
        // StateTrigger
        if (trig_obj.platform == 'state') {
            trig = new StateTrigger(trig_obj.entity_id, trig_obj.to, trig_obj.from);
        }
        else if (trig_obj.platform == 'numeric_state') {
            trig = new NumericStateTrigger(trig_obj.entity_id, trig_obj.above, trig_obj.below);
        }
        else if (trig_obj.platform == 'event') {
            trig = new EventTrigger(trig_obj.event_type, trig_obj.event_data);
        }
        else {
            console.log("ERROR: Trigger platform not matched: " + trig_obj.platform);
        }
        return trig;
    };
    return RuleTrigger;
}());
exports.RuleTrigger = RuleTrigger;
var StateTrigger = (function (_super) {
    __extends(StateTrigger, _super);
    function StateTrigger(entity_id, to, from) {
        if (to === void 0) { to = null; }
        if (from === void 0) { from = null; }
        var _this = _super.call(this, 'state') || this;
        _this.toJSON = function () {
            var o = {};
            o.platform = _this.platform;
            o.entity_id = _this.entity_id;
            if (_this.to != null) {
                o.to = _this.to;
            }
            if (_this.from != null) {
                o.from = _this.from;
            }
            return o;
        };
        _this.entity_id = entity_id;
        _this.to = to;
        _this.from = from;
        return _this;
    }
    return StateTrigger;
}(RuleTrigger));
exports.StateTrigger = StateTrigger;
var NumericStateTrigger = (function (_super) {
    __extends(NumericStateTrigger, _super);
    function NumericStateTrigger(entity_id, above, below) {
        if (above === void 0) { above = null; }
        if (below === void 0) { below = null; }
        var _this = _super.call(this, 'numeric_state') || this;
        _this.toJSON = function () {
            var o = {};
            o.platform = _this.platform;
            o.entity_id = _this.entity_id;
            if (_this.above_value != null) {
                o.above = _this.above_value;
            }
            if (_this.below_value != null) {
                o.below = _this.below_value;
            }
            return o;
        };
        _this.entity_id = entity_id;
        _this.above_value = above;
        _this.below_value = below;
        return _this;
    }
    return NumericStateTrigger;
}(RuleTrigger));
exports.NumericStateTrigger = NumericStateTrigger;
var EventTrigger = (function (_super) {
    __extends(EventTrigger, _super);
    function EventTrigger(event_type, event_data_obj) {
        var _this = _super.call(this, 'event') || this;
        _this.toJSON = function () {
            var o = {};
            o.platform = _this.platform;
            o.event_type = _this.event_type;
            if (_this.event_data_obj == null) {
                o.event_data = {};
            }
            else {
                o.event_data = _this.event_data_obj;
            }
            return o;
        };
        _this.event_type = event_type;
        _this.event_data_obj = event_data_obj;
        return _this;
    }
    return EventTrigger;
}(RuleTrigger));
exports.EventTrigger = EventTrigger;
//# sourceMappingURL=rule-triggers.js.map