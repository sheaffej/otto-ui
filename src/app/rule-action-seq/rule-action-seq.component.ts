import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import {PrettyJsonComponent} from 'angular2-prettyjson';

import { RuleActionSequence, RuleActionItem, ServiceAction } from '../objects/rule-actions';
import { RuleCondition, ParentCondition, AndCondition } from '../objects/rule-conditions';

@Component({
  selector: 'rule-action-seq',
  templateUrl: 'rule-action-seq.component.html'
})

export class RuleActionSeqComponent implements OnInit {
  
  @Input() actionSeq: RuleActionSequence;
  @Output() onRemove = new EventEmitter();
  
  debug: boolean = false;

  constructor() { }

  ngOnInit() { }

  onRemoveSeqClick() {
    this.onRemove.emit();
  }

  onAddActionClick(): void {
    // this.actionSeq.sequence.push(null);
    this.actionSeq.add_action(new ServiceAction(null, null, null));
  }

  onAddConditionClick(): void {
    this.actionSeq.add_condition(new AndCondition());
  }

  onConditionReCreate(newCondition: RuleCondition): void {
    // this.rule.add_condition(newCondition); // Overwrites previous condition
    this.actionSeq.replace_condition(newCondition);
  }

  onConditionRemove(): void {
    this.actionSeq.remove_condition();
  }

  onActionReCreate(newAction: RuleActionItem, index: number): void {
    console.log("Recreating action at index: " + index);
    this.actionSeq.replace_action(index, newAction);
  }

  onActionRemove(index: number): void {
    this.actionSeq.remove_action(index);
  }

} // class RuleActionSeqComponent