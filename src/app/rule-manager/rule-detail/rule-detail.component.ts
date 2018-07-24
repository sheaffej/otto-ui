import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
// import { Location } from '@angular/common';

import { AutomationRule } from '../objects/rule-automation';
import { OttoRestService } from '../../services/otto-rest.service';

import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'rule-detail',
  templateUrl: 'rule-detail.component.html',
})
export class RuleDetailComponent implements OnInit {

  rule: AutomationRule;

  constructor(
    private ottoService: OttoRestService,
    private route: ActivatedRoute,
    // private location: Location,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params: Params) => this.ottoService.getRuleObservable(params['id']))
      )
      .subscribe(rule => this.rule = rule);
  }

  onGoBackClick(): void {
    this.router.navigate(['/rule-list']);
  }

}
