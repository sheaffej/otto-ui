import { Component, ViewChild, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { TestBed, ComponentFixture, async } from "@angular/core/testing";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable, from } from 'rxjs';

import { PrettyJsonModule } from 'angular2-prettyjson';
import { DropdownModule, InputTextModule } from 'primeng/primeng';

import { RuleConditionComponent } from './rule-condition.component';
import { RuleCondition, TimeCondition } from '../objects/rule-conditions';
import { OttoRestService } from '../services/otto-rest.service';
import { ListContainer } from '../objects/data-fields';

class OttoRestServiceMock {
    getEntitiesObservable(hidden: boolean = true): Observable<ListContainer<string>> {
        return from([new ListContainer(
            ["test.entity_1", "test.entity_2", "test.entity_3"]
        )]);
    }

    getZonesObservable(): Observable<ListContainer<string>> {
        return from([new ListContainer<string>(
            ["zone.home", "zone.office"]
        )]);
    }
}

@Component({
    selector: 'host-component',
    template: '<rule-condition></rule-condition>'
})
class TestHostComponent {
    @ViewChild(RuleConditionComponent)
    public testComponent: RuleConditionComponent;
}

describe('RuleConditionComponent', () => {

    let testHostComponent: TestHostComponent;
    let testHostFixture: ComponentFixture<TestHostComponent>;
    let testComponent: RuleConditionComponent;
    
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                PrettyJsonModule,
                DropdownModule,
                InputTextModule,
                BrowserAnimationsModule,
            ],
            declarations: [
                TestHostComponent,
                RuleConditionComponent
            ],
            providers: [
                { provide: OttoRestService, useClass: OttoRestServiceMock },
            ],
            schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
        }).compileComponents();
    }));

    beforeEach(() => {
        testHostFixture = TestBed.createComponent(TestHostComponent);
        testHostComponent = testHostFixture.componentInstance;
        testComponent = testHostComponent.testComponent;
    });

    it('TimeCondition', () => {
        const cond_json = {
            "condition": "time",
            "after": "01:00:00",
            "before": "23:00:00",
            "weekday": ["tue", "fri"],
            "tz": "UTC"
        };
        let cond = RuleCondition.fromObject(cond_json);
        testComponent.condition = cond;
        testHostFixture.detectChanges();
        testComponent.ngOnInit();
        testHostFixture.detectChanges();
        expect(testComponent.uiTimeTimezone).toEqual("UTC");
    })

});