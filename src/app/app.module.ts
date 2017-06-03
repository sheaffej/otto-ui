import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DropdownModule, InputTextModule, SpinnerModule, 
  ButtonModule, SelectButtonModule, InputMaskModule } from 'primeng/primeng';
import {PrettyJsonModule} from 'angular2-prettyjson';

import { AppComponent }  from './app.component';
import { RulesListComponent } from './views/rules-list.component'
import { AutomationRuleComponent } from './views/rule-automation.component';
import { RuleConditionComponent } from './views/rule-condition.component';
import { RuleTriggerComponent } from './views/rule-trigger.component';
import { RuleActionSeqComponent } from './views/rule-action-seq.component';
import { RuleAction } from './views/rule-action.component';
import { OttoRestService } from './services/otto-rest.service'

@NgModule({
  imports:      [ 
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
  ],
  declarations: [ 
    AppComponent,
    RulesListComponent,
    AutomationRuleComponent,
    RuleConditionComponent,
    RuleTriggerComponent,
    RuleConditionComponent,
    RuleActionSeqComponent,
    RuleAction,
  ],
  providers: [ OttoRestService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
