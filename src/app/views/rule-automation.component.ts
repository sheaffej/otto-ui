import { Component, Input, OnInit } from '@angular/core';
import {PrettyJsonComponent} from 'angular2-prettyjson';

import { AutomationRule } from '../objects/rule-automation'
import { RuleTrigger } from '../objects/rule-triggers';
import { AndCondition, RuleCondition } from '../objects/rule-conditions';
import { RuleActionSequence } from '../objects/rule-actions';
import { OttoRestService } from '../services/otto-rest.service'

@Component({
  selector: 'rule-automation',
  templateUrl: './templates/rule-automation.component.html',
  entryComponents: [PrettyJsonComponent],
})
export class AutomationRuleComponent implements OnInit {
  
  @Input() rule: AutomationRule;

  constructor(private ottoService: OttoRestService) {}

  ngOnInit(): void {}

  onSaveClick(): void {
    console.log(`Saving rule ${this.rule.id}`);
    this.ottoService.saveRule(this.rule)
      .then(resp => {
        console.log(resp);
      })
  }

  onAddTriggerClick(): void {
    this.rule.add_trigger(null);
  }

  onAddConditionClick(): void {
    this.rule.add_condition(new AndCondition());
  }

  onAddActionSequenceClick(): void {
    this.rule.add_action_sequence(new RuleActionSequence());
  }

  onTriggerReCreate(newTrigger: RuleTrigger, index: number): void {
    // console.log("Re-creating index: " + index);
    this.rule.replace_trigger(newTrigger, index);
  }

  onTriggerRemove(index: number): void {
    console.log("Removing index: " + index);
    this.rule.remove_trigger(index);
  }

  onConditionReCreate(newCondition: RuleCondition): void {
    this.rule.add_condition(newCondition); // Overwrites previous condition
  }

  onConditionRemove(): void {
    this.rule.remove_condition();
  }

  onActionSequenceRemove(index: number): void {
    this.rule.remove_action_sequence(index);
  }

} // class RuleAutomationComponent