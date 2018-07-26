import { Injectable } from '@angular/core';

@Injectable()
export class StateFlagsService {

    public needsSave: boolean = false;
    public needsServerReload: boolean = false;

}