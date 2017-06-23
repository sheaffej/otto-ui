import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import {PrettyJsonComponent} from 'angular2-prettyjson';

import { AutomationRule } from '../objects/rule-automation';
import { RuleTrigger, StateTrigger, NumericStateTrigger, EventTrigger } from '../objects/rule-triggers';
import { OttoRestService } from '../services/otto-rest.service'

@Component({
  selector: 'rule-trigger',
  templateUrl: 'rule-trigger.component.html'
})
export class RuleTriggerComponent implements OnInit {

  @Input() trigger: RuleTrigger;
  @Output() onReCreate = new EventEmitter<RuleTrigger>();
  @Output() onRemove = new EventEmitter();

  debug: boolean = false;
  longText: string = "xxxxxxxxxxxxxxxx40-charsxxxxxxxxxxxxxxxx";

  // We need the uiXXX copies of the data in the rule condition
  // because ngModel needs to bind to an object, and if we replace
  // the rule condition in the rule, it breaks how ngModel works
  // Therefore, we simply re-create the rule condition in the rule
  // every time there is a change in the UI (using the uiXXX values)

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


  constructor(private ottoService: OttoRestService) { }


  ngOnInit() {
    // Load Platform Options
    this.uiPlatformOptions = [];
    let options = ["state", "numeric_state", "event"];
    options.map(option => this.uiPlatformOptions.push({label: option, value: option}));

    // Load Entity Id Options
    this.uiEntityIdOptions = [{label: this.longText, value: null}];
    this.ottoService.getEntities().then(entities => this.populateEntityIdOptions(entities))

    // Load Event Type
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
    options.map(option => this.uiEventTypeOptions.push({label: option, value: option }));

    // Initialize uiXXX components
    // this.trigger = this.rule.triggers[this.triggerIndex];

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

  }  // ngOnInit


  populateEntityIdOptions(entities: string[]): void {
    this.uiEntityIdOptions = [];
    let options = [];
    for (let option of entities) {
      this.uiEntityIdOptions.push({label: option, value: option});
    }
  }


  onPlatformChange(): void {
    // When the platform changes, we just re-intitialize the trigger

    // Set the uiXXX fields to initial values
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

    this.recreateTrigger();
  }


  onChange(): void {
    this.recreateTrigger();
  }


  recreateTrigger(): void {
    // When the platform changes, we just re-intitialize the trigger
    if (this.uiPlatform == 'state') {
      this.replaceTrigger(new StateTrigger(this.uiEntityId, this.uiToState, this.uiFromState));
    }
    else if (this.uiPlatform == 'numeric_state') {
      this.replaceTrigger(new NumericStateTrigger(this.uiEntityId, this.uiAboveValue, this.uiBelowValue));
    }
    else if (this.uiPlatform == 'event') {
      this.replaceTrigger(new EventTrigger(this.uiEventType, JSON.parse(this.uiEventDataObj)));
    }
  }


  replaceTrigger(trigger: RuleTrigger): void {
    this.onReCreate.emit(trigger);
  }


  onRemoveClick(): void {
    this.onRemove.emit();
  }

} // class RuleTriggerComponent