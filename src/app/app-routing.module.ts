import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {RulesListComponent} from './views/rules-list.component';
import {RuleDetailComponent} from './views/rule-detail.component';

const routes : Routes = [
  { path: 'rule-list', component: RulesListComponent },
  { path: 'rule/:id', component: RuleDetailComponent },
  // { path: '', redirectTo: '/rule-list', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}