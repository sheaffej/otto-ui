"use strict";
var rule_triggers_1 = require("./rule-triggers");
var rule_conditions_1 = require("./rule-conditions");
var rule_actions_1 = require("./rule-actions");
var AutomationRule = (function () {
    function AutomationRule(id) {
        if (id === void 0) { id = ''; }
        var _this = this;
        this._description = null;
        this._group = null;
        this._enabled = true;
        this._triggers = [];
        this._condition = null;
        this._action_sequences = [];
        // Overriden Property Functions
        // public toString = () => {
        //   return JSON.stringify(this);
        // }
        this.toJSON = function () {
            var o = {};
            o.id = _this._id;
            o.description = _this._description;
            o.enabled = _this._enabled;
            o.group = _this._group;
            o.triggers = _this._triggers;
            o.rule_condition = _this._condition;
            o.actions = _this._action_sequences;
            return o;
        };
        if (id != '') {
            this._id = id;
        }
        else {
            this._id = (Math.round((new Date()).getTime() / 1000)).toString();
        }
    }
    Object.defineProperty(AutomationRule.prototype, "id", {
        // Accessor Methods
        get: function () { return this._id; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutomationRule.prototype, "description", {
        get: function () { return this._description; },
        set: function (description) { this._description = description; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutomationRule.prototype, "group", {
        get: function () { return this._group; },
        set: function (group) { this._group = group; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutomationRule.prototype, "enabled", {
        get: function () { return this._enabled; },
        set: function (enable) { this._enabled = enable; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutomationRule.prototype, "triggers", {
        get: function () { return this._triggers; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutomationRule.prototype, "condition", {
        get: function () { return this._condition; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AutomationRule.prototype, "action_sequences", {
        get: function () { return this._action_sequences; },
        enumerable: true,
        configurable: true
    });
    AutomationRule.prototype.add_trigger = function (trigger) {
        this._triggers.push(trigger);
    };
    AutomationRule.prototype.remove_trigger = function (index) {
        this._triggers.splice(index, 1);
    };
    AutomationRule.prototype.replace_trigger = function (trigger, index) {
        this._triggers[index] = trigger;
    };
    AutomationRule.prototype.add_condition = function (condition) {
        this._condition = condition;
    };
    AutomationRule.prototype.remove_condition = function () {
        this._condition = null;
    };
    AutomationRule.prototype.add_action_sequence = function (action_sequence) {
        this._action_sequences.push(action_sequence);
    };
    AutomationRule.prototype.remove_action_sequence = function (index) {
        this._action_sequences.splice(index, 1);
    };
    // Static Methods
    AutomationRule.from_object = function (obj) {
        var rule = new AutomationRule(obj.id);
        // console.log(`[Creating rule: id ${rule.id}]`);
        if ("description" in obj) {
            rule.description = obj.description;
        }
        if ("group" in obj) {
            rule.group = obj.group;
        }
        if ("enabled" in obj) {
            rule.enabled = obj.enabled;
        }
        // Triggers
        if ("triggers" in obj) {
            for (var _i = 0, _a = obj.triggers; _i < _a.length; _i++) {
                var trig_obj = _a[_i];
                // console.log("adding a trigger xxxxx");
                var trig = rule_triggers_1.RuleTrigger.fromObject(trig_obj);
                rule.add_trigger(trig);
            }
        }
        // Rule Conditions
        if ("rule_condition" in obj) {
            // console.log("adding a RuleConddition ????");
            var cond = rule_conditions_1.RuleCondition.fromObject(obj.rule_condition);
            rule.add_condition(cond);
        }
        // Action Sequences
        if ("actions" in obj) {
            for (var _b = 0, _c = obj.actions; _b < _c.length; _b++) {
                var seq_obj = _c[_b];
                // console.log("adding a RuleActionSequence >>>>");
                var actionSeq = rule_actions_1.RuleActionSequence.fromObject(seq_obj);
                rule.add_action_sequence(actionSeq);
            }
        }
        return rule;
    }; // method fromObject
    return AutomationRule;
}());
exports.AutomationRule = AutomationRule;
//# sourceMappingURL=rule-automation.js.map