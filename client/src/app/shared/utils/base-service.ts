import { Observable } from 'rxjs-compat/Observable';

import { HttpClient } from '@angular/common/http';

export class BaseService {
    constructor(protected http: HttpClient) {
        //
    }
    public getWithBody(url: string, body: any): Observable<any> {
        return this.http.request('get', url, { body }).map((response: boolean) => response);
    }
    public deleteRequestWithBody(url: string, body: any): Observable<boolean> {
         return this.http.request('delete', url, { body }).map((response: boolean) => response);
    }
}
