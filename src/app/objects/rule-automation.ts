import { RuleTrigger } from './rule-triggers';
import { RuleCondition } from './rule-conditions';
import { RuleActionSequence } from './rule-actions';

// export class AutomationRuleList {
//   // This is needed to wrap an array of AutomationRules
//   // since we pass them through Observables. Without this wrapper,
//   // the Observables will convert a list of rules, into a stream of single rules

//   readonly rules: AutomationRule[];

//   constructor(rules: AutomationRule[]) {
//     this.rules = rules;
//   }
// }

export class AutomationRule {

  private _id: string;
  private _description = '';     // Description should not be Null
  private _group: string = null;
  private _enabled = true;
  private _notes = '';           // Notes should not be Null

  private _triggers: RuleTrigger[] = [];
  private _condition: RuleCondition = null;
  private _action_sequences: RuleActionSequence[] = [];

  constructor(id: string = '') {
    if (id !== '') {
      this._id = id;
    } else {
      // this._id = (Math.round((new Date()).getTime() / 1000)).toString();
      this._id = (Math.round((new Date()).getTime() / 1000) - 1498090000).toString();
    }
  }

    // Static Methods
    static from_object(obj: any): AutomationRule {
      const rule = new AutomationRule(obj.id);
      // console.log(`[Creating rule: id ${rule.id}]`);

      if ('description' in obj) { rule.description = obj.description; }
      if ('group' in obj) { rule.group = obj.group; }
      if ('enabled' in obj) { rule.enabled = obj.enabled; }
      if ('notes' in obj) { rule.notes = obj.notes; }


      // Triggers
      if ('triggers' in obj) {
        for (const trig_obj of obj.triggers) {
          // console.log("adding a trigger xxxxx");
          const trig = RuleTrigger.fromObject(trig_obj);
          rule.add_trigger(trig);
          // console.log(JSON.stringify(trig));
        }
      }

      // Rule Conditions
      if ('rule_condition' in obj) {
        // console.log("adding a RuleConddition ????");
        const cond = RuleCondition.fromObject(obj.rule_condition);
        rule.add_condition(cond);
        // console.log(JSON.stringify(cond));
      }

      // Action Sequences
      if ('actions' in obj) {
        for (const seq_obj of obj.actions) {
          // console.log("adding a RuleActionSequence >>>>");
          const actionSeq = RuleActionSequence.fromObject(seq_obj);
          rule.add_action_sequence(actionSeq);
          // console.log(JSON.stringify(actionSeq));
        }
      }

      return rule;
    }


  // Accessor Methods
  get id(): string { return this._id; }
  get description(): string { return this._description; }
  get group(): string { return this._group; }
  get enabled(): boolean {return this._enabled; }
  get notes(): string { return this._notes; }

  set description(description: string) { this._description = description; }
  set group(group: string) { this._group = group; }
  set enabled(enable: boolean) { this._enabled = enable; }
  set notes(notes: string) { this._notes = notes; }

  get triggers(): RuleTrigger[] { return this._triggers; }
  get condition(): RuleCondition { return this._condition; }
  get action_sequences(): RuleActionSequence[] { return this._action_sequences; }

  add_trigger(trigger: RuleTrigger): void {
    this._triggers.push(trigger);
  }

  remove_trigger(index: number): void {
    this._triggers.splice(index, 1);
  }

  replace_trigger(trigger: RuleTrigger, index: number): void {
    this._triggers[index] = trigger;
  }


  add_condition(condition: RuleCondition): void {
    this._condition = condition;
  }

  remove_condition(): void {
    this._condition = null;
  }


  add_action_sequence(action_sequence: RuleActionSequence): void {
    this._action_sequences.push(action_sequence);
  }

  remove_action_sequence(index: number): void {
    this._action_sequences.splice(index, 1);
  }


  // Overriden Property Functions
  // public toString = () => {
  //   return JSON.stringify(this);
  // }

  public toJSON = () => {
    const o: any = {};
    o.id = this._id;
    o.description = this._description;
    o.enabled = this._enabled;
    o.group = this._group;
    o.notes = this._notes;
    o.triggers = this._triggers;
    if (this._condition != null) {
      o.rule_condition = this._condition;
    }
    o.actions = this._action_sequences;
    return o;
  }

}



