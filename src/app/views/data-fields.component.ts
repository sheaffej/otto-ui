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

    onKeyChange(index: number): void {
        this.reCreateObject();
    }

    onValueChange(index: number): void {
        this.reCreateObject();
    }

    onAddClick() {
        this.fieldKeys.push("");
        this.fieldValues.push("");
        this.reCreateObject();
    }

    onRemoveClick(index: number) {
        this.fieldKeys.splice(index, 1);
        this.fieldValues.splice(index, 1);
        this.reCreateObject();
    }

    reCreateObject(): void {
        this.obj = {};
        this.fieldKeys.forEach((key, index) => {
            this.obj[key] = this.fieldValues[index];
        });
    }

    trackByIndex(index: number, item: any) {
        return index;
    }

}  // constructor DataFieldsComponent