import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import {PrettyJsonComponent} from 'angular2-prettyjson';

import { OttoRestService } from '../services/otto-rest.service';
import { AutomationRule } from '../objects/rule-automation';
import {
  RuleCondition, ParentCondition, AndCondition, OrCondition, StateCondition,
  NumericStateCondition, SunCondition, TimeCondition, ZoneCondition
  } from '../objects/rule-conditions';
import { RuleActionSequence, ConditionAction } from '../objects/rule-actions';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'rule-condition',
  templateUrl: 'rule-condition.component.html',
})
export class RuleConditionComponent implements OnInit {

  @Input() condition: RuleCondition;
  // @Input() rule: AutomationRule;
  // @Input() parent: any;
  // @Input('index') parentIndex: number;
  @Output() onReCreate = new EventEmitter<RuleCondition>();
  @Output() onRemove = new EventEmitter();

  debug: boolean = false;
  longText: string = 'xxxxxxxxxxxxxxxx40-charsxxxxxxxxxxxxxxxx';
  mediumText: string = 'xxxxxxx20-charxxxxxx';

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
  uiTimeTimezone: string;
  uiTimeTimezoneOptions: SelectItem[];

  // Zone
  uiZone: string;
  uiZoneOptions: SelectItem[];

  constructor(private ottoService: OttoRestService) {}

  ngOnInit(): void {
    // Create Condition options
    this.uiConditionOptions = [];
    let options = ['and', 'or', 'state', 'numeric_state', 'sun', 'time', 'zone'];
    options.map(option => this.uiConditionOptions.push({label: option, value: option}));
    // for (let option of options) {
    //   this.uiConditionOptions.push({label: option, value: option});
    // }

    // Create Sun options
    this.uiSunOptions = [];
    options = ['sunrise', 'sunset'];
    options.map(option => this.uiSunOptions.push({label: option, value: option}));
    // for (let option of options) {
    //   this.uiSunOptions.push({label: option, value: option});
    // }

    // Create Time Weekday options
    this.uiTimeWeekdayOptions = [];
    options = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    options.map(option => this.uiTimeWeekdayOptions.push({label: option, value: option}));
    // for (let option of options) {
    //   this.uiTimeWeekdayOptions.push({label: option, value: option});
    // }

    // Load Timezone Options
    this.uiTimeTimezoneOptions = [];
    options = [
      environment.timezone,
      'UTC'
    ];
    options.map(option => this.uiTimeTimezoneOptions.push({label: option, value: option }));

    // Create Entity ID Options
    this.uiEntityIdOptions = [{label: this.longText, value: null}];
    this.ottoService.getEntitiesObservable()
      .subscribe(entitiesList => this.populateOptions(this.uiEntityIdOptions, entitiesList.list));

    // Create Zone Options
    this.uiZoneOptions = [{label: this.mediumText, value: null}];
    this.ottoService.getZonesObservable()
      .subscribe(zones => this.populateOptions(this.uiZoneOptions, zones.list));

    // Initialize uiXXX components
    if (this.condition != null) {

      this.uiCondition = this.condition.condition;

      if (this.condition instanceof StateCondition) {
        this.uiEntityId = this.condition.entity_id;
        this.uiState = this.condition.state;
      } else if (this.condition instanceof NumericStateCondition) {
        this.uiEntityId = this.condition.entity_id;
        this.uiAboveValue = this.condition.above_value;
        this.uiBelowValue = this.condition.below_value;
      } else if (this.condition instanceof SunCondition) {
        this.uiSunAfter = this.condition.after;
        this.uiSunAfterOffset = this.condition.after_offset;
        this.uiSunBefore = this.condition.before;
        this.uiSunBeforeOffset = this.condition.before_offset;
      } else if (this.condition instanceof TimeCondition) {
        this.uiTimeAfter = this.condition.after;
        this.uiTimeBefore = this.condition.before;
        this.uiTimeWeekday = this.condition.weekday;
        this.uiTimeTimezone = this.condition.tz;
      } else if (this.condition instanceof ZoneCondition) {
        this.uiEntityId = this.condition.entity_id;
        this.uiZone = this.condition.zone;
      } else if (this.condition instanceof ParentCondition) { // And & Or
        this.uiNestedConditions = this.condition.conditions;
      }
    }

  }


  populateOptions(option_list: SelectItem[], options: string[]): void {
    option_list.length = 0;   // Clear the array
    for (const option of options) {
      option_list.push({label: option, value: option});
    }
  }


  onConditionChange(): void {
    // When the platform changes, we just re-intitialize the condition

    // Set the uiXXX fields to initial values
    if (this.uiCondition === 'state') {
      this.uiEntityId = null;
      this.uiState = null;
    } else if (this.uiCondition === 'numeric_state') {
      this.uiEntityId = null;
      this.uiAboveValue = null;
      this.uiBelowValue = null;
    } else if (this.uiCondition === 'sun') {
      this.uiSunAfter = null;
      this.uiSunAfterOffset = null;
      this.uiSunBefore = null;
      this.uiSunBeforeOffset = null;
    } else if (this.uiCondition === 'time') {
      this.uiTimeAfter = null;
      this.uiTimeBefore = null;
      this.uiTimeWeekday = null;
      this.uiTimeTimezone = null;
    } else if (this.uiCondition === 'zone') {
      this.uiEntityId = null;
      this.uiZone = null;
    } else if ((this.uiCondition === 'and') || (this.uiCondition === 'or')) {
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
    if (this.uiCondition === 'state') {
      this.replaceCondition(new StateCondition(this.uiEntityId, this.uiState));
    } else if (this.uiCondition === 'numeric_state') {
      this.replaceCondition(new NumericStateCondition(this.uiEntityId, this.uiAboveValue, this.uiBelowValue));
    } else if (this.uiCondition === 'sun') {
      this.replaceCondition(new SunCondition(this.uiSunAfter, this.uiSunBefore, this.uiSunAfterOffset, this.uiSunBeforeOffset));
    } else if (this.uiCondition === 'time') {
      this.replaceCondition(new TimeCondition(this.uiTimeAfter, this.uiTimeBefore, this.uiTimeWeekday, this.uiTimeTimezone));
    } else if (this.uiCondition === 'zone') {
      this.replaceCondition(new ZoneCondition(this.uiEntityId, this.uiZone));
    } else if (this.uiCondition === 'and') {
      this.replaceCondition(new AndCondition());
    } else if (this.uiCondition === 'or') {
      this.replaceCondition(new OrCondition());
    }
  }


  replaceCondition(newCondition: RuleCondition) {
    // if (this.parent == null) {
    //   console.log("ERROR: this.parent is NULL in replaceCondition");
    // }

    // if (this.parent instanceof AutomationRule) {
    //   this.parent.add_condition(newCondition);    // Add overwrites previous condition
    // }
    // else if ((this.parent instanceof AndCondition) || (this.parent instanceof OrCondition)) {
    //   this.parent.conditions[this.parentIndex] = newCondition;
    // }
    // else if (this.parent instanceof RuleActionSequence) {
    //   this.parent.condition = newCondition;
    // }
    // else if (this.parent instanceof ConditionAction) {
    //   this.parent.replaceCondition(newCondition);
    // }
    this.onReCreate.emit(newCondition);
  }


  onAddClick(): void {
    // console.log("Add Condition clicked");
    if (this.condition instanceof ParentCondition) {
      if (this.condition.conditions == null) {
        this.condition.conditions = [];
      }
      // this.condition.conditions.push(null);
      this.condition.add_condition(null);
    }
  }


  onRemoveClick(): void {
    // if (this.parent == null) {
    //   console.log("ERROR: this.parent is NULL in onRemoveClick");
    //   return;
    // }

    // if (this.parent instanceof AutomationRule) {
    //   this.parent.remove_condition();
    // }
    // else if (
    //   (this.parent instanceof AndCondition) ||
    //   (this.parent instanceof OrCondition)
    // ){
    //   this.parent.conditions.splice(this.parentIndex, 1);
    // }
    this.onRemove.emit();
  }

  onConditionReCreate(newCondition: RuleCondition, index: number): void {
      // this.rule.add_condition(newCondition); // Overwrites previous condition
      if (this.condition instanceof ParentCondition) {
        this.condition.replace_condition(newCondition, index);
      }
  }

  onConditionRemove(index: number): void {
      // this.rule.remove_condition();
      if (this.condition instanceof ParentCondition) {
        this.condition.remove_condition(index);
      }
  }

}
