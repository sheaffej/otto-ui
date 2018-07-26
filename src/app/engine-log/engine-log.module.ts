import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EngineLogListComponent } from './engine-log-list/engine-log-list.component';
import { EngineLogService } from './services/engine-log.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [EngineLogListComponent]
})
export class EngineLogModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: EngineLogModule,
      providers: [EngineLogService]
    }
  }

}
