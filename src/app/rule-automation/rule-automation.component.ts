import { Component, Input, OnInit } from '@angular/core';
import { PrettyJsonComponent } from 'angular2-prettyjson';

import { AutomationRule } from '../objects/rule-automation'
import { AndCondition, RuleCondition } from '../objects/rule-conditions';
import { RuleActionSequence } from '../objects/rule-actions';
import { RuleTrigger } from '../objects/rule-triggers';
import { GrowlService, MessageSeverity } from '../services/growl.service';
import { OttoRestService } from '../services/otto-rest.service';
import { StateFlagsService } from '../services/state-flags.service';

@Component({
    selector: 'rule-automation',
    templateUrl: 'rule-automation.component.html',
    entryComponents: [PrettyJsonComponent],
})
export class RuleAutomationComponent implements OnInit {

    @Input() rule: AutomationRule;

    // showDialog: boolean = false;
    // dialogContent: any;

    constructor(
        private ottoService: OttoRestService,
        private growl: GrowlService,
        private stateFlags: StateFlagsService,
    ) { }

    ngOnInit(): void { }

    onAddTriggerClick(): void {
        this.rule.add_trigger(null);
        this.stateFlags.needsSave = true;
    }

    onAddConditionClick(): void {
        this.rule.add_condition(new AndCondition());
        this.stateFlags.needsSave = true;
    }

    onAddActionSequenceClick(): void {
        this.rule.add_action_sequence(new RuleActionSequence());
        this.stateFlags.needsSave = true;
    }

    onTriggerReCreate(newTrigger: RuleTrigger, index: number): void {
        this.rule.replace_trigger(newTrigger, index);
        this.stateFlags.needsSave = true;
    }

    onTriggerRemove(index: number): void {
        console.log("Removing index: " + index);
        this.rule.remove_trigger(index);
        this.stateFlags.needsSave = true;
    }

    onConditionReCreate(newCondition: RuleCondition): void {
        this.rule.add_condition(newCondition); // Overwrites previous condition
        this.stateFlags.needsSave = true;
    }

    onConditionRemove(): void {
        this.rule.remove_condition();
        this.stateFlags.needsSave = true;
    }

    onActionSequenceRemove(index: number): void {
        this.rule.remove_action_sequence(index);
        this.stateFlags.needsSave = true;
    }

    onSaveClick(): void {
        this.ottoService.saveRule(this.rule)
            .then(resp => {
                if (resp.success) {
                    this.growl.addSuccessMessage(resp.success, resp.message, null)
                    this.stateFlags.needsSave = false;
                }
                else {
                    this.growl.addPersistentMessage(MessageSeverity.ERROR, resp.message, null);
                }
            });
    }


    onEnabledChange(enabled: boolean): void {
        // console.log(`${this.rule.id}: ${enabled}`);
        this.ottoService.enableRule(this.rule.id, enabled)
            .then(response => {
                this.growl.addSuccessMessage(response.success, response.message, null);
            });
    }

} // class RuleAutomationComponent