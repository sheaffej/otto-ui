import { Component, OnInit, Input } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import {PrettyJsonComponent} from 'angular2-prettyjson';

import { RuleActionSequence, RuleActionItem, DelayAction, ServiceAction, ConditionAction } from '../objects/rule-actions';
import { RuleCondition, AndCondition } from '../objects/rule-conditions';
import { OttoRestService } from '../services/otto-rest.service';

@Component({
    selector: 'rule-action',
    templateUrl: './templates/rule-action.component.html'
})

export class RuleAction implements OnInit {
    @Input() action: RuleActionItem;
    @Input() parentSeq: RuleActionSequence;
    @Input() parentIndex: number;
    
    debug: boolean = true;
    longText: string = "xxxxxxxxxxxxxxxx40-charsxxxxxxxxxxxxxxxx";

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


    constructor(private ottoService: OttoRestService) {
        // Action Type Options
        this.uiActionTypeOptions = [];
        let options = ["service", "delay", "condition"];
        for (let option of options) {
            this.uiActionTypeOptions.push({label: option, value: option});
        }
    
        // Domain Options


        // Service Options

    }

    ngOnInit() {

    }

    populateOptions(option_list: SelectItem[], options: string[]): void {
        option_list.length = 0;   // Clear the array
        for (let option of options) {
            option_list.push({label: option, value: option});
        }    
    }

    onActionTypeChange(): void {
        // When the actionType changes, we just re-intitialize the action

        // Set the uiXXX fields to initial values
        if (this.uiActionType == 'service') {
        this.uiDomain = null;
        this.uiService = null;
        this.uiDataObj = {};
        }
        else if (this.uiActionType == 'delay') {
            this.uiDelay = null;
        }
        else if (this.uiActionType == 'condition') {
            // A ConditionAction has no uiXXX elements
            // because all the uiXXX elements are in the RuleCondition (not RuleActionItem).
            // So just create a new, default ConditionAction/AndCondition
            this.action = new ConditionAction(new AndCondition());
        }

        this.recreateAction();
    }

    onChange(): void {
        this.recreateAction();
    }

    onRemoveClick(): void {
        throw new Error("onRemoveClick not implemented");
    }


    recreateAction(): void {
        // When the action changes, we just re-intitialize the action
        if (this.uiActionType == 'service') {
        this.replaceAction(new ServiceAction(this.uiDomain, this.uiService, this.uiDataObj));
        }
        else if (this.uiActionType == 'numeric_state') {
            // Do nothing since Condition has its own component with its own uiXXX elements
        }
        else if (this.uiActionType == 'delay') {
        this.replaceAction(new DelayAction(this.uiDelay));
        }
    }

    replaceAction(newAction: RuleActionItem) {
        if (this.parentSeq == null) {
        console.log("ERROR: this.parent is NULL in replaceCondition");
        }

        this.parentSeq.replace_action(this.parentIndex, newAction);
    }

} // class RuleAction