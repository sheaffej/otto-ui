import { Component, OnInit, Input } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import {PrettyJsonComponent} from 'angular2-prettyjson';

import { OttoRestService } from '../services/otto-rest.service'
import { AutomationRule } from '../objects/rule-automation';
import { 
  RuleCondition, AndCondition, OrCondition, StateCondition, 
  NumericStateCondition, SunCondition, TimeCondition, ZoneCondition 
  } from '../objects/rule-conditions';
import { RuleActionSequence, ConditionAction } from '../objects/rule-actions';

@Component({
  selector: 'rule-condition',
  templateUrl: './templates/rule-condition.component.html',
})
export class RuleConditionComponent implements OnInit {

  @Input() condition: RuleCondition;
  // @Input() rule: AutomationRule;
  @Input() parent: any;
  @Input() parentIndex: number;

  debug: boolean = false;
  longText: string = "xxxxxxxxxxxxxxxx40-charsxxxxxxxxxxxxxxxx";
  mediumText: string = "xxxxxxx20-charxxxxxx";

  // We need the uiXXX copies of the data in the rule condition
  // because ngModel needs to bind to an object, and if we replace
  // the rule condition in the rule, it breaks how ngModel works
  // Therefore, we simply re-create the rule condition in the rule
  // every time there is a change in the UI (using the uiXXX values)

  // Condition
  uiCondition: string;
  uiConditionOptions: SelectItem[];
  uiNestedConditions: RuleCondition[];
  
  // Entity Id
  uiEntityId: string;
  uiEntityIdOptions: SelectItem[];
  
  // State
  uiState: string;
  
  // NumericState
  uiAboveValue: number;
  uiBelowValue: number;

  // Sun
  uiSunAfter: string;
  uiSunBefore: string;
  uiSunAfterOffset: string;
  uiSunBeforeOffset: string;
  uiSunOptions: SelectItem[];

  // Time
  uiTimeAfter: string;
  uiTimeBefore: string; 
  uiTimeWeekday: string[]; 
  uiTimeWeekdayOptions: SelectItem[];

  // Zone
  uiZone: string;
  uiZoneOptions: SelectItem[];

  constructor(private ottoService: OttoRestService) {
    // Condition options
    this.uiConditionOptions = [];
    let options = ["and", "or", "state", "numeric_state", "sun", "time", "zone"];
    for (let option of options) {
      this.uiConditionOptions.push({label: option, value: option});
    }

    // Sun options
    this.uiSunOptions = [];
    options = ["sunrise", "sunset"];
    for (let option of options) {
      this.uiSunOptions.push({label: option, value: option});
    }

    // Time Weekday options
    this.uiTimeWeekdayOptions = [];
    options = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
    for (let option of options) {
      this.uiTimeWeekdayOptions.push({label: option, value: option});
    }

    ottoService.getEntities().then(entities => this.populateOptions(this.uiEntityIdOptions, entities))
    this.uiEntityIdOptions = [{label: this.longText, value: null}];

    ottoService.getZones().then(zones => this.populateOptions(this.uiZoneOptions, zones))
    this.uiZoneOptions = [{label: this.mediumText, value: null}];    

  }

  ngOnInit(): void {

    if (this.condition != null) {

      this.uiCondition = this.condition.condition;

      if (this.condition instanceof StateCondition) {
        this.uiEntityId = this.condition.entity_id;
        this.uiState = this.condition.state;
      }

      else if (this.condition instanceof NumericStateCondition) {
        this.uiEntityId = this.condition.entity_id;
        this.uiAboveValue = this.condition.above_value;
        this.uiBelowValue = this.condition.below_value;
      }

      else if (this.condition instanceof SunCondition) {
        this.uiSunAfter = this.condition.after;
        this.uiSunAfterOffset = this.condition.after_offset;
        this.uiSunBefore = this.condition.before;
        this.uiSunBeforeOffset = this.condition.before_offset;
      }

      // Time
      else if (this.condition instanceof TimeCondition) {
        this.uiTimeAfter = this.condition.after;
        this.uiTimeBefore = this.condition.before;
        this.uiTimeWeekday = this.condition.weekday;
      }

      // Zone
      else if (this.condition instanceof ZoneCondition) {
        this.uiEntityId = this.condition.entity_id;
        this.uiZone = this.condition.zone;
      }

      // And & Or
      else if ( 
        (this.condition instanceof AndCondition) || 
        (this.condition instanceof OrCondition) ) 
      {
        this.uiNestedConditions = this.condition.conditions;
      }

    }
    // console.log("Condition ngOnInit done");

  } // ngOnInit()


  populateOptions(option_list: SelectItem[], options: string[]): void {
    option_list.length = 0;   // Clear the array
    for (let option of options) {
      option_list.push({label: option, value: option});
    }    
    // console.log("Condition Populate Options done");
  }


  onConditionChange(): void {
    // When the platform changes, we just re-intitialize the condition

    // Set the uiXXX fields to initial values
    if (this.uiCondition == 'state') {
      this.uiEntityId = null;
      this.uiState = null;
    }
    else if (this.uiCondition == 'numeric_state') {
      this.uiEntityId = null;
      this.uiAboveValue = null;
      this.uiBelowValue = null;
    }
    else if (this.uiCondition == 'sun') {
      this.uiSunAfter = null;
      this.uiSunAfterOffset = null;
      this.uiSunBefore = null;
      this.uiSunBeforeOffset = null;
    }
    else if (this.uiCondition == 'time') {
      this.uiTimeAfter = null;
      this.uiTimeBefore = null;
      this.uiTimeWeekday = null;
    }
    else if (this.uiCondition == 'zone') {
      this.uiEntityId = null;
      this.uiZone = null;
    }
    else if ((this.uiCondition == 'and') || (this.uiCondition == 'or')) {
      this.uiNestedConditions = [];   // initialize to an empty array
    }
    // Now recreate the condition
    this.recreateCondition();
  }


  onChange(): void {
    this.recreateCondition();
  }


  recreateCondition(): void {
    // When the condition changes, we just re-intitialize the condition
    if (this.uiCondition == 'state') {
      this.replaceCondition(new StateCondition(this.uiEntityId, this.uiState));
    }
    else if (this.uiCondition == 'numeric_state') {
      this.replaceCondition(new NumericStateCondition(this.uiEntityId, this.uiAboveValue, this.uiBelowValue));
    }
    else if (this.uiCondition == 'sun') {
      this.replaceCondition(new SunCondition(this.uiSunAfter, this.uiSunBefore, this.uiSunAfterOffset, this.uiSunBeforeOffset));
    }
    else if (this.uiCondition == 'time') {
      this.replaceCondition(new TimeCondition(this.uiTimeAfter, this.uiTimeBefore, this.uiTimeWeekday));
    }
    else if (this.uiCondition == 'zone') {
      this.replaceCondition(new ZoneCondition(this.uiEntityId, this.uiZone));
    }
    else if (this.uiCondition == 'and') {
      this.replaceCondition(new AndCondition());
    }
    else if (this.uiCondition == 'or') {
      this.replaceCondition(new OrCondition());
    }    
  }


  replaceCondition(newCondition: RuleCondition) {
    if (this.parent == null) {
      console.log("ERROR: this.parent is NULL in replaceCondition");
    }

    if (this.parent instanceof AutomationRule) {
      this.parent.add_condition(newCondition);    // Add overwrites previous condition
    }
    else if ((this.parent instanceof AndCondition) || (this.parent instanceof OrCondition)) {
      this.parent.conditions[this.parentIndex] = newCondition;
    }
    else if (this.parent instanceof RuleActionSequence) {
      this.parent.condition = newCondition;
    }
    else if (this.parent instanceof ConditionAction) {
      this.parent.replaceCondition(newCondition);
    }
  }


  onAddClick(): void {
    console.log("Add Condition clicked");
    if ((this.condition instanceof AndCondition) ||
      (this.condition instanceof OrCondition))
    {
      if (this.condition.conditions == null) {
        this.condition.conditions = []; 
      }
      this.condition.conditions.push(null);
    }
  }


  onRemoveClick(): void {
    if (this.parent == null) {
      console.log("ERROR: this.parent is NULL in onRemoveClick");
      return;
    }
    
    if (this.parent instanceof AutomationRule) {
      this.parent.remove_condition();
    }
    else if (
      (this.parent instanceof AndCondition) ||
      (this.parent instanceof OrCondition)
    ){
      this.parent.conditions.splice(this.parentIndex, 1);
    }
    // this.recreateCondition()
  }

} // class RuleConditionComponent