import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RulesListComponent } from '../rule-manager/rules-list/rules-list.component';
import { RuleDetailComponent } from '../rule-manager/rule-detail/rule-detail.component';
import { EngineLogListComponent } from '../engine-log/engine-log-list/engine-log-list.component';

const routes: Routes = [
  { path: 'rule-list', component: RulesListComponent },
  { path: 'rule/:id', component: RuleDetailComponent },
  { path: 'log', component: EngineLogListComponent},
  { path: '', redirectTo: '/rule-list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
