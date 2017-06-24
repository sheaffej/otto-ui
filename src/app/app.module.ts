import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
    DropdownModule, InputTextModule, SpinnerModule,
    ButtonModule, SelectButtonModule, InputMaskModule,
    CheckboxModule, PanelModule, DialogModule, //InputSwitchModule,
    GrowlModule, MessagesModule, InputTextareaModule
} from 'primeng/primeng';
import { PrettyJsonModule } from 'angular2-prettyjson';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataFieldsComponent } from './data-fields/data-fields.component';
import { RuleActionSeqComponent } from './rule-action-seq/rule-action-seq.component';
import { RuleActionComponent } from './rule-action/rule-action.component';
import { RuleAutomationComponent } from './rule-automation/rule-automation.component';
import { RuleConditionComponent } from './rule-condition/rule-condition.component';
import { RuleDetailComponent } from './rule-detail/rule-detail.component';
import { RuleTriggerComponent } from './rule-trigger/rule-trigger.component';
import { RulesListComponent } from './rules-list/rules-list.component';
import { ServiceInfoComponent } from './service-info/service-info.component';
import { GrowlService } from './services/growl.service';
import { OttoRestService } from './services/otto-rest.service';
import { StateFlagsService } from './services/state-flags.service';

@NgModule({
    imports: [
        AppRoutingModule,
        BrowserModule,
        HttpModule,
        FormsModule,
        BrowserAnimationsModule,
        PrettyJsonModule,
        DropdownModule,
        InputTextModule,
        SpinnerModule,
        ButtonModule,
        SelectButtonModule,
        InputMaskModule,
        CheckboxModule,
        PanelModule,
        DialogModule,
        // InputSwitchModule,
        GrowlModule,
        MessagesModule,
        InputTextareaModule,
    ],
    declarations: [
        AppComponent,
        RulesListComponent,
        RuleAutomationComponent,
        RuleTriggerComponent,
        RuleConditionComponent,
        RuleActionComponent,
        RuleActionSeqComponent,
        RuleDetailComponent,
        ServiceInfoComponent,
        DataFieldsComponent
    ],
    providers: [
        GrowlService,
        OttoRestService,
        StateFlagsService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
