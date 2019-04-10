import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs-compat/Observable';
import { ApiErrorHandler } from '../api-error/ApiErrorHandler.service';

@Injectable()

export class ApiService {
    private api = 'http://localhost:5674/';
    constructor(public httpClient: HttpClient, public apiErrorHandler: ApiErrorHandler) { }
    public get(): any {
        return this.httpClient.get(`${this.api}api/isAlive/`)
        .catch(err =>  {
            this.apiErrorHandler.handleError(err);
            return Observable.throwError('A ferramenta não conseguiu conexão com a api');
         });
    }
}
