"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var AppConfig = (function () {
    function AppConfig(http) {
        this.http = http;
        this.configUrl = "config.json";
        this.config = null;
        this.env = null;
    }
    AppConfig.prototype.getConfig = function (key) {
        return this.config[key];
    };
    AppConfig.prototype.getEnv = function (key) {
        return this.env[key];
    };
    /**
     * This method:
     *   a) Loads "env.json" to get the current working environment (e.g.: 'production', 'development')
     *   b) Loads "config.[env].json" to get all env's variables (e.g.: 'config.development.json')
     */
    AppConfig.prototype.load = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(_this.configUrl)
                .map(function (res) { return res.json(); })
                .subscribe(function (response) {
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
                _this.config = response;
                resolve(true);
                // });
                // } else {
                //     console.error('Env config file "env.json" is not valid');
                //     resolve(true);
                // }
            });
        });
    }; // load()
    AppConfig.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    return AppConfig;
}()); // class AppConfig
AppConfig = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], AppConfig);
exports.AppConfig = AppConfig;
//# sourceMappingURL=app-config.js.map