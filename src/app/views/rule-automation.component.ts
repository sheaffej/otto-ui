import { Component, Input, OnInit } from '@angular/core';

import { AutomationRule } from '../objects/rule-automation'
import { OttoRestService } from '../services/otto-rest.service'

@Component({
  selector: 'rule-automation',
  templateUrl: './templates/rule-automation.component.html',
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

    }

} // class RuleAutomationComponent