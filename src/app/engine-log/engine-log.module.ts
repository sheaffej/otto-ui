import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PrettyJsonModule } from 'angular2-prettyjson';

import { EngineLogListComponent } from './engine-log-list/engine-log-list.component';
import { EngineLogService } from './services/engine-log.service';
import { LogRuleIDFilterPipe } from './log-rule-id-filter.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PrettyJsonModule,
  ],
  declarations: [EngineLogListComponent, LogRuleIDFilterPipe]
})
export class EngineLogModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: EngineLogModule,
      providers: [EngineLogService]
    }
  }

}
