"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var rule_conditions_1 = require("./rule-conditions");
var RuleActionSequence = (function () {
    function RuleActionSequence() {
        var _this = this;
        this._condition = null;
        this._sequence = [];
        // Overridden Property Functions
        this.toJSON = function () {
            var o = {};
            o.action_condition = _this._condition;
            o.action_sequence = _this._sequence;
            return o;
        };
    }
    Object.defineProperty(RuleActionSequence.prototype, "sequence", {
        // Accessor methods
        get: function () { return this._sequence; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RuleActionSequence.prototype, "condition", {
        get: function () { return this._condition; },
        enumerable: true,
        configurable: true
    });
    RuleActionSequence.prototype.add_action = function (action) {
        this._sequence.push(action);
    };
    RuleActionSequence.prototype.remove_action = function (index) {
        this._sequence.splice(index, 1);
    };
    RuleActionSequence.prototype.replace_action = function (index, action) {
        this._sequence[index] = action;
    };
    RuleActionSequence.prototype.add_condition = function (condition) {
        this._condition = condition;
    };
    RuleActionSequence.prototype.remove_condition = function () {
        this._condition = null;
    };
    RuleActionSequence.prototype.replace_condition = function (condition) {
        this._condition = condition;
    };
    // Static methods
    RuleActionSequence.fromObject = function (obj) {
        // console.log("RASeq.fromObject: " + JSON.stringify(obj))
        var actionSeq = new RuleActionSequence();
        if ("action_condition" in obj) {
            // console.log("adding action_condition: " + obj.action_condition.condition);
            actionSeq._condition = rule_conditions_1.RuleCondition.fromObject(obj.action_condition);
        }
        if ("action_sequence" in obj) {
            // console.log("adding action_sequence: " + JSON.stringify(obj.action_sequence));
            for (var _i = 0, _a = obj.action_sequence; _i < _a.length; _i++) {
                var actonObj = _a[_i];
                // console.log("actionObj: " + JSON.stringify(actonObj));
                actionSeq.add_action(RuleActionItem.fromObject(actonObj));
            }
        }
        // console.log("Created RuleActionSequence: " + JSON.stringify(actionSeq));
        return actionSeq;
    };
    return RuleActionSequence;
}());
exports.RuleActionSequence = RuleActionSequence;
var RuleActionItem = (function () {
    function RuleActionItem() {
    }
    // actionType: string;
    // constructor(actionType: string) {
    //   this.actionType = actionType;
    // }
    RuleActionItem.fromObject = function (obj) {
        // console.log("RuleActionItem.fromObject:  " + JSON.stringify(obj));
        var action = null;
        if ("service" in obj) {
            action = new ServiceAction(obj.domain, obj.service, obj.data);
        }
        else if ("condition" in obj) {
            action = new ConditionAction(rule_conditions_1.RuleCondition.fromObject(obj));
        }
        else if ("delay" in obj) {
            action = new DelayAction(obj.delay);
        }
        else {
            console.log("ERROR: RuleActionItem not matched: " + JSON.stringify(obj));
        }
        return action;
    };
    return RuleActionItem;
}());
exports.RuleActionItem = RuleActionItem;
var ServiceAction = (function (_super) {
    __extends(ServiceAction, _super);
    function ServiceAction(domain, service, data) {
        if (data === void 0) { data = null; }
        var _this = _super.call(this) || this;
        _this.domain = domain;
        _this.service = service;
        _this.data = data;
        return _this;
    }
    return ServiceAction;
}(RuleActionItem));
exports.ServiceAction = ServiceAction;
var ConditionAction = (function (_super) {
    __extends(ConditionAction, _super);
    function ConditionAction(condition) {
        var _this = _super.call(this) || this;
        _this.condition = condition;
        return _this;
    }
    ConditionAction.prototype.replaceCondition = function (newCondition) {
        this.condition = newCondition;
    };
    return ConditionAction;
}(RuleActionItem));
exports.ConditionAction = ConditionAction;
var DelayAction = (function (_super) {
    __extends(DelayAction, _super);
    function DelayAction(delay) {
        var _this = _super.call(this) || this;
        _this.delay = delay;
        return _this;
    }
    return DelayAction;
}(RuleActionItem));
exports.DelayAction = DelayAction;
//# sourceMappingURL=rule-actions.js.map