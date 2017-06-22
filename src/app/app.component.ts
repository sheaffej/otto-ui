import { Component } from '@angular/core';
import { OttoRestService } from './services/otto-rest.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Otto UI';

    constructor(
        private ottoService: OttoRestService,
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

    ngOnInit() {}

} // class AppComponent
