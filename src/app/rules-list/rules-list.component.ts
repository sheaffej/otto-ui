import { Component, OnInit } from '@angular/core';

import { AutomationRule } from '../objects/rule-automation'
import { OttoRestService } from '../services/otto-rest.service'

@Component({
  selector: 'rules-list',
  templateUrl: 'rules-list.component.html',
})
export class RulesListComponent implements OnInit {

  private rules: AutomationRule[] = [];
  groups: RuleGroupList[] = [];

  constructor (private ottoService: OttoRestService) {}

  ngOnInit(): void {
    this.ottoService.getRules().then(rules => this._process_rules(rules));
    // this.ottoService.getRules().then(rules => this.rules = rules.slice(0,1));
    // console.log('TEMP: Only displaying 1st rule');
  }

  _process_rules(rules: AutomationRule[]): void {
    this.rules = rules;

    let group_dict = {};
    for (let rule of rules) {
      if ( !(rule.group in group_dict) ) {
        group_dict[rule.group] = [];
      }      
      group_dict[rule.group].push(rule);
    }

    for (let group in group_dict) {
      // console.log(group);
      let g = {"group": group, "rules": group_dict[group] } as RuleGroupList;
      this.groups.push(g);
    }
    // console.log(JSON.stringify(this.groups));
  }

}  // class RulesListComponent

export interface RuleGroupList {
  group: string;
  rules: AutomationRule[];

}