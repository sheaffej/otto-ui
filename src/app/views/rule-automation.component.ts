import { Component, Input, OnInit } from '@angular/core';

import {PrettyJsonComponent} from 'angular2-prettyjson';

import { AutomationRule } from '../objects/rule-automation'
import { AndCondition } from '../objects/rule-conditions';
import { OttoRestService } from '../services/otto-rest.service'

@Component({
  selector: 'rule-automation',
  templateUrl: './templates/rule-automation.component.html',
  entryComponents: [PrettyJsonComponent],
})
export class AutomationRuleComponent implements OnInit {
    
    @Input() rule: AutomationRule;

    constructor(private ottoService: OttoRestService) {

    }

    ngOnInit(): void {

    }

    onAddTriggerClick(): void {
        this.rule.triggers.push(null);
    }

    onAddConditionClick(): void {
        this.rule.add_condition(new AndCondition());
    }

} // class RuleAutomationComponent