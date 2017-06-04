export class ServiceDomain {

  domain: string;
  services: Service[];

  constructor(domain: string) {
    this.domain = domain;
    this.services = [];
  }

  addService(service: Service): void {
    this.services.push(service);
  }

  static fromRestResponse(response: any): ServiceDomain[] {
    let domains: ServiceDomain[] = [];

    for (let domain of response) {
      let domain_name = domain.domain;
      let newDomain = new ServiceDomain(domain_name);

      for (let service_obj of domain.services) {

        let service = new Service(domain_name, service_obj.service, service_obj.description);
        for (let field of service_obj.fields) {
          service.fields.push(new ServiceField(field.name, field.description, field.example));
        }
        newDomain.addService(service);
      }
      domains.push(newDomain);
      // console.log(JSON.stringify(newDomain));
    }
    return domains;
  }

} // class ServiceDomain

export class Service {
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

} // class Service

export class ServiceField {
  name: string;
  description: string;
  example: string;

  constructor(name: string, description: string, example: string) {
    this.name = name;
    this.description = description;
    this.example = example;
  }

} // class ServiceField