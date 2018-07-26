import { Injectable } from '@angular/core';
import { Observable, Observer, from } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map, flatMap } from 'rxjs/operators';

import { OttoRestResponse } from "../../rule-manager/services/otto-rest.service";
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EngineLogService {

  // private logs: EngineLogEntry[] = [];
  private observable: Observable<EngineLogEntry>;
  private ottoRestUrl: string;

  constructor(private http: HttpClient) {
    const host = environment.ottoHost;
    const port = environment.ottoPort;
    this.ottoRestUrl = `http://${host}:${port}/rest`;

  }

  getLogsObservable(): Observable<EngineLogEntry> {
    console.log("getLogsObservable called");
    if (this.observable == null) {
    
      // Test Method 1
      // return RX.interval(1000).pipe(
      //   map(val => { return {'id': val, 'type': 'event', 'message': 'This is an event'} }),
      //   take(10)
      // );
    
      // Test Method 2
      // this.observable = from(this.testLogs);

      // Roll your own
      // this.observable = Observable.create(observer => {
      //   for (let index = 0; index < this.testLogs.length; index++) {
      //     observer.next(this.testLogs[index]);
      //   }     
      //   observer.complete();
      // })

      // Quick Test Method
      // this.observable = from(this._genTempLogs());

      // REST method
      this.observable = this.http.get<OttoRestResponse>(`${this.ottoRestUrl}/logs`)
      .pipe(
          map(resp => resp.data),
          // Now we have a single array of log JSONs
          map(data => data.map(logobj => new EngineLogEntry(logobj))),          
          flatMap(logs => from(logs)),
          // Now we have a single array of EnginLogEntries
          // This will get convereted into a series of emits on the Observable
      );
    }
    return this.observable;
  }

  _genTempLogs() {
    let logs = [];
    for (let index = 0; index < 10; index++) {
      logs.push(
        new EngineLogEntry(
          {ts: new Date(), type: "event", entry: {event_data: {}, event: "Otto-Engine event"}}
        ));
    }
    logs.push(
      new EngineLogEntry(
        {ts: "2018-07-01 09:30:15-07:00", type: "debug", entry: {message: "hello"}}
      ));
    return logs;
  }

}

// export interface EngineLogEntry {
//   ts: Date;
//   type: string;
//   entry: any;
// }

export class EngineLogEntry {

  private _ts: Date;
  private _type: string;
  private _entry: any;

  constructor(obj: any) {
      if (typeof obj.ts === "string"){
          this._ts = new Date(obj.ts);
      } else {
          this._ts = obj.ts;
      }

      this._type = obj.type;
      this._entry = obj.entry;
  }

  get ts(): Date { return this._ts }
  get type(): string { return this._type }
  get entry(): any { return this._entry }
  get entryJSON(): string { return JSON.stringify(this._entry) }
}
