import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import {PrettyJsonComponent} from 'angular2-prettyjson';

import { RuleActionItem, ServiceAction } from '../objects/rule-actions';
// import { RuleCondition, AndCondition } from '../objects/rule-conditions';
import { OttoRestService } from '../services/otto-rest.service';
import { ServiceDomain, ServiceInfo } from '../objects/services';

// @Component({
//     selector: 'service-info',
//     templateUrl: './templates/service-info.component.html'
// })

// export class ServiceInfoComponent implements OnInit, OnChanges {
