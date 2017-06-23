import { RuleTrigger } from './rule-triggers';
import { RuleCondition } from './rule-conditions';
import { RuleActionSequence } from './rule-actions';


export class AutomationRule {
  
  private _id: string;
  private _description: string = null;
  private _group: string = null;
  private _enabled: boolean = true;

  private _triggers: RuleTrigger[] = [];
  private _condition: RuleCondition = null;
  private _action_sequences: RuleActionSequence[] = [];

  constructor(id: string='') {
    if (id != '') {
      this._id = id;
    } else {
      // this._id = (Math.round((new Date()).getTime() / 1000)).toString();
      this._id = (Math.round((new Date()).getTime()/1000) - 1498090000).toString();
    }
  }


  // Accessor Methods
  get id(): string { return this._id; }
  get description(): string { return this._description; }
  get group(): string { return this._group; }
  get enabled(): boolean {return this._enabled; }

  set description(description: string) { this._description = description; }
  set group(group: string) { this._group = group; }
  set enabled(enable: boolean) { this._enabled = enable; }

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
    let o: any = {};
    o.id = this._id;
    o.description = this._description;
    o.enabled = this._enabled;
    o.group = this._group;
    o.triggers = this._triggers;
    if (this._condition != null) {
      o.rule_condition = this._condition;
    }
    o.actions = this._action_sequences;
    return o;
  }



  // Static Methods
  static from_object(obj: any): AutomationRule {
    let rule = new AutomationRule(obj.id);
    // console.log(`[Creating rule: id ${rule.id}]`);
    
    if ("description" in obj) { rule.description = obj.description }
    if ("group" in obj) { rule.group = obj.group }
    if ("enabled" in obj) { rule.enabled = obj.enabled }


    // Triggers
    if ("triggers" in obj) {
      for (let trig_obj of obj.triggers) {
        // console.log("adding a trigger xxxxx");
        let trig = RuleTrigger.fromObject(trig_obj);
        rule.add_trigger(trig);
        // console.log(JSON.stringify(trig));
      }
    }

    // Rule Conditions
    if ("rule_condition" in obj) {
      // console.log("adding a RuleConddition ????");
      let cond = RuleCondition.fromObject(obj.rule_condition);
      rule.add_condition(cond);
      // console.log(JSON.stringify(cond));
    }

    // Action Sequences
    if ("actions" in obj) {
      for (let seq_obj of obj.actions) {
        // console.log("adding a RuleActionSequence >>>>");
        let actionSeq = RuleActionSequence.fromObject(seq_obj);
        rule.add_action_sequence(actionSeq);
        // console.log(JSON.stringify(actionSeq));
      }
    }

    return rule;
  } // method fromObject

}



