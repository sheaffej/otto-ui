import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { AutomationRule } from '../objects/rule-automation';
import { TimeTrigger } from '../objects/rule-triggers';
import { ServiceDomain } from '../objects/services';
import { StateFlagsService } from './state-flags.service';
import { ListContainer } from "../objects/data-fields";

@Injectable()
export class OttoRestService {

    private ottoRestUrl: string;
    private headers = new Headers({ 'Content-Type': 'application/json' });

    private rules: AutomationRule[] = [];
    private entities: string[] = [];
    private serviceDomains: ServiceDomain[] = [];

    private ruleIndex: Object;


    constructor(
        private http: HttpClient,
        private stateFlags: StateFlagsService,
    ) {
        const host = environment.ottoHost;
        const port = environment.ottoPort;
        this.ottoRestUrl = `http://${host}:${port}/rest`;
    }

    getRulesObservable(force: boolean = false): Observable<ListContainer<AutomationRule>> {
        let observable = null;
        if (force || (this.rules.length === 0)) {
            // Get a fresh copy of the rules
            console.log('getRules() fetching from REST API');

            observable  = this.http.get<OttoRestResponse>(`${this.ottoRestUrl}/rules`)
                .pipe(
                    // We have an OttoRestResponse where data: contains an array of rule JSONs
                    map(resp => resp.data),
                    // Now we have a single array of rule JSONs
                    map(rules => rules.map(rule_obj => AutomationRule.from_object(rule_obj))),
                    // Now we have a single array of AutomationRules
                    // Wrap it in an AutomationRuleList so it does not get converted into
                    // a stream of single AutomationRules (consumers expect an array)
                    map(rules => {
                        this.rules = rules;
                        this.updateRuleIndex();
                        return new ListContainer(rules)
                    }),
                );
        } else {
            // Return a copy of the cached rules
            // from() expects a array, so we create a 1 element array with an AutomationRuleList
            observable = from([new ListContainer(this.rules.slice())]);
        }
        return observable;
    }

    getRuleObservable(id: string): Observable<AutomationRule> {
        return this.getRulesObservable()
            .pipe(
                // This recieves an AutomationRuleList where .data
                // has an array of AutomationRule
                map(rulelist => rulelist.list.filter(rule => rule.id === id)),
                // Return only the first rule that remains
                map(rulelist => rulelist[0])
            );
    }

    getEntitiesObservable(hidden: boolean = true): Observable<ListContainer<string>> {
        let observable = null;
        if (this.entities.length === 0) {
            // Get a fresh copy of the rules
            console.log('getEntities() fetching from REST API');

            observable = this.http.get<OttoRestResponse>(`${this.ottoRestUrl}/entities`)
                .pipe(
                    map(resp => resp.data),
                    map(entities => {
                        if (hidden === false) {
                            return entities.filter(entity => entity.hidden !== true)
                        } else {
                            return entities;
                        }
                    }),
                    map(entities => entities.map(entity => entity['entity_id'])),
                    map(entities => {
                        this.entities = entities;
                        return new ListContainer<string>(entities);
                    })
                );
        } else {
            // Return a copy of the cached entities
            observable = from([new ListContainer<string>(this.entities.slice())]);
        }
        return observable;
    }

    getServicesObservable(): Observable<ListContainer<ServiceDomain>> {
        let observable = null;
        // console.log(this.serviceDomains);
        if (this.serviceDomains.length === 0) {
            // Get a fresh copy of the services
            console.log('getServices() fetching from REST API');

            observable = this.http.get<OttoRestResponse>(`${this.ottoRestUrl}/services`)
                .pipe(
                    map(resp => resp.data),
                    map(data => data.map(obj => ServiceDomain.fromDict(obj))),
                    map(serviceDomains => {
                        this.serviceDomains = serviceDomains;
                        // console.warn(this.serviceDomains);
                        return new ListContainer<ServiceDomain>(serviceDomains);
                    })
                );
        } else {
            // Return a copy of the cached services
            observable = from([new ListContainer<ServiceDomain>(this.serviceDomains)]);
        }
        return observable;
    }

    getZonesObservable(): Observable<string[]> {
        let observable = null;
        if (this.entities.length === 0) {
            // Get a fresh copy of the entities
            console.log('getZones() fetching from REST API');

            observable = this.getEntitiesObservable()
                .pipe(
                    map(entitiesList => entitiesList.list),
                    map(entities => entities.filter(entity => entity.startsWith('zone.')))
                );
        } else {
            observable = from(this.entities.filter(entity => entity.startsWith('zone.')));
        }
        return observable;
    }

    getServiceDomainNamesObservable(): Observable<string[]> {
        return this.getServicesObservable()
            .pipe(
                map(domains => domains.list.map(domain => domain.domain))
            );
    }

    getServiceNamesObservable(domainName: string): Observable<string[]> {
        return this.getServicesObservable()
            .pipe(
                map(domains => domains.list.filter(
                    domain => domain.domain === domainName)[0]
                    .services.map(service => service.service_name)
                )
            );
    }

    saveRuleObservable(rule: AutomationRule): Observable<OttoRestResponse> {
        this.stateFlags.needsServerReload = true;

        const url = `${this.ottoRestUrl}/rule`;
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');

        console.log(JSON.stringify({ data: rule.toJSON() }))
        return this.http.put<OttoRestResponse>(
            url, JSON.stringify({ data: rule.toJSON() }), { headers: headers }
        );
    }

    addRule(rule: AutomationRule): void {
        // Adds a rule to the list, but does not save it to the server
        // The rule will needed to be later saved for the server to have
        // this rule.
        this.rules.push(rule);
        this.updateRuleIndex();
    }

    deleteRuleObservable(ruleId: string): Observable<OttoRestResponse> {
        const url = `${this.ottoRestUrl}/rule/${ruleId}`;
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');

        return this.http.delete<OttoRestResponse>(
            url, { headers: headers });
    }

    enableRuleObservable(ruleId: string, enabled: boolean): Observable<OttoRestResponse> {
        const rule = this.ruleIndex[ruleId] as AutomationRule;
        rule.enabled = enabled;
        // console.log(`Enabling rule ${ruleId}`);
        return this.saveRuleObservable(rule);
    }

    serverReloadRulesObservable(): Observable<OttoRestResponse> {
        const url = `${this.ottoRestUrl}/reload`;
        return this.http.get<OttoRestResponse>(url);
    }

    nextTimeTriggerObservable(trigger: TimeTrigger): Observable<OttoRestResponse> {
        const url = `${this.ottoRestUrl}/clock/check`;
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');

        return this.http.put<OttoRestResponse>(
            url, JSON.stringify({ data: trigger.toJSON() }), { headers: headers }
        );
    }

    private updateRuleIndex(): void {
        this.ruleIndex = {};
        for (const rule of this.rules) {
            this.ruleIndex[rule.id] = rule;
        }
    }
}


export interface OttoRestResponse {
    success: boolean;
    id: string;
    message: string;
    data: any;
}
