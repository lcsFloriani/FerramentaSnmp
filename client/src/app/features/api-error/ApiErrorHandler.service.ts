import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})

export class ApiErrorHandler {
    public error: any;
    public handleError(err: any) {
        this.error = err.message;
        console.log('handle param: ' +  err.message);
        console.log('handle param w/o message: ' +  err);
    }
}
