import { Component, OnInit } from '@angular/core';

import { AutomationRule } from '../objects/rule-automation'
import { OttoRestService } from '../services/otto-rest.service'

@Component({
  selector: 'rules-list',
  templateUrl: './templates/rules-list.component.html',
})
export class RulesListComponent implements OnInit {

  private rules: AutomationRule[] = [];

  constructor (private ottoService: OttoRestService) {}

  ngOnInit(): void {
    this.getRules();
  }

  getRules(): void {
    this.ottoService.getRules().then(rules => this.rules = rules);
  }

  onAddTriggerClick(rule: AutomationRule): void {
    rule.triggers.push(null);
  }

}