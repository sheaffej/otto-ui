export class ServiceDomain {

  domain: string;
  services: ServiceInfo[];

  constructor(domain: string) {
    this.domain = domain;
    this.services = [];
  }

  static fromRestResponse(response: any): ServiceDomain[] {
    const domains: ServiceDomain[] = [];

    for (const domain of response) {
      // const domain_name = domain.domain;
      // const newDomain = new ServiceDomain(domain_name);

      // for (const service_obj of domain.services) {

      //   const service = new ServiceInfo(domain_name, service_obj.service, service_obj.description);
      //   for (const field of service_obj.fields) {
      //     service.fields.push(new ServiceField(field.name, field.description, field.example));
      //   }
      //   newDomain.addService(service);
      // }
      // domains.push(newDomain);
      domains.push(ServiceDomain.fromDict(domain))
      // console.log(JSON.stringify(newDomain));
    }
    return domains;
  }

  static fromDict(domain_obj: any): ServiceDomain {
    const domain_name = domain_obj.domain
    const newDomain = new ServiceDomain(domain_name);

    for (const service_obj of domain_obj.services) {

      const service = new ServiceInfo(domain_name, service_obj.service, service_obj.description);
      for (const field of service_obj.fields) {
        service.fields.push(new ServiceField(field.name, field.description, field.example));
      }
      newDomain.addService(service);
    }
    return newDomain;
  }

  addService(service: ServiceInfo): void {
    this.services.push(service);
  }
}

export class ServiceInfo {
  domain: string;
  service_name: string;
  description: string;
  fields: ServiceField[];

  constructor(domain: string, service_name: string, description: string) {
    this.domain = domain;
    this.service_name = service_name;
    this.description = description;
    this.fields = [];
  }

  addField(field: ServiceField) {
    this.fields.push(field);
  }

}

export class ServiceField {
  name: string;
  description: string;
  example: string;

  constructor(name: string, description: string, example: string) {
    this.name = name;
    this.description = description;
    this.example = example;
  }

}
