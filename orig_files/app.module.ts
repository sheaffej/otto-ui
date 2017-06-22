import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DropdownModule, InputTextModule, SpinnerModule, 
  ButtonModule, SelectButtonModule, InputMaskModule, 
  CheckboxModule, PanelModule, DialogModule, InputSwitchModule } from 'primeng/primeng';
import {PrettyJsonModule} from 'angular2-prettyjson';

import { AppConfig } from './app-config';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataFieldsComponent } from './views/data-fields.component';
import { RuleActionSeqComponent } from './views/rule-action-seq.component';
import { RuleActionComponent } from './views/rule-action.component';
import { AutomationRuleComponent } from './views/rule-automation.component';
import { RuleConditionComponent } from './views/rule-condition.component';
import { RuleDetailComponent } from './views/rule-detail.component';
import { RuleTriggerComponent } from './views/rule-trigger.component';
import { RulesListComponent } from './views/rules-list.component';
import { ServiceInfoComponent } from './views/service-info.component';
import { OttoRestService } from './services/otto-rest.service';

@NgModule({
  imports:      [ 
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
    AutomationRuleComponent,
    RuleConditionComponent,
    RuleTriggerComponent,
    RuleConditionComponent,
    RuleActionSeqComponent,
    RuleActionComponent,
    ServiceInfoComponent,
    RuleDetailComponent,
    DataFieldsComponent,
  ],
  providers: [ 
    OttoRestService,
    AppConfig,
    { 
      provide: APP_INITIALIZER, 
      useFactory: (config: AppConfig) => () => config.load(), 
      deps: [AppConfig], 
      multi: true
    },
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { 

  constructor() {
    console.log("Constructing app.module");
  }

}
