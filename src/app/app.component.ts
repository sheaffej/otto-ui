import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'primeng/primeng';

import { AutomationRule } from './rule-manager/objects/rule-automation';
import { GrowlService, MessageSeverity } from './services/growl.service';
import { OttoRestService } from './rule-manager/services/otto-rest.service';
import { StateFlagsService } from './rule-manager/services/state-flags.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent {

    public growl: GrowlService;
    public stateFlags: StateFlagsService;

    private title = 'Otto UI';

    constructor(
        private ottoService: OttoRestService,
        private router: Router,
        growl: GrowlService,
        stateFlags: StateFlagsService,
    ) {
        this.growl = growl;
        this.stateFlags = stateFlags;

        // ottoService.getEntitiesObservable().subscribe(
        //     entities => {
        //         console.log('Entities cache populated');
        //         ottoService.getServicesObservable().subscribe(
        //             services => {
        //                 console.log('Services cache populated');
        //                 ottoService.getRulesObservable().subscribe(
        //                     rules => console.log('Rules caches have populated')
        //                 )
        //             }
        //         );
        //     }
        // );

    }  // constructor

    ngOnInit() {
        this.ottoService.getEntitiesObservable().subscribe(
            entities => {
                console.log('Entities cache populated');
                this.ottoService.getServicesObservable().subscribe(
                    services => {
                        console.log('Services cache populated');
                        this.ottoService.getRulesObservable().subscribe(
                            rules => console.log('Rules caches have populated')
                        )
                    }
                );
            }
        );
    }

    onAddClick(): void {
        console.log('Add Rule Clicked');
        const newRule = new AutomationRule();
        this.ottoService.addRule(newRule);
        this.router.navigate([`/rule/${newRule.id}`]);
    }

    onReloadClick(): void {
        this.ottoService.serverReloadRulesObservable()
            .subscribe(
                resp => {
                    if (resp.success) {
                        this.growl.addSuccessMessage(true, resp.message, null);
                        this.stateFlags.needsServerReload = false;
                    } else {
                        this.growl.addPersistentMessage(MessageSeverity.ERROR, resp.message, null);
                    }
                }
            );
    }

}
