import { Component, OnInit, Input } from '@angular/core';
import { SelectItem } from 'primeng/primeng';

import { OttoRestService } from '../services/otto-rest.service'
import { AutomationRule } from '../objects/rule-automation';
import { 
  RuleCondition, AndCondition, OrCondition, StateCondition, 
  NumericStateCondition, SunCondition, TimeCondition, ZoneCondition 
  } from '../objects/rule-conditions';

@Component({
  selector: 'rule-condition',
  templateUrl: './templates/rule-condition.component.html',
})
export class RuleConditionComponent implements OnInit {

  @Input() condition: RuleCondition;
  @Input() parentCondition: RuleCondition;

  debug: boolean = true;
  longText: string = "xxxxxxxxxxxxxxxx40-charsxxxxxxxxxxxxxxxx";
  mediumText: string = "xxxxxxx20-charxxxxxx";
  saveNeeded: boolean = false;

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

    this.saveNeeded = false;
  }

  // Properties
  get jsonString(): string { return JSON.stringify(this.condition); }


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

      // And
      else if ( 
        (this.condition instanceof AndCondition) || 
        (this.condition instanceof OrCondition) ) 
      {
        this.uiNestedConditions = this.condition.conditions;
      }

      // Or

    }

  } // ngOnInit()

  populateOptions(option_list: SelectItem[], options: string[]): void {
    option_list.length = 0;   // Clear the array
    for (let option of options) {
      option_list.push({label: option, value: option});
    }    
  }


  onConditionChange(): void {
    this.checkSaveNeeded();
  }

  onChange(): void {
    console.log(this.uiTimeWeekday);
    this.checkSaveNeeded();
  }

  checkSaveNeeded(): void {

  }

  onSaveClick(): void {

  }

  onRemoveClick(): void {

  }

} // class RuleConditionComponent