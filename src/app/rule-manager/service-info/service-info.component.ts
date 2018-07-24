import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import {PrettyJsonComponent} from 'angular2-prettyjson';

import { OttoRestService } from '../../services/otto-rest.service';
import { ServiceDomain, ServiceInfo } from '../objects/services';

@Component({
    selector: 'service-info',
    templateUrl: 'service-info.component.html'
})
export class ServiceInfoComponent implements OnInit {
    @Input() domain: string;
    @Input() service: string;

    serviceInfo: ServiceInfo;
    debug: boolean = false;

    constructor(private ottService: OttoRestService) {}

    ngOnInit() {
        this.ottService.getServicesObservable()
            .subscribe(domains => this.populateServiceInfo(domains.list));        
    }

// TODO we can't display the Service Info when services == null

    populateServiceInfo(serviceDomains: ServiceDomain[]) {
        if ((this.domain != null) && (this.service != null)) {
            
            const domain = serviceDomains.filter(domain => domain.domain === this.domain)[0]
            if (domain != null) {
                this.serviceInfo = domain.services
                    .filter(service => service.service_name === this.service)[0]
            } else {
                console.error(
                    `Domain (${this.domain}) not found in ServiceDomains received from Otto-Engine`);
            }        
        }
    }

}  // class DataFieldsComponent