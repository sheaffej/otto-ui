import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DropdownModule, InputTextModule, SpinnerModule, 
  ButtonModule, SelectButtonModule, InputMaskModule } from 'primeng/primeng';

import { AppComponent }  from './app.component';
import { RulesListComponent } from './views/rules-list.component'
import { RuleConditionComponent } from './views/rule-condition.component';
import { RuleTriggerComponent } from './views/rule-trigger.component';

import { OttoRestService } from './services/otto-rest.service'

@NgModule({
  imports:      [ 
    BrowserModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
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
    RuleConditionComponent,
    RuleTriggerComponent,
    RuleConditionComponent,
  ],
  providers: [ OttoRestService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
