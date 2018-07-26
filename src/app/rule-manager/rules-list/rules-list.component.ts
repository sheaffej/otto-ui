import { Component, OnInit } from '@angular/core';

import { AutomationRule } from '../objects/rule-automation';
import { GrowlService } from '../../services/growl.service';
import { OttoRestService } from '../services/otto-rest.service';
import { ListContainer } from '../objects/data-fields';

@Component({
    selector: 'rules-list',
    templateUrl: 'rules-list.component.html',
})
export class RulesListComponent implements OnInit {

    groups: RuleGroupList[] = [];
    private rules: AutomationRule[] = [];

    constructor(
        private ottoService: OttoRestService,
        private growl: GrowlService,
    ) { }

    ngOnInit(): void {
        this.ottoService.getRulesObservable()
            .subscribe(rules => this._process_rules(rules));
    }

    _process_rules(rulelist: ListContainer<AutomationRule>): void {
        if (rulelist != null) {
            this.rules = rulelist.list;

            const group_dict = {};
            for (const rule of this.rules) {
                if (!(rule.group in group_dict)) {
                    group_dict[rule.group] = [];
                }
                group_dict[rule.group].push(rule);
            }

            for (const group in group_dict) {
                const g = { 'group': group, 'rules': group_dict[group] } as RuleGroupList;
                this.groups.push(g);
            }
        }
    }

    onEnabledChange(enabled: boolean, ruleId: string): void {
        console.log(`${ruleId}: ${enabled}`);
        this.ottoService.enableRuleObservable(ruleId, enabled)
            .subscribe(response =>
            // .then(response => {
                this.growl.addSuccessMessage(response.success, response.message, null)
            );
    }

}  // class RulesListComponent

export interface RuleGroupList {
    group: string;
    rules: AutomationRule[];
}
