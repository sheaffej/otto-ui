import { Component, OnInit } from '@angular/core';
// import { AppConfig } from './app-config';
import { OttoRestService } from './services/otto-rest.service';

@Component({
    selector: 'my-app',
    template: `
  <div class="text-center">
    <h1 class="title">{{title}}</h1>
  </div>
  <data-fields [obj]="dataObj"></data-fields>
  <router-outlet></router-outlet>
  `,
})
export class AppComponent implements OnInit {
    title = 'Ottomation UI';

    dataObj: Object;

    constructor(
        private ottoService: OttoRestService,
        // private config: AppConfig
    ) {
        console.log("Constructing app.component");

        console.log("Populating OttoRestService's cache");
        // ottoService.getRules().then(() => 
        ottoService.getEntities().then(() =>
            ottoService.getServices().then(() =>
                console.log("Caches have populated")
            )
        )
        // )
    }  // constructor

    ngOnInit() {
        this.dataObj = {
            "entity_id": "my.entity.id",
            "description": "This is a description",
            "max_value": 24
        };
    }

} // class AppComponent
