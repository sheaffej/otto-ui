import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import {
  DropdownModule, InputTextModule, SpinnerModule,
  ButtonModule, SelectButtonModule, InputMaskModule,
  CheckboxModule, PanelModule, DialogModule,
  GrowlModule, MessagesModule, InputTextareaModule,
  ConfirmDialogModule,
} from 'primeng/primeng';
// Because primeng has - in component names (like p-messages)
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { PrettyJsonModule } from 'angular2-prettyjson';

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
import { StateFlagsService } from './services/state-flags.service';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
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
    GrowlModule,
    MessagesModule,
    InputTextareaModule,
    ConfirmDialogModule,
  ],
  declarations: [
    RulesListComponent,
    RuleAutomationComponent,
    RuleTriggerComponent,
    RuleConditionComponent,
    RuleActionComponent,
    RuleActionSeqComponent,
    RuleDetailComponent,
    ServiceInfoComponent,
    DataFieldsComponent,
  ],
  exports: [
    RulesListComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class RuleManagerModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RuleManagerModule,
      providers: [OttoRestService, StateFlagsService]
    }
  }
}
