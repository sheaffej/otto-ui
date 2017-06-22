import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
    DropdownModule, InputTextModule, SpinnerModule,
    ButtonModule, SelectButtonModule, InputMaskModule,
    CheckboxModule, PanelModule, DialogModule, InputSwitchModule
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
import { OttoRestService } from './services/otto-rest.service';

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
        InputSwitchModule,
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
        OttoRestService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
