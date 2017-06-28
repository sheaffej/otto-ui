export class RuleCondition {
  condition: string;

  constructor(condition: string) {
    this.condition = condition;
  }

  static fromObject(obj: any): RuleCondition {
    let cond = null;

    // if (obj.condition == "always") {
    //   cond = new AlwaysCondition();
    // }
    if (obj.condition == 'and') {
      cond = new AndCondition();
      for (let subcond of obj.conditions) {
        cond.add_condition(RuleCondition.fromObject(subcond));
      }
    }
    else if (obj.condition == 'or') {
      cond = new OrCondition();
      for (let subcond of obj.conditions) {
        cond.add_condition(RuleCondition.fromObject(subcond));
      }      
    }
    else if (obj.condition == 'numeric_state') {
      cond = new NumericStateCondition(
        obj.entity_id,
        obj.above_value,
        obj.below_value
      )
    }
    else if (obj.condition == 'state') {
      cond = new StateCondition(
        obj.entity_id,
        obj.state
      )
    }
    else if (obj.condition == 'sun') {
      cond = new SunCondition(
        obj.after,
        obj.before,
        obj.after_offest,
        obj.before_offset
      )
    }
    else if (obj.condition == 'time') {
      cond = new TimeCondition(
        obj.after,
        obj.before,
        obj.weekday
      )
    }
    else if (obj.condition == 'zone') {
      cond = new ZoneCondition(
        obj.entity_id,
        obj.zone
      )
    }
    else { 
      console.log("ERROR: Rule condition not matched: " + obj.condition);
    }
    return cond;
  }

}

export class ParentCondition extends RuleCondition {
  conditions: RuleCondition[] = [];

  constructor(condition: string) {
    super(condition);
  }  
  
  add_condition(condition: RuleCondition): void {
    this.conditions.push(condition);
  }

  remove_condition(index: number) {
    this.conditions.splice(index, 1);
  }

  replace_condition(condition: RuleCondition, index: number): void {
    this.conditions[index] = condition;
  }
}


// export class AlwaysCondition extends RuleCondition {
//   constructor() {
//     super("always");
//   }
// }


export class AndCondition extends ParentCondition {
  conditions: RuleCondition[] = [];

  constructor() {
    super("and");
  }
}


export class OrCondition extends ParentCondition {
  conditions: RuleCondition[] = [];

  constructor() {
    super("or"); 
  }
}


export class NumericStateCondition extends RuleCondition {
  entity_id: string;
  above_value: number;
  below_value: number;

  constructor(entity_id: string, above_value: number=null, below_value: number=null) {
    super("numeric_state");
    this.entity_id = entity_id;
    this.above_value = above_value;
    this.below_value = below_value;
  }
}


export class StateCondition extends RuleCondition {
  entity_id: string;
  state: string;

  constructor(entity_id: string, state: string) {
    super("state");
    this.entity_id = entity_id;
    this.state = state;
  }

  public toJSON = () => {
    let o: any = {};
    o.condition = this.condition;
    o.entity_id = this.entity_id;
    o.state = this.state;
    return o;  
  }

}


export class SunCondition extends RuleCondition {
  after: string;
  before: string;
  after_offset: string;
  before_offset: string;

  constructor(after:string=null, before:string=null, after_offset:string=null, before_offset:string=null) {
    super("sun");
    this.after = after;
    this.before = before;
    this.after_offset = after_offset;
    this.before_offset = before_offset;
  }
}


export class TimeCondition extends RuleCondition {
  after: string;
  before: string;
  weekday: string[];

  constructor(after:string=null, before:string=null, weekday:string[]=null){
    super("time");
    this.after = after;
    this.before = before;
    this.weekday = weekday;
  }
}


export class ZoneCondition extends RuleCondition {
  entity_id: string;
  zone: string;

  constructor(entity_id:string, zone:string) {
    super("zone");
    this.entity_id = entity_id;
    this.zone = zone;
  }
}
