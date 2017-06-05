import { Component, OnInit, Input } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import {PrettyJsonComponent} from 'angular2-prettyjson';

import { OttoRestService } from '../services/otto-rest.service';
import { ServiceDomain, ServiceInfo } from '../objects/services';

@Component({
    selector: 'service-info',
    templateUrl: './templates/service-info.component.html'
})
export class ServiceInfoComponent implements OnInit {
    @Input() domain: string;
    @Input() service: string;

    serviceInfo: ServiceInfo;
    debug: boolean = false;

    constructor(private ottService: OttoRestService) {}

    ngOnInit() {
        this.ottService.getServices().then(domains => this.populateServiceInfo(domains));        
    }



    populateServiceInfo(serviceDomains: ServiceDomain[]) {
        this.serviceInfo = 
            serviceDomains
            .filter(domain => domain.domain === this.domain)[0]  // Only the first
            .services.filter(service => service.service_name === this.service)[0]  // Only the first
    }

}  // class DataFieldsComponent