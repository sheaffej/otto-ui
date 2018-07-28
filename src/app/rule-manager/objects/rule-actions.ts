import { RuleCondition } from './rule-conditions';

export class RuleActionSequence {

  private _condition: RuleCondition = null;
  private _sequence: RuleActionItem[] = [];
  private _description: string = null;

  constructor() {}

  // Static methods
  static fromObject (obj: any): RuleActionSequence {
    // console.log("RASeq.fromObject: " + JSON.stringify(obj))
    const actionSeq: RuleActionSequence = new RuleActionSequence();

    if ('description' in obj) {
      actionSeq._description = obj.description;
    }

    if ('action_condition' in obj) {
      // console.log("adding action_condition: " + obj.action_condition.condition);
      actionSeq._condition = RuleCondition.fromObject(obj.action_condition);
    }

    if ('action_sequence' in obj) {
      // console.log("adding action_sequence: " + JSON.stringify(obj.action_sequence));
      for (const actonObj of obj.action_sequence) {
        // console.log("actionObj: " + JSON.stringify(actonObj));
        actionSeq.add_action(RuleActionItem.fromObject(actonObj));
      }
    }
    // console.log("Created RuleActionSequence: " + JSON.stringify(actionSeq));
    return actionSeq;
  }


  // Accessor methods
  get sequence(): RuleActionItem[] { return this._sequence; }
  get condition(): RuleCondition { return this._condition; }
  get description(): string { return this._description; }
  set description(description: string) {this._description = description; }

  add_action(action: RuleActionItem): void {
    this._sequence.push(action);
  }

  remove_action(index: number): void {
    this._sequence.splice(index, 1);
  }

  replace_action(index: number, action: RuleActionItem) {
    this._sequence[index] = action;
  }

  add_condition(condition: RuleCondition) {
    this._condition = condition;
  }

  remove_condition() {
    this._condition = null;
  }

  replace_condition(condition: RuleCondition) {
    this._condition = condition;
  }

  // Overridden Property Functions
  public toJSON = () => {
    const o: any = {};
    o.description = this._description;
    if (this._condition != null) {
      o.action_condition = this._condition;
    }
    o.action_sequence = this._sequence;
    return o;
  }
}


export class RuleActionItem {

  static fromObject(obj: any): RuleActionItem {
    let action = null;

    if ('service' in obj) {
      action = new ServiceAction(obj.domain, obj.service, obj.data);
    } else if ('condition' in obj) {
      action = new ConditionAction(RuleCondition.fromObject(obj));
    } else if ('delay' in obj) {
      action = new DelayAction(obj.delay);
    } else if ('log_message' in obj) {
      action = new LogAction(obj.log_message);
    } else {
      console.error('ERROR: RuleActionItem not matched: ' + JSON.stringify(obj));
    }

    return action;
  }
}


export class ServiceAction extends RuleActionItem {
  domain: string;
  service: string;
  data: any;

  constructor(domain: string, service: string, data: any= null) {
    super();
    this.domain = domain;
    this.service = service;
    this.data = data;
  }
}


export class ConditionAction extends RuleActionItem {
  condition: RuleCondition;

  constructor(condition: RuleCondition) {
    super();
    this.condition = condition;
  }

  replaceCondition(newCondition: RuleCondition) {
    this.condition = newCondition;
  }

}


export class DelayAction extends RuleActionItem {
  delay: string;

  constructor(delay: string) {
    super();
    this.delay = delay;
  }
}


export class LogAction extends RuleActionItem {
  log_message: string;

  constructor(log_message: string) {
    super();
    this.log_message = log_message;
  }
}
