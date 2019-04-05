import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SnmpManagerComponent } from './SnmpManager/snmpManager.component';
import { SnmpToolRoutingModule } from './snmpTool-routing.module';
import { SnmpToolComponent } from './snmpTool.component';
import { SnmpService } from './shared/snmp.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { InterfaceDetailsComponent } from './InterfaceDetails/interface-details.component';
import { InterfaceUsageComponent } from './InterfaceDetails/InterfaceUsage/interface-usage.component';
import { ChartsModule } from 'ng2-charts';
@NgModule({
    exports: [
        SnmpManagerComponent,
        SnmpToolComponent,
        InterfaceDetailsComponent,
        InterfaceUsageComponent
    ],
    providers: [ SnmpService ],
    imports: [
        CommonModule,
        SnmpToolRoutingModule,
        ReactiveFormsModule, 
        FormsModule,
        NgSelectModule,
        ChartsModule
    ],
    declarations: [ 
        SnmpManagerComponent,
        SnmpToolComponent,
        InterfaceDetailsComponent,
        InterfaceUsageComponent
    ],
})

export class SnmpToolModule { }
