
import { Component } from '@angular/core';

import { Observable } from 'rxjs-compat';
import { ApiService } from './../snmp-tool/api.service';
import { ApiErrorHandler } from './ApiErrorHandler.service';

@Component({
    selector: 'app-api-error',
    templateUrl: './api-error.component.html'
})
export class ApiErrorComponent {
    public error: any;


    constructor(public apiService: ApiService, public apiErrorHandler: ApiErrorHandler) {
        Observable.interval(5000)
            .takeWhile(() => true)
            .subscribe(() => this.checkApi());
    }
    showTopAlert = false;

    onClose(reason: string) {
        console.log(`Closed by ${reason}`);
    }
    private checkApi(): void {
        this.apiService
            .get()
            .take(1)
            .subscribe(() => {
                this.error = this.apiErrorHandler.error;
                this.showTopAlert = true;
            });
    }
}

