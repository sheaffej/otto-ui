import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import {PrettyJsonComponent} from 'angular2-prettyjson';

import { RuleActionSequence, RuleActionItem, DelayAction,
  ServiceAction, ConditionAction } from '../objects/rule-actions';
import { RuleCondition, AndCondition } from '../objects/rule-conditions';
import { ServiceDomain } from '../objects/services';

import { OttoRestService } from '../services/otto-rest.service';

@Component({
  selector: 'rule-action',
  templateUrl: 'rule-action.component.html'
})

export class RuleActionComponent implements OnInit {
  @Input() action: RuleActionItem;
  // @Input() parentSeq: RuleActionSequence;
  // @Input() parentIndex: number;
  @Output() onReCreate = new EventEmitter<RuleActionItem>();
  @Output() onRemove = new EventEmitter();

  debug: boolean = false;
  longText: string = 'xxxxxxxxxxxxxxxx40-charsxxxxxxxxxxxxxxxx';

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


  constructor(private ottoService: OttoRestService) {}

  ngOnInit() {
    // Action Type Options
    this.uiActionTypeOptions = [];
    const options = ['service', 'delay', 'condition'];
    for (const option of options) {
      this.uiActionTypeOptions.push({label: option, value: option});
    }

    // Initialize uiXXX properties
    if (this.action != null) {

      if (this.action instanceof ServiceAction) {
        this.uiActionType = 'service';
        this.uiDomain = this.action.domain;
        this.uiService = this.action.service;
        this.uiDataObj = this.action.data;
        // console.log(JSON.stringify(this.action.data));
      } else if (this.action instanceof DelayAction) {
        this.uiActionType = 'delay';
        this.uiDelay = this.action.delay;
      } else if (this.action instanceof ConditionAction) {
        this.uiActionType = 'condition';
      }
    }


    // Domain & Service Options
    this.uiDomainOptions = [{label: this.longText, value: ''}];   // Don't set to null, as that is
    this.uiServiceOptions = [{label: this.longText, value: ''}];  // the default value, set to '' instead
    this.ottoService.getServicesObservable()
      .subscribe(domains => this.processServiceDomains(domains.list));

  }

  private processServiceDomains(domains: ServiceDomain[]): void {
    this.serviceDomains = domains;
    this.populateDomainOptions();
    this.populateServiceOptions();
  }

  populateDomainOptions(): void {
    this.uiDomainOptions.length = 0;  // Clear the array
    this.serviceDomains.map(domain => {
      this.uiDomainOptions.push({label: domain.domain, value: domain.domain});
    });
  }

  populateServiceOptions(): void {
    if ((this.serviceDomains != null) && (this.uiDomain != null)) {
      this.uiServiceOptions.length = 0; // Clear the array
      
      const domain = this.serviceDomains.filter(domain => domain.domain === this.uiDomain)[0]      
      if (domain != null) {
        domain.services.map(service => this.uiServiceOptions.push(
          { label: service.service_name, value: service.service_name }
        ));
      } else {
        console.error(
          `Domain (${this.uiDomain}) not found in ServiceDomains received from Otto-Engine`);
      }
    } else {
      console.log('Can\'t populate service options since component\'s domain is null');
    }
  }


  onActionTypeChange(): void {
    // When the actionType changes, we just re-intitialize the action
    console.log('Action type changed: ' + this.uiActionType);

    // Set the uiXXX fields to initial values
    if (this.uiActionType === 'service') {
      this.uiDomain = null;
      this.uiService = null;
      // this.uiDataObj = JSON.stringify({});
      this.uiDataObj = null;
    } else if (this.uiActionType === 'delay') {
      this.uiDelay = null;
    } else if (this.uiActionType === 'condition') {
      // A ConditionAction has no uiXXX elements
      // because all the uiXXX elements are in the RuleCondition (not RuleActionItem).
      // So just create a new, default ConditionAction/AndCondition
      // this.action = new ConditionAction(new AndCondition());
    }

    this.recreateAction();
  }


  onDomainChange(): void {
    console.log('Domain Change => ' + this.uiDomain);
    // Update Service Options based on the current domain
    this.uiService = '';
    this.uiDataObj = null;
    this.populateServiceOptions();

    this.onChange();
  }

  onChange(): void {
    this.recreateAction();
  }

  onRemoveClick(): void {
    this.onRemove.emit();
  }


  recreateAction(): void {
    // When the action changes, we just re-intitialize the action
    if (this.uiActionType === 'service') {
      this.replaceAction(new ServiceAction(this.uiDomain, this.uiService, this.uiDataObj));
    } else if (this.uiActionType === 'condition') {
      // Do nothing since Condition has its own component with its own uiXXX elements
      this.replaceAction(new ConditionAction(new AndCondition()));
    } else if (this.uiActionType === 'delay') {
      this.replaceAction(new DelayAction(this.uiDelay));
    }
  }

  replaceAction(newAction: RuleActionItem) {
    this.onReCreate.emit(newAction);
  }

  onConditionReCreate(newCondition: RuleCondition): void {
    // this.rule.add_condition(newCondition); // Overwrites previous condition
    if (this.action instanceof ConditionAction) {
      this.action.condition = newCondition;
    }
  }

  onConditionRemove(): void {
    // this.rule.remove_condition();
    // this.actionSeq.condition.remove_condition(index);

    //  NEED TO IMPLEMENT
    //  Emit event to remove this action from parent
  }

  onDataChange(newObj: any): void {
    console.log('onDataChange(): ' + JSON.stringify(newObj));
    this.uiDataObj = newObj;
    this.onChange();
  }


}
