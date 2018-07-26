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

  // private logsObservable: Observable<object>;

  constructor(private engineLogService: EngineLogService) { }

  ngOnInit() {
    this.engineLogService.getLogsObservable().subscribe(log => {
      this.logs.push(log);
      console.log(this.logs);
    });
  }



}
