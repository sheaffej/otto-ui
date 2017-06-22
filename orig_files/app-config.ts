import { Inject, Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';


@Injectable()
export class AppConfig {

    private configUrl: string = "config.json";
    private config: Object = null;
    private env: Object = null;


    constructor(private http: Http) {}

    public getConfig(key: any) {
        return this.config[key];
    }

    public getEnv(key: any) {
        return this.env[key];
    }

    /**
     * This method:
     *   a) Loads "env.json" to get the current working environment (e.g.: 'production', 'development')
     *   b) Loads "config.[env].json" to get all env's variables (e.g.: 'config.development.json')
     */
    public load() {
        return new Promise((resolve, reject) => {
            this.http.get(this.configUrl)
                .map(res => res.json())
                // .catch((error: any): any => {
                //     console.log('Configuration file "config.json" could not be read');
                //     resolve(true);
                //     return Observable.throw(error.json().error || 'Server error');
                // })
                // .catch((error: any): any => this.handleError(error))
                .subscribe((response) => {
                    // this.env = envResponse;
                    // let request: any = null;

                    // switch (envResponse.env) {
                    //     case 'production': {
                    //         request = this.http.get('config.' + envResponse.env + '.json');
                    //     } break;

                    //     case 'development': {
                    //         request = this.http.get('config.' + envResponse.env + '.json');
                    //     } break;

                    //     case 'default': {
                    //         console.error('Environment file is not set or invalid');
                    //         resolve(true);
                    //     } break;
                    // }

                    // if (request) {
                    //     request
                            // .map(res => res.json())
                            // .catch((error: any) => {
                            //     console.error('Error reading ' + envResponse.env + ' configuration file');
                            //     resolve(error);
                            //     return Observable.throw(error.json().error || 'Server error');
                            // })
                            // .subscribe((responseData) => {
                                this.config = response;
                                resolve(true);
                            // });
                    // } else {
                    //     console.error('Env config file "env.json" is not valid');
                    //     resolve(true);
                    // }
                });
        });
    }  // load()

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);   // for demo purposes only
    return Promise.reject(error.message || error);
  }

} // class AppConfig
