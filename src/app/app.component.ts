import { Component, OnInit } from '@angular/core';
import { OttoRestService } from './services/otto-rest.service';

@Component({
  selector: 'my-app',
  template: `
  <div class="text-center">
    <h1 class="title">{{title}}</h1>
  </div>
  <div *ngIf="show">
    <rules-list></rules-list>
  </div>
  `,
})
export class AppComponent implements OnInit { 
  title = 'Ottomation UI'; 
  show: boolean = true;
  // showDelay: number = 1000;

  constructor(private ottoService: OttoRestService) {
    // this.show = false;
    this.ottoService.getServices();
    this.ottoService.getEntities();
    this.ottoService.getRules();
    // setTimeout(() => this.show = true, this.showDelay);
  }

  ngOnInit() {
    // Populate the OttoRestService caches
    // this.ottoService.getServices();
    // this.ottoService.getEntities();
    // this.ottoService.getRules();

    // Trigger showing of views after OttoRestService has cached

  }

} // class AppComponent
