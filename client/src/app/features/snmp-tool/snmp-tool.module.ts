import { RequestInterceptor } from './../../shared/request-interceptor';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NglModule } from 'ng-lightning';
import { ChartsModule } from 'ng2-charts';
import { SnmpService } from './shared/snmp.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { SnmpToolComponent } from './snmp-tool.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SnmpToolRoutingModule } from './snmp-tool-routing.module';
import { DeviceInfoComponent } from './device-info/device-info.component';
import { SnmpManagerComponent } from './snmp-manager/snmp-manager.component';
import { ApiService } from './api.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiErrorComponent } from '../api-error/api-error.component';
import { ApiErrorHandler } from '../api-error/ApiErrorHandler.service';

@NgModule({
    exports: [
        ApiErrorComponent,
        SnmpToolComponent,
        SnmpManagerComponent,
        DeviceInfoComponent,
        // InterfaceDetailsComponent,
        // InterfaceUsageComponent
    ],
    providers: [
        ApiService,
        ApiErrorHandler,
        SnmpService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RequestInterceptor,
            multi: true
        }
    ],
    imports: [
        SharedModule,
        SnmpToolRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        NgSelectModule,
        ChartsModule,
        NglModule
    ],
    declarations: [
        ApiErrorComponent,
        SnmpToolComponent,
        SnmpManagerComponent,
        DeviceInfoComponent,
       // InterfaceDetailsComponent,
        // InterfaceUsageComponent
    ],
})

export class SnmpToolModule { }
