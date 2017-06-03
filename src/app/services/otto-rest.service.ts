import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { AutomationRule } from '../objects/rule-automation'
import { ServiceDomain } from '../objects/services';


@Injectable()
export class OttoRestService {

  private ottoRestUrl = 'http://localhost:5000/rest';
  private headers = new Headers({'Content-Type': 'application/json'});
  
  private rules: AutomationRule[] = [];
  private entities: string[] = [];
  private serviceDomains: ServiceDomain[] = [];

  // private entitiesRequested: boolean;

  constructor(private http: Http){ 
    this.getEntities();
  }

  getRules(): Promise<AutomationRule[]> {
    if (this.rules.length == 0) {    // Get a fresh copy of the rules
      return this.http.get(`${this.ottoRestUrl}/rules`)
        .toPromise()
        // .then(response => response.json().data as AutomationRule[])
        .then(response => (response.json().data as any[]).map(rule_obj => AutomationRule.from_object(rule_obj)))
        .catch(this.handleError);
    }
    return Promise.resolve(this.rules.slice());  // Return a copy of the cached rules
  }

  getEntities(): Promise<string[]> {
    if (this.entities.length == 0) {   // Get a fresh copy of the rules
      // console.log("getEntities getting a fresh copy");
      // this.entitiesRequested = true;
      return this.http.get(`${this.ottoRestUrl}/entities`)
        .toPromise()
        .then(response => {
          this.entities = response.json().data as string[];
          return this.entities;
        })
        .catch(this.handleError);
    }
    // console.log("getEntities serving a cached copy");
    return Promise.resolve(this.entities.slice());  // Return a copy of the cached entities
  }

  getZones(): Promise<string[]> {
    if (this.entities.length == 0) {   // Get a fresh copy of the rules
      return this.getEntities()
        .then((entities) => entities.filter((entity) => entity.startsWith("zone.")));
    }
    return Promise.resolve(this.entities.filter((entity) => entity.startsWith("zone.")));
  }

  getServices(): Promise<ServiceDomain[]> {
    if (this.serviceDomains.length == 0) {
      return this.http.get(`${this.ottoRestUrl}/services`)
        .toPromise()
        .then(response => {
          this.serviceDomains = ServiceDomain.fromRestResponse(response.json().data);
          return this.serviceDomains;
        })
        .catch(this.handleError);
    }
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);   // for demo purposes only
    return Promise.reject(error.message || error);
  }


  // getHeroesSlowly(): Promise<Hero[]> {
  //   // Simulate server latency with 2 second delay
  //   return new Promise(resolve => { setTimeout(() => resolve(this.getHeroes()), 1000); } );
  // }

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

}



