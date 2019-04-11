
import { Component, Output, EventEmitter, DoCheck } from '@angular/core';

import { Observable } from 'rxjs-compat';
import { ApiService } from './../snmp-tool/api.service';
import { ApiErrorHandler } from './ApiErrorHandler.service';

@Component({
    selector: 'app-api-error',
    templateUrl: './api-error.component.html'
})
export class ApiErrorComponent {
    public error: string;
    public haveError: boolean;

    @Output() public errorResponse: EventEmitter<string> = new EventEmitter();

    constructor(public apiService: ApiService, public apiErrorHandler: ApiErrorHandler) {
        Observable.interval(5000)
            .takeWhile(() => true)
            .subscribe(() => {
                this.checkApi();
            });
    }
    private checkApi(): void {
        this.apiService
            .get()
            .take(1)
            .subscribe(
                data => { this.apiIsWorking(); },
                error => { this.apiIsDead();  }
            );
    }
    private apiIsWorking(): void {
        this.haveError = false;
        this.error = null;
        this.errorResponse.emit(null);
    }
    private apiIsDead(): void {
        this.haveError = true;
        this.error = this.apiErrorHandler.error;
        this.errorResponse.emit(this.apiErrorHandler.error);
    }
}

