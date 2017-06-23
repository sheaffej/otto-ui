import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AutomationRule } from './objects/rule-automation';
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
        private router: Router
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

    onAddClick(): void {
        console.log("Add Rule Clicked");
        let newRule = new AutomationRule();
        this.ottoService.addRule(newRule);
        this.router.navigate([`/rule/${newRule.id}`]);
    }

} // class AppComponent
