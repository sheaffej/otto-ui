import { Component, OnInit } from '@angular/core';

import { AutomationRule } from '../objects/rule-automation';
import { GrowlService } from '../services/growl.service';
import { OttoRestService } from '../services/otto-rest.service';

@Component({
    selector: 'rules-list',
    templateUrl: 'rules-list.component.html',
})
export class RulesListComponent implements OnInit {

    private rules: AutomationRule[] = [];
    groups: RuleGroupList[] = [];

    constructor(
        private ottoService: OttoRestService,
        private growl: GrowlService,
    ) { }

    ngOnInit(): void {
        this.ottoService.getRules().then(rules => this._process_rules(rules));
        // this.ottoService.getRules().then(rules => this.rules = rules.slice(0,1));
        // console.log('TEMP: Only displaying 1st rule');
    }

    _process_rules(rules: AutomationRule[]): void {
        if (rules != null) {
            this.rules = rules;

            let group_dict = {};
            for (let rule of rules) {
                if (!(rule.group in group_dict)) {
                    group_dict[rule.group] = [];
                }
                group_dict[rule.group].push(rule);
            }

            for (let group in group_dict) {
                let g = { "group": group, "rules": group_dict[group] } as RuleGroupList;
                this.groups.push(g);
            }
        }
    }

    onEnabledChange(enabled: boolean, ruleId: string): void {
        console.log(`${ruleId}: ${enabled}`);
        this.ottoService.enableRule(ruleId, enabled)
            .then(response => {
                this.growl.addSuccessMessage(response.success, response.message, null);
            });
    }

}  // class RulesListComponent

export interface RuleGroupList {
    group: string;
    rules: AutomationRule[];
}