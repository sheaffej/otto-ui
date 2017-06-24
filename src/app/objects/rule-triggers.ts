export class RuleTrigger {
  platform: string;

  constructor(platform: string) {
    this.platform = platform;
  }

  static fromObject(trig_obj: any): RuleTrigger {    
    let trig = null;

    // StateTrigger
    if (trig_obj.platform == 'state') {
      trig = new StateTrigger(
        trig_obj.entity_id,
        trig_obj.to,
        trig_obj.from
      );
    }

    // NumericStateTrigger
    else if (trig_obj.platform == 'numeric_state') {
      trig = new NumericStateTrigger(
        trig_obj.entity_id,
        trig_obj.above,
        trig_obj.below
      );
    }

    // EventTrigger
    else if (trig_obj.platform == 'event') {
      trig = new EventTrigger(
        trig_obj.event_type,
        trig_obj.event_data
      );
    }
    else {
      console.log("ERROR: Trigger platform not matched: " + trig_obj.platform);
    }
    return trig;
  }

}


export class StateTrigger extends RuleTrigger {
  entity_id: string;
  to: string;
  from: string;

  constructor(entity_id: string, to: string=null, from: string=null) {
    super('state');
    this.entity_id = entity_id;
    this.to = to;
    this.from = from;
  }

  public toJSON = () => {
    let o: any = {};
    o.platform = this.platform;
    o.entity_id = this.entity_id;
    if (this.to != null && this.to.length < 0) { o.to = this.to; }
    if (this.from != null && this.from.length < 0) { o.from = this.from; }
    return o;
  }
}


export class NumericStateTrigger extends RuleTrigger {
  entity_id: string;
  above_value: number;
  below_value: number;

  constructor(entity_id: string, above: number=null, below: number=null) {
    super('numeric_state');
    this.entity_id = entity_id;
    this.above_value = above;
    this.below_value = below;
  }

  public toJSON = () => {
    let o: any = {};
    o.platform = this.platform;
    o.entity_id = this.entity_id;
    if (this.above_value != null) { o.above = this.above_value; }
    if (this.below_value != null) { o.below = this.below_value; }    
    return o;
  }
}


export class EventTrigger extends RuleTrigger {
  event_type: string;
  event_data_obj: any;
  
  constructor(event_type: string, event_data_obj: any) {
    super('event');
    this.event_type = event_type;
    this.event_data_obj = event_data_obj;
  }

  public toJSON = () => {
    let o: any = {};
    o.platform = this.platform;
    o.event_type = this.event_type;
    if (this.event_data_obj == null) { o.event_data = {}; }
    else { o.event_data = this.event_data_obj; }
    return o;
  }
}
