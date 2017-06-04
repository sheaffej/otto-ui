import { Component, OnInit, Input } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import {PrettyJsonComponent} from 'angular2-prettyjson';

import { RuleActionSequence, RuleActionItem, DelayAction, 
  ServiceAction, ConditionAction } from '../objects/rule-actions';
import { RuleCondition, AndCondition } from '../objects/rule-conditions';
import { OttoRestService } from '../services/otto-rest.service';
import { ServiceDomain } from '../objects/services';

@Component({
  selector: 'rule-action',
  templateUrl: './templates/rule-action.component.html'
})

export class RuleAction implements OnInit {
  @Input() action: RuleActionItem;
  @Input() parentSeq: RuleActionSequence;
  @Input() parentIndex: number;
  
  debug: boolean = true;
  longText: string = "xxxxxxxxxxxxxxxx40-charsxxxxxxxxxxxxxxxx";

  // Service Registrations
  serviceDomains: ServiceDomain[];

  // Action Type
  uiActionType: string;
  uiActionTypeOptions: SelectItem[];

  // Domain (for ServiceAction)
  uiDomain: string;
  uiDomainOptions: SelectItem[];

  // Service (for ServiceAction)
  uiService: string;
  uiServiceOptions: SelectItem[];

  // Data Object (for ServiceAction)
  uiDataObj: any;
  
  // Condition (for ConditionAction)
  // uiCondition: RuleCondition;
  
  // Delay (for DelayAction)
  uiDelay: string;


  constructor(private ottoService: OttoRestService) {
    // Action Type Options
    this.uiActionTypeOptions = [];
    let options = ["service", "delay", "condition"];
    for (let option of options) {
      this.uiActionTypeOptions.push({label: option, value: option});
    }
  
    // Domain & Service Options
    this.uiDomainOptions = [{label: this.longText, value: ''}];   // Don't set to null, as that is
    this.uiServiceOptions = [{label: this.longText, value: ''}];  // the default value, set to '' instead
    ottoService.getServices().then(domains => this.processServiceDomains(domains))

  }

  ngOnInit() {  
    if (this.action != null) {

      if (this.action instanceof ServiceAction){
        console.log("I am a ServiceAction");
        this.uiActionType = "service";
        this.uiDomain = this.action.domain;
        this.uiService = this.action.service;
        console.log(this.uiService);
        this.uiDataObj = JSON.stringify(this.action.data);
      }
      else if (this.action instanceof DelayAction) {
        this.uiActionType = "delay";
        this.uiDelay = this.action.delay;
      }
      else if (this.action instanceof ConditionAction) {
        this.uiActionType = "condition";
      }
    }
  }

  private processServiceDomains(domains: ServiceDomain[]): void {
    this.serviceDomains = domains;
    this.populateDomainOptions();    // This will also call populateServiceOptions
  }

  populateDomainOptions(): void {
    let curUiDomain = this.uiDomain;
    this.uiDomain = null;

    this.uiDomainOptions.length = 0;  // Clear the array    
    this.serviceDomains.map(domain => this.uiDomainOptions.push({label: domain.domain, value: domain.domain}));
    
    // Re-select dropdown
    if (this.action instanceof ServiceAction) {
      setTimeout(() => {
        this.uiDomain = curUiDomain;
        this.populateServiceOptions();  // Re-popluate Service Options
      }, 100);
    }
  }

  populateServiceOptions(): void {
    if ((this.serviceDomains != null) && (this.uiDomain != null)) {
      let curUiService = this.uiService;
      this.uiService = null;

      this.uiServiceOptions.length = 0; // Clear the array
      this.serviceDomains
        .filter(domain => domain.domain == this.uiDomain)[0]   // Return only 1 domain
        .services.map(service => this.uiServiceOptions.push(
              { label: service.service_name, value: service.service_name }
        ));
    
      // Re-select the dropdown
      if (this.action instanceof ServiceAction) {
        setTimeout(() => this.uiService = curUiService, 100);
      }
    }
  }


  onActionTypeChange(): void {
    // When the actionType changes, we just re-intitialize the action
    console.log("Action type changed: " + this.uiActionType);

    // Set the uiXXX fields to initial values
    if (this.uiActionType == 'service') {
    this.uiDomain = null;
    this.uiService = null;
    this.uiDataObj = {};
    }
    else if (this.uiActionType == 'delay') {
      this.uiDelay = null;
    }
    else if (this.uiActionType == 'condition') {
      // A ConditionAction has no uiXXX elements
      // because all the uiXXX elements are in the RuleCondition (not RuleActionItem).
      // So just create a new, default ConditionAction/AndCondition
      // this.action = new ConditionAction(new AndCondition());
    }

    this.recreateAction();
  }


  onDomainChange(): void {
    console.log("Domain Change => " + this.uiDomain);
    // Update Service Options based on the current domain
    this.uiService = '';
    this.populateServiceOptions();

    this.onChange()
  }

  onChange(): void {
    this.recreateAction();
  }

  onRemoveClick(): void {
    // throw new Error("onRemoveClick not implemented");
    this.parentSeq.sequence.splice(this.parentIndex, 1);
  }


  recreateAction(): void {
    // When the action changes, we just re-intitialize the action
    if (this.uiActionType == 'service') {
      this.replaceAction(new ServiceAction(this.uiDomain, this.uiService, JSON.parse(this.uiDataObj)));
    }
    else if (this.uiActionType == 'condition') {
      // Do nothing since Condition has its own component with its own uiXXX elements
      this.replaceAction(new ConditionAction(new AndCondition()));
    }
    else if (this.uiActionType == 'delay') {
      this.replaceAction(new DelayAction(this.uiDelay));
    }
  }

  replaceAction(newAction: RuleActionItem) {
    if (this.parentSeq == null) {
    console.log("ERROR: this.parent is NULL in replaceCondition");
    }

    this.parentSeq.replace_action(this.parentIndex, newAction);
  }

} // class RuleAction