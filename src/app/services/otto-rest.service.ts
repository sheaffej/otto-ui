import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { environment } from '../../environments/environment';
import { AutomationRule } from '../objects/rule-automation';
import { TimeTrigger } from '../objects/rule-triggers';
import { ServiceDomain } from '../objects/services';
import { GrowlService, MessageSeverity } from './growl.service';
import { StateFlagsService } from './state-flags.service';


@Injectable()
export class OttoRestService {

    private ottoRestUrl = 'http://localhost:5000/rest';
    private headers = new Headers({ 'Content-Type': 'application/json' });

    private rules: AutomationRule[] = [];
    private entities: string[] = [];
    private serviceDomains: ServiceDomain[] = [];

    private ruleIndex: Object;


    constructor(
        private http: Http,
        private growl: GrowlService,
        private stateFlags: StateFlagsService,
    ) {
        let host = environment.ottoHost;
        let port = environment.ottoPort;
        this.ottoRestUrl = `http://${host}:${port}/rest`;
    }

    getRules(force: boolean = false): Promise<AutomationRule[]> {

        let promise = null;

        if (force || (this.rules.length == 0)) {    // Get a fresh copy of the rules
            console.log("getRules() fetching from REST API");

            promise = this.http.get(`${this.ottoRestUrl}/rules`)
                .toPromise()
                .then(response => {
                    console.log("getRules() response received");
                    this.rules = (response.json().data as any[])
                        .map(rule_obj => {
                            return AutomationRule.from_object(rule_obj);
                        });
                    this.updateRuleIndex(); // Rebuild the rules index
                    return this.rules.slice(); // Return a copy of the rules
                })
                .catch(reason => this.handleRESTError(reason));
        }
        else {   // Return a copy of the cached rules 
            promise = Promise.resolve(this.rules.slice());
        }

        return promise;
    }

    getEntities(hidden: boolean=true): Promise<string[]> {
        if (this.entities.length == 0) {   // Get a fresh copy of the rules
            console.log("getEntities() fetching from REST API");
            return this.http.get(`${this.ottoRestUrl}/entities`)
                .toPromise()
                .then(response => {
                    console.log("getEntities() response received");
                    this.entities = 
                        (response.json().data as any[])
                            .filter(obj => obj.hidden == false)
                            .map(entry => entry["entity_id"])
                    return this.entities;
                })
                .catch(reason => this.handleRESTError(reason));
        }
        // console.log("getEntities serving a cached copy");
        return Promise.resolve(this.entities.slice());  // Return a copy of the cached entities
    }

    getServices(): Promise<ServiceDomain[]> {
        if (this.serviceDomains.length == 0) {
            console.log("getServices() fetching from REST API");
            return this.http.get(`${this.ottoRestUrl}/services`)
                .toPromise()
                .then(response => {
                    console.log("getServices() response received");
                    this.serviceDomains = ServiceDomain.fromRestResponse(response.json().data);
                    // console.log("serviceDomains.length = " + this.serviceDomains.length);
                    return this.serviceDomains;
                })
                .catch(reason => this.handleRESTError(reason));
        }
        return Promise.resolve(this.serviceDomains.slice());
    }

    getZones(): Promise<string[]> {
        if (this.entities.length == 0) {   // Get a fresh copy of the entities
            return this.getEntities()
                .then((entities) => entities.filter((entity) => entity.startsWith("zone.")));
        }
        return Promise.resolve(this.entities.filter((entity) => entity.startsWith("zone.")));
    }

    getServiceDomainNames(): Promise<string[]> {
        return this.getServices().then(domains => this.serviceDomains.map(domain => domain.domain))
    }

    getServiceNames(domainName: string): Promise<string[]> {
        return this.getServices().then(domains =>
            domains.filter(domain => domain.domain == domainName)[0]   // Return only 1 domain
                .services.map(service => service.service_name)
        );
    }

    getRule(id: string): Promise<AutomationRule> {
        return this.getRules().then(rules => rules.filter(rule => rule.id == id)[0])
    }

    saveRule(rule: AutomationRule): Promise<OttoRestResponse> {
        this.stateFlags.needsServerReload = true;

        let url = `${this.ottoRestUrl}/rule`;
        let headers = new Headers();
        headers.append("Content-Type", "application/json");

        return this.http.put(url, JSON.stringify({ data: rule.toJSON() }), { headers: headers })
            .toPromise()
            .then(response => response.json() as OttoRestResponse)
            .catch(reason => this.handleRESTError(reason));
    }

    addRule(rule: AutomationRule): void {
        // Adds a rule to the list, but does not save it to the server
        // The rule will needed to be later saved for the server to have
        // this rule.
        this.rules.push(rule);
        this.updateRuleIndex();
    }

    deleteRule(ruleId: string): Promise<OttoRestResponse> {
        let url = `${this.ottoRestUrl}/rule/${ruleId}`;
        let headers = new Headers();
        headers.append("Content-Type", "application/json");

        return this.http.delete(url, { headers: headers })
            .toPromise()
            .then(response => response.json() as OttoRestResponse)
            .catch(reason => this.handleRESTError(reason));
    }

    enableRule(ruleId: string, enabled: boolean): Promise<OttoRestResponse> {
        let rule = this.ruleIndex[ruleId] as AutomationRule;
        rule.enabled = enabled;
        return this.saveRule(rule);
    }

    serverReloadRules(): Promise<OttoRestResponse> {
        return this.http.get(`${this.ottoRestUrl}/reload`)
            .toPromise()
            .then(response => response.json() as OttoRestResponse)
            .catch(reason => this.handleRESTError(reason));
    }


    updateRuleIndex(): void {
        this.ruleIndex = {};
        for (let rule of this.rules) {
            this.ruleIndex[rule.id] = rule;
        }
    }

    nextTimeTrigger(trigger: TimeTrigger): Promise<OttoRestResponse> {
        let url = `${this.ottoRestUrl}/clock/check`;
        let headers = new Headers();
        headers.append("Content-Type", "application/json");

        return this.http.put(url, JSON.stringify({ data: trigger.toJSON() }), { headers: headers })
            .toPromise()
            .then(response => response.json() as OttoRestResponse)
            .catch(reason => this.handleRESTError(reason));
    }

    private handleRESTError(reason: any) {
        let message = 'OttoRESTService: failure during REST request';
        console.error(message);
        this.growl.addPersistentMessage(MessageSeverity.ERROR, message, null);
        return Promise.reject(message);
        // return null;
    }




    // getHero(id: number): Promise<Hero> {
    //   // return this.getHeroes()
    //   //            .then(heroes => heroes.find(hero => hero.id === id));
    //   const url = `${this.heroesUrl}/${id}`;

    //   return this.http.get(url)
    //     .toPromise()
    //     .then(response => response.json().data as Hero)
    //     .catch(this.handleError);
    // }

    // update(hero: Hero): Promise<Hero> {
    //   const url = `${this.heroesUrl}/${hero.id}`;

    //   return this.http.put(
    //       url, 
    //       JSON.stringify(hero), 
    //       {headers: this.headers}
    //     )
    //     .toPromise()
    //     .then( () => hero)
    //     .catch(this.handleError);
    // }

    // create(name: string): Promise<Hero> {
    //   return this.http
    //     .post(
    //       this.heroesUrl,
    //       JSON.stringify({name: name}),
    //       {headers: this.headers}
    //     )
    //     .toPromise()
    //     .then(resp => resp.json().data as Hero)
    //     .catch(this.handleError);
    // }

    // delete(id: number): Promise<void> {
    //   const url = `${this.heroesUrl}/${id}`;
    //   return this.http.delete(url, {headers: this.headers})
    //     .toPromise()
    //     .then( () => null)
    //     .catch(this.handleError);
    // }

} // class OttoRestService


export interface OttoRestResponse {
    success: boolean;
    id: string;
    message: string;
    data: any;
}