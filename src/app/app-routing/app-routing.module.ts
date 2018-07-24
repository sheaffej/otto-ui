import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RulesListComponent } from '../rule-manager/rules-list/rules-list.component';
import { RuleDetailComponent } from '../rule-manager/rule-detail/rule-detail.component';

const routes: Routes = [
  { path: 'rule-list', component: RulesListComponent },
  { path: 'rule/:id', component: RuleDetailComponent },
  { path: '', redirectTo: '/rule-list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
