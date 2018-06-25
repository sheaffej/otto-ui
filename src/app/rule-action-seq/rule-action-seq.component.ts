import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import {PrettyJsonComponent} from 'angular2-prettyjson';

import { RuleActionItem, RuleActionSequence, ServiceAction } from '../objects/rule-actions';
import { AndCondition, ParentCondition, RuleCondition } from '../objects/rule-conditions';
import { StateFlagsService } from '../services/state-flags.service';

@Component({
  selector: 'rule-action-seq',
  templateUrl: 'rule-action-seq.component.html'
})

export class RuleActionSeqComponent implements OnInit {

  @Input() actionSeq: RuleActionSequence;
  @Output() onRemove = new EventEmitter();
  // @Output() onChange = new EventEmitter();

  debug: boolean = false;
  showDetails: boolean = true;

  constructor(private stateFlags: StateFlagsService) {}

  ngOnInit() { }

  onRemoveSeqClick() {
    this.onRemove.emit();
  }

  onAddActionClick(): void {
    // this.actionSeq.sequence.push(null);
    this.actionSeq.add_action(new ServiceAction(null, null, null));
    this.stateFlags.needsSave = true;
  }

  onAddConditionClick(): void {
    this.actionSeq.add_condition(new AndCondition());
    this.stateFlags.needsSave = true;
  }

  onConditionReCreate(newCondition: RuleCondition): void {
    // this.rule.add_condition(newCondition); // Overwrites previous condition
    this.actionSeq.replace_condition(newCondition);
    this.stateFlags.needsSave = true;
  }

  onConditionRemove(): void {
    this.actionSeq.remove_condition();
    this.stateFlags.needsSave = true;
  }

  onActionReCreate(newAction: RuleActionItem, index: number): void {
    // console.log("Recreating action at index: " + index);
    this.actionSeq.replace_action(index, newAction);
    this.stateFlags.needsSave = true;
  }

  onActionRemove(index: number): void {
    this.actionSeq.remove_action(index);
    this.stateFlags.needsSave = true;
  }

  onMetadataChange(): void {
    // this.onChange.emit();
    this.stateFlags.needsSave = true;
  }

  toggleDetails(): void {
    if (this.showDetails) {
      this.showDetails = false;
    } else {
      this.showDetails = true;
    }
  }

}
