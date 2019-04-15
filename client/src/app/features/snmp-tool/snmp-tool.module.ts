import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NglModule } from 'ng-lightning';
import { ChartsModule } from 'ng2-charts';
import { ApiService } from './api.service';
import { SnmpToolComponent } from './snmp-tool.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SnmpService } from './shared/snmp.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { SnmpToolRoutingModule } from './snmp-tool-routing.module';
import { ApiErrorComponent } from '../api-error/api-error.component';
import { ApiErrorHandler } from '../api-error/ApiErrorHandler.service';
import { RequestInterceptor } from './../../shared/request-interceptor';
import { DeviceInfoComponent } from './device-info/device-info.component';
import { SnmpManagerComponent } from './snmp-manager/snmp-manager.component';
import { InterfaceComponent } from './interface/interface.component';
import { InterfaceUsageComponent } from './interface-usage/interface-usage.component';
@NgModule({
    exports: [
        ApiErrorComponent,
        SnmpToolComponent,
        SnmpManagerComponent,
        DeviceInfoComponent,
        InterfaceComponent,
        InterfaceUsageComponent
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
        ChartsModule,
        NglModule,
        NgSelectModule
    ],
    declarations: [
        ApiErrorComponent,
        SnmpToolComponent,
        SnmpManagerComponent,
        DeviceInfoComponent,
        InterfaceComponent,
        InterfaceUsageComponent
    ],
})

export class SnmpToolModule { }
