import { Component, OnInit } from '@angular/core';
import { OttoRestService } from './services/otto-rest.service';

@Component({
  selector: 'my-app',
  template: `
  <div class="text-center">
    <h1 class="title">{{title}}</h1>
  </div>
  <router-outlet></router-outlet>
  `,
})
export class AppComponent implements OnInit { 
  title = 'Ottomation UI'; 

  constructor(private ottoService: OttoRestService) {
    // Populate the OttoRestService caches
    this.ottoService.getServices();
    this.ottoService.getEntities();
    this.ottoService.getRules();
  }

  ngOnInit() {}

} // class AppComponent
