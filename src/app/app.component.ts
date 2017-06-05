import { Component, OnInit } from '@angular/core';
import { OttoRestService } from './services/otto-rest.service';

@Component({
  selector: 'my-app',
  template: `
  <h1>{{title}}</h1>
  <rules-list></rules-list>
  `,
})
export class AppComponent implements OnInit { 
  title = 'Ottomation UI'; 

  constructor(private ottoService: OttoRestService) {}

  ngOnInit() {
    // Populate the OttoRestService caches
    this.ottoService.getServices();
    this.ottoService.getEntities();
    this.ottoService.getRules();
  }

} // class AppComponent
