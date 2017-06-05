import { Component, OnInit } from '@angular/core';
import { OttoRestService } from './services/otto-rest.service';

@Component({
  selector: 'my-app',
  template: `
  <h1>{{title}}</h1>
  <div *ngIf="show">
    <rules-list></rules-list>
  </div>
  `,
})
export class AppComponent implements OnInit { 
  title = 'Ottomation UI'; 
  show: boolean = false;
  showDelay: number = 500;

  constructor(private ottoService: OttoRestService) {}

  ngOnInit() {
    // Populate the OttoRestService caches
    this.ottoService.getServices();
    this.ottoService.getEntities();
    this.ottoService.getRules();

    // Trigger showing of views after OttoRestService has cached
    setTimeout(() => this.show = true, this.showDelay);
  }

} // class AppComponent
