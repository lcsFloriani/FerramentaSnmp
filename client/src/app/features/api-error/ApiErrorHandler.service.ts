import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})

export class ApiErrorHandler {
    public error: any;
    public handleError(err: any) {
        this.error = err;
    }
}
