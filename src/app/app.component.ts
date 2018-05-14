import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'primeng/primeng';
import { AutomationRule } from './objects/rule-automation';
import { GrowlService, MessageSeverity } from './services/growl.service';
import { OttoRestService } from './services/otto-rest.service';
import { StateFlagsService } from './services/state-flags.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent {
    
    private title = 'Otto UI';
    // private growlMessages: Message[];

    public growl: GrowlService;
    public stateFlags: StateFlagsService;

    constructor(
        private ottoService: OttoRestService,
        private router: Router,
        growl: GrowlService,
        stateFlags: StateFlagsService,
    ) {
        this.growl = growl;
        this.stateFlags = stateFlags
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
        // this.growlMessages = this.growl.messages;
    }

    onAddClick(): void {
        console.log("Add Rule Clicked");
        let newRule = new AutomationRule();
        this.ottoService.addRule(newRule);
        this.router.navigate([`/rule/${newRule.id}`]);
    }

    onReloadClick(): void {
        this.ottoService.serverReloadRules()
            .then(resp => {
                if (resp.success) {
                    this.growl.addSuccessMessage(true, resp.message, null);
                    this.stateFlags.needsServerReload = false;
                }
                else {
                    this.growl.addPersistentMessage(MessageSeverity.ERROR, resp.message, null);
                }
            });
    }

} // class AppComponent
