import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ConfirmationService, GrowlModule } from 'primeng/primeng';
// Because primeng has - in component names (like p-messages)
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { PrettyJsonModule } from 'angular2-prettyjson';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { EngineLogModule } from './engine-log/engine-log.module';
import { RuleManagerModule } from './rule-manager/rule-manager.module';

import { AppComponent } from './app.component';

import { GrowlService } from './services/growl.service';
import { OttoRestService } from './services/otto-rest.service';
import { StateFlagsService } from './services/state-flags.service';

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        EngineLogModule,
        RuleManagerModule,
        PrettyJsonModule,
        GrowlModule,
    ],
    declarations: [
        AppComponent,
    ],
    providers: [
        GrowlService,
        OttoRestService,
        StateFlagsService,
        ConfirmationService,
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    bootstrap: [AppComponent]
})
export class AppModule { }
