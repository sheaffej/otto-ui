import { Component, OnInit, Input } from '@angular/core';
import { SelectItem } from 'primeng/primeng';

import { OttoRestService } from '../services/otto-rest.service'
import { AutomationRule } from '../objects/rule-automation';
import { RuleTrigger, StateTrigger, NumericStateTrigger, EventTrigger } from '../objects/rule-triggers';

@Component({
  selector: 'rule-trigger',
  templateUrl: './templates/rule-trigger.component.html'
})
export class RuleTriggerComponent implements OnInit {

  @Input() rule: AutomationRule;
  @Input() triggerIndex: number;
  trigger: RuleTrigger;

  debug: boolean = true;
  longText: string = "xxxxxxxxxxxxxxxx40-charsxxxxxxxxxxxxxxxx";
  
  // Platform
  uiPlatformOptions: SelectItem[];
  uiPlatform: string;

  // Entity Id [State, NumericState]
  uiEntityIdOptions: SelectItem[];
  uiEntityId: string;

  // To [State]
  uiToState: string;

  // From [State]
  uiFromState: string;

  // Above Value [Numeric State]
  uiAboveValue: number;

  // Below Value [Numeric State]
  uiBelowValue: number;

  // Event Type [Event]
  uiEventTypeOptions: SelectItem[];
  uiEventType: string;
  uiEventDataObj: any;

  // Buttons
  saveNeeded: boolean;


  constructor(private ottoService: OttoRestService) {
    // Platform Options
    this.uiPlatformOptions = [];
    let options = ["state", "numeric_state", "event"];
    for (let option of options) {
      this.uiPlatformOptions.push({label: option, value: option});
    }

    // Entity Id Options
    ottoService.getEntities().then(entities => this.populateEntityIdOptions(entities))
    this.uiEntityIdOptions = [{label: this.longText, value: null}];

    // Event Type
    this.uiEventTypeOptions = [];
    options = [
      "homeassistant_start", 
      "homeassistant_stop",
      "state_changed", 
      "time_changed",
      "service_registered", 
      "call_service",
      "service_executed", 
      "platform_discovered",
      "component_loaded",
    ];
    for (let option of options) {
      this.uiEventTypeOptions.push({label: option, value: option });
    }

    this.saveNeeded = false;
  } // constructor

  // Properties
  get jsonString(): string { return JSON.stringify(this.trigger); }

  ngOnInit() {
    this.trigger = this.rule.triggers[this.triggerIndex];

    if (this.trigger != null) {
      this.uiPlatform = this.trigger.platform;
      if (this.trigger instanceof StateTrigger) {
        this.uiEntityId = this.trigger.entity_id;
        this.uiToState = this.trigger.to;
        this.uiFromState = this.trigger.from;
      }
      else if (this.trigger instanceof NumericStateTrigger) {
        this.uiEntityId = this.trigger.entity_id;
        this.uiAboveValue = this.trigger.above_value;
        this.uiBelowValue = this.trigger.below_value;
      }
      else if (this.trigger instanceof EventTrigger) {
        this.uiEventType = this.trigger.event_type;
        this.uiEventDataObj = JSON.stringify(this.trigger.event_data_obj);
      }
    }
  }

  populateEntityIdOptions(entities: string[]): void {
    this.uiEntityIdOptions = [];
    let options = [];
    for (let option of entities) {
      this.uiEntityIdOptions.push({label: option, value: option});
    }
  }

  onPlatformChange(): void {
    // When the platform changes, we just re-intitialize the trigger
    if (this.uiPlatform == 'state') {
      this.uiEntityId = null;
      this.uiToState = null;
      this.uiFromState = null;
    }
    else if (this.uiPlatform == 'numeric_state') {
      this.uiEntityId = null;
      this.uiAboveValue = null;
      this.uiBelowValue = null;
    }
    else if (this.uiPlatform == 'event') {
      this.uiEventType = null;
      this.uiEventDataObj = '{}';
    }
    this.checkSaveNeeded();
  }

  onChange(): void {
    this.checkSaveNeeded();
  }


  checkSaveNeeded(): void {
    let needed = false;

    if (this.trigger == null) {   // New trigger not yet saved
      this.saveNeeded = true;
      return;
    }

    if (this.uiPlatform != this.trigger.platform) {needed = true; }

    if (
      (this.trigger instanceof StateTrigger) || (this.trigger instanceof NumericStateTrigger)) {
        if (this.uiEntityId != this.trigger.entity_id) { needed = true;}
    }

    if (this.trigger instanceof StateTrigger) {
      if (this.uiToState != this.trigger.to) { needed = true; }
      if (this.uiFromState != this.trigger.from) {needed = true; }
    }

    else if (this.trigger instanceof NumericStateTrigger) {
      if (this.uiAboveValue != this.trigger.above_value) { needed = true; }
      if (this.uiBelowValue != this.trigger.below_value) { needed = true; }
    }

    else if (this.trigger instanceof EventTrigger) {
      if (this.uiEventType != this.trigger.event_type) { needed = true; }
      if (this.uiEventDataObj != JSON.stringify(this.trigger.event_data_obj)) { needed = true; }
    }

    this.saveNeeded = needed;
  }


  onSaveClick(): void {
    let trigger = null;
    if (this.uiPlatform == 'state') {
      let to = this.uiToState == '' ? null : this.uiToState;
      let from = this.uiFromState == '' ? null : this.uiFromState;
      trigger = new StateTrigger(this.uiEntityId, to, from);
    }
    else if (this.uiPlatform == 'numeric_state') {
      trigger = new NumericStateTrigger(this.uiEntityId, this.uiAboveValue, this.uiBelowValue);
    }
    else if (this.uiPlatform == 'event') {
      trigger = new EventTrigger(this.uiEventType, JSON.parse(this.uiEventDataObj));
    }

    this.rule.triggers[this.triggerIndex] = trigger; // replace the trigger in the rule object
  }

  onRemoveClick(): void {
    this.rule.triggers.splice(this.triggerIndex, 1);
  }

} // class RuleTriggerComponent