import { Component, Input, OnInit } from '@angular/core';
import { PrettyJsonComponent } from 'angular2-prettyjson';
import { SelectItem } from 'primeng/primeng';

import { DataFieldsObject } from '../objects/data-fields';
import { RuleActionItem, ServiceAction } from '../objects/rule-actions';
import { ServiceDomain, ServiceInfo } from '../objects/services';

@Component({
    selector: 'data-fields',
    templateUrl: './templates/data-fields.component.html'
})
export class DataFieldsComponent implements OnInit {
    
    @Input() obj: any;
    private fieldKeys: string[];
    private fieldValues: string[];

    debug: boolean = true;

    constructor() {
        console.log("DataFieldsComponent constructor");
    }

    ngOnInit() {
        this.fieldKeys = [];
        this.fieldValues = [];
        Object.keys(this.obj)
            .forEach(key => {
                this.fieldKeys.push(key);
                this.fieldValues.push(this.obj[key]);
            })
    }

    onKeyChange(event: any, index: number): void {
        console.log(JSON.stringify(event));
    }

    onKeyBlur(event: any, index: number): void {
        console.log("blur " + this.fieldKeys[index]);            
    }

    onKeyUp(event: any): void {
        console.log("Up " + JSON.stringify(event));
    }

    keyTrackByFn(index: number, item: any) {
        return index;
    }

}  // constructor DataFieldsComponent