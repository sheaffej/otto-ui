import { Component, OnInit, Input } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import {PrettyJsonComponent} from 'angular2-prettyjson';

import { RuleActionSequence } from '../objects/rule-actions';

@Component({
    selector: 'rule-action-seq',
    templateUrl: './templates/rule-action-seq.component.html'
})

export class RuleActionSeqComponent implements OnInit {
    
    @Input() actionSeq: RuleActionSequence;
    
    debug: boolean = true;

    constructor() { }

    ngOnInit() { }

} // class RuleActionSeqComponent