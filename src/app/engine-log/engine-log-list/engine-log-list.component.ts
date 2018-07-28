import { Component, OnInit } from '@angular/core';

import { EngineLogService, EngineLogEntry } from '../services/engine-log.service';
import { Observable } from 'rxjs';


@Component({
    selector: 'app-engine-log-list',
    templateUrl: './engine-log-list.component.html',
    styleUrls: ['./engine-log-list.component.css']
})
export class EngineLogListComponent implements OnInit {

    public logs: EngineLogEntry[] = [];
    public searchString: string = null;

    private logsObservable: Observable<EngineLogEntry>;

    constructor(private engineLogService: EngineLogService) { }

    ngOnInit() {
        this.loadLogs();
    }

    loadLogs() {
        this.logsObservable = this.engineLogService.getLogsObservable();
        this.logsObservable.subscribe(log => {
            this.logs.push(log);
            console.log(this.logs);
        });
    }

    formatType(typestr: string): string {
        return typestr.replace(/_/g, ' ')
            .replace(/\w\S*/g, function(txt){
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
    }

}
