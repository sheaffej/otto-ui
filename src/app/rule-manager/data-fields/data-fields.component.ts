import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { PrettyJsonComponent } from 'angular2-prettyjson';
import { SelectItem } from 'primeng/primeng';

import { DataFieldsObject } from '../objects/data-fields';
import { RuleActionItem, ServiceAction } from '../objects/rule-actions';
import { ServiceDomain, ServiceInfo } from '../objects/services';
import { OttoRestService } from '../../services/otto-rest.service';

@Component({
    selector: 'data-fields',
    templateUrl: 'data-fields.component.html'
})
export class DataFieldsComponent implements OnInit {

    @Input() obj: any;
    @Output() onChange = new EventEmitter<RuleActionItem>();

    fieldKeys: string[];
    fieldValues: string[];

    uiEntityIdOptions: SelectItem[];

    debug: boolean = false;
    longText: string = 'xxxxxxxxxxxxxxxx40-charsxxxxxxxxxxxxxxxx';
    keyFieldLength: number = 15;
    valFieldLength: number = 50;

    constructor(private ottoService: OttoRestService) {}

    ngOnInit() {
        // Initially populate the key/value arrays
            this.fieldKeys = [];
            this.fieldValues = [];
            if (this.obj != null) {

            Object.keys(this.obj)
                .forEach(key => {
                    this.fieldKeys.push(key);
                    this.fieldValues.push(this.obj[key]);
                });

            // Load Entity Id Options
            this.uiEntityIdOptions = [{label: this.longText, value: null}];
            this.ottoService.getEntitiesObservable()
                .subscribe(entitiesList => this.populateEntityIdOptions(entitiesList.list));
        }
    }

    onKeyChange(index: number): void {
        this.reCreateObject();
    }

    onValueChange(index: number): void {
        this.reCreateObject();
    }

    onAddClick() {
        this.fieldKeys.push('');
        this.fieldValues.push('');
        this.reCreateObject();
    }

    onRemoveClick(index: number) {
        this.fieldKeys.splice(index, 1);
        this.fieldValues.splice(index, 1);
        this.reCreateObject();
    }

    reCreateObject(): void {
        const newObj = {};
        this.fieldKeys.forEach((key, index) => {
            newObj[key] = this.fieldValues[index];
        });
        this.onChange.emit(newObj);
        console.log('reCreateObject(): ' + JSON.stringify(newObj));
    }

    trackByIndex(index: number, item: any) {
        return index;
    }

    populateEntityIdOptions(entities: string[]): void {
        this.uiEntityIdOptions = [];
        for (const option of entities) {
            this.uiEntityIdOptions.push({label: option, value: option});
        }
    }

}
