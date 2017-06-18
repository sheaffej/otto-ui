import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { AutomationRule } from '../objects/rule-automation';
import { OttoRestService } from '../services/otto-rest.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: "rule-detail",
  templateUrl: "./templates/rule-detail.component.html",
})
export class RuleDetailComponent implements OnInit {

  rule: AutomationRule;

  constructor(
    private ottoService: OttoRestService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.ottoService.getRule(params['id']))
      .subscribe(rule => this.rule = rule);
      console.log(JSON.stringify(this.rule));
  }

  onGoBackClick(): void {
    this.location.back();
  }

}  // class RuleDetailComponent