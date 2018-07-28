import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Observable, from } from 'rxjs';
import { PrettyJsonModule } from 'angular2-prettyjson';

import { EngineLogListComponent } from './engine-log-list.component';
import { EngineLogService, EngineLogEntry } from '../services/engine-log.service';
import { LogRuleIDFilterPipe } from '../log-rule-id-filter.pipe';

class EngineLogServiceMock {
    getLogsObservable(): Observable<EngineLogEntry> {
        // This is just a stub, does nothing right now
        return from([new EngineLogEntry({})]);
    }
}

describe('EngineLogListComponent', () => {
    let component: EngineLogListComponent;
    let fixture: ComponentFixture<EngineLogListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                PrettyJsonModule,
            ],
            declarations: [
                EngineLogListComponent,
                LogRuleIDFilterPipe,
            ],
            providers: [
                { provide: EngineLogService, useClass: EngineLogServiceMock },
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EngineLogListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        // This is just a stub, does nothing right now
        // component.ngOnInit();
        expect(component).toBeTruthy();
    });
});
