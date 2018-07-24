import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrettyJsonComponent } from 'angular2-prettyjson';
import { ConfirmationService } from 'primeng/primeng';

import { AutomationRule } from '../objects/rule-automation';
import { AndCondition, RuleCondition } from '../objects/rule-conditions';
import { RuleActionSequence } from '../objects/rule-actions';
import { RuleTrigger } from '../objects/rule-triggers';
import { GrowlService, MessageSeverity } from '../../services/growl.service';
import { OttoRestService } from '../../services/otto-rest.service';
import { StateFlagsService } from '../../services/state-flags.service';

@Component({
    selector: 'rule-automation',
    templateUrl: 'rule-automation.component.html',
    entryComponents: [PrettyJsonComponent],
})
export class RuleAutomationComponent implements OnInit {

    @Input() rule: AutomationRule;

    // showDialog: boolean = false;
    // dialogContent: any;

    public stateFlags: StateFlagsService;

    constructor(
        private ottoService: OttoRestService,
        private growl: GrowlService,
        stateFlags: StateFlagsService,
        private confirmService: ConfirmationService,
        private router: Router,
    ) {
        this.stateFlags = stateFlags;
    }

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
        console.log('Removing index: ' + index);
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

    // onActionSequenceChange(index: number): void {
        // this.stateFlags.needsSave = true;
    // }

    onSaveClick(): void {
        this.ottoService.saveRuleObservable(this.rule)
            // .then(resp => {
            .subscribe(resp => {
                if (resp.success) {
                    this.growl.addSuccessMessage(resp.success, resp.message, null);
                    this.stateFlags.needsSave = false;
                } else {
                    this.growl.addPersistentMessage(MessageSeverity.ERROR, resp.message, null);
                }
            });
    }

    onDeleteClick(): void {
        this.confirmService.confirm({
            message: `Confirm you want to delete rule ${this.rule.id}<br/><br/>${this.rule.description}`,
            accept: () => {
                // console.log("This will delete a rule");
                this.ottoService.deleteRuleObservable(this.rule.id)
                    // .then(resp => {
                    .subscribe(resp => {
                        if (resp.success) {
                            this.growl.addSuccessMessage(resp.success, `Rule ${this.rule.id} deleted`, null);
                            this.ottoService.serverReloadRulesObservable()
                                // .then(resp2 => {
                                .subscribe(resp2 => {
                                    if (resp2.success) {
                                        this.growl.addSuccessMessage(resp.success, 'Server reloaded', null);
                                        this.ottoService.getRulesObservable(true)
                                            .subscribe(resp3 => this.router.navigate(['/']));
                                    }
                                });
                        } else {
                            this.growl.addPersistentMessage(MessageSeverity.ERROR, resp.message, null);
                        }
                    });
            }
        });
    }

    onMetadataChange(): void {
        this.stateFlags.needsSave = true;
    }


    onEnabledChange(enabled: boolean): void {
        console.log(`${this.rule.id}: ${enabled}`);
        this.ottoService.enableRuleObservable(this.rule.id, enabled)
            // .then(response => {
            .subscribe(response => {
                this.growl.addSuccessMessage(response.success, response.message, null);
            });
    }

}
