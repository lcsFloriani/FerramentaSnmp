import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SnmpManagerComponent } from './SnmpManager/snmpManager.component';
import { SnmpService } from './shared/snmp.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { InterfaceDetailsComponent } from './InterfaceDetails/interface-details.component';
import { InterfaceUsageComponent } from './InterfaceDetails/InterfaceUsage/interface-usage.component';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';
import { NglModule } from 'ng-lightning';
@NgModule({
    exports: [
        SnmpManagerComponent,
        InterfaceDetailsComponent,
        InterfaceUsageComponent
    ],
    providers: [
        SnmpService,
    ],
    imports: [
        SharedModule,
        ReactiveFormsModule,
        FormsModule,
        NgSelectModule,
        ChartsModule,
        NglModule
    ],
    declarations: [
        SnmpManagerComponent,
        InterfaceDetailsComponent,
        InterfaceUsageComponent
    ],
})

export class SnmpToolModule { }
