import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse,
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { ApiErrorHandler } from '../features/api-error/ApiErrorHandler.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    constructor(public apiErrorHandler: ApiErrorHandler) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(request).do((event: HttpEvent<any>) => { }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
                this.apiErrorHandler.handleError(err);
            }
        });
    }
}
