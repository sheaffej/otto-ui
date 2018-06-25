import { TestBed, inject } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { OttoRestService } from "./otto-rest.service";
import { StateFlagsService } from "./state-flags.service";
import { AutomationRule } from "../objects/rule-automation";
import { ListContainer } from "../objects/data-fields";


class MockResponses {
    static readonly entitiesRespone = { data: [
        { entity_id: "input_boolean.state_home_occupied", friendly_name: null, hidden: false },
        { entity_id: "input_boolean.action_light", friendly_name: null, hidden: false },
        { entity_id: "input_boolean.action_siren", friendly_name: null, hidden: false },
        { entity_id: "zone.home", friendly_name: "Home", hidden: true },
        { entity_id: "group.all_scripts", friendly_name: "all scripts", hidden: true },
    ]};

    static readonly rulesResponse = { data: [
        { id: "aaaaa", description: "Test A", enabled: true, group: "Test",
            notes: "", triggers: [], actions: []
        },
        { id: "bbbbb", description: "Test B", enabled: true, group: "Test",
            notes: "", triggers: [], actions: []
        }
    ]};
}

describe('OttoRestService', () => {
    const apiUrl = 'http://localhost:5000';

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                OttoRestService,
                StateFlagsService,
            ],
            imports: [
                HttpClientTestingModule,
            ],
        });
    });

    afterEach(
        inject([HttpTestingController], (httpMock: HttpTestingController) => {
                httpMock.verify();
        })
    );

    it('getRulesObservable() should return a RuleAutomationList with array of RuleAutomation',
        inject(
            [HttpTestingController, OttoRestService],
            (httpMock: HttpTestingController, service: OttoRestService) => {
                service.getRulesObservable().subscribe(response => {
                    expect(response instanceof ListContainer).toBeTruthy();
                    expect(response.list.length)
                        .toEqual(MockResponses.rulesResponse.data.length);
                });
                const req = httpMock.expectOne(`${apiUrl}/rest/rules`);
                expect(req.request.method).toEqual('GET');
                req.flush(MockResponses.rulesResponse);
            }
        )
    );

    it('getRuleObservable(rule_id) should return a single RuleAutomation with matching id',
        inject(
            [HttpTestingController, OttoRestService],
            (httpMock: HttpTestingController, service: OttoRestService) => {
                const rule_id = 'bbbbb';
                service.getRuleObservable(rule_id).subscribe(response => {
                    expect(response instanceof AutomationRule).toBeTruthy();
                    expect(response.id).toEqual(rule_id);
                });
                const req = httpMock.expectOne(`${apiUrl}/rest/rules`);
                expect(req.request.method).toEqual('GET');
                req.flush(MockResponses.rulesResponse);
            }
        )
    );

    it('getEntitiesObservable() should return a full StringList of entity names',
        inject(
            [HttpTestingController, OttoRestService],
            (httpMock: HttpTestingController, service: OttoRestService) => {
                service.getEntitiesObservable().subscribe(response => {
                    expect(response instanceof ListContainer).toBeTruthy();
                    expect(response.list.length)
                        .toEqual(MockResponses.entitiesRespone.data.length);
                });
                const req = httpMock.expectOne(`${apiUrl}/rest/entities`);
                expect(req.request.method).toEqual('GET');
                req.flush(MockResponses.entitiesRespone);
            }
        )
    );

    it('getEntitiesObservable(false) should return a StringList of only non-hidden entity names',
        inject(
            [HttpTestingController, OttoRestService],
            (httpMock: HttpTestingController, service: OttoRestService) => {
                service.getEntitiesObservable(false).subscribe(response => {
                    expect(response instanceof ListContainer).toBeTruthy();
                    expect(response.list.length)
                        .toEqual(MockResponses.entitiesRespone.data.length-2);
                });
                const req = httpMock.expectOne(`${apiUrl}/rest/entities`);
                expect(req.request.method).toEqual('GET');
                req.flush(MockResponses.entitiesRespone);
            }
        )
    );


    // it('getServicesObservable() should return a ListContainer of ServiceDomains',
    // it('getZonesObservable() should return a ListContainer of strings',
    // it('getServiceDomainNamesObservable() should return a ListContainer of strings',
    // it('getServiceNamesObservable() should return a ListContainer of strings',
    // it('getEntitiesObservable() should return a StringList of only non-hidden entity names',

    // it('saveRuleObservable() ',
    // it('addRule() ',
    // it('deleteRuleObservable() ',
    // it('enableRuleObservable() ',
    // it('serverReloadRulesObservable() ',
    // it('nextTimeTriggerObservable() ', 

});


