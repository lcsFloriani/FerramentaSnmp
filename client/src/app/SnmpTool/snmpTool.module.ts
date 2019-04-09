import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SnmpManagerComponent } from './SnmpManager/snmpManager.component';
import { SnmpToolRoutingModule } from './snmpTool-routing.module';
import { SnmpToolComponent } from './snmpTool.component';
import { SnmpService } from './shared/snmp.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { InterfaceDetailsComponent } from './InterfaceDetails/interface-details.component';
import { InterfaceUsageComponent } from './InterfaceDetails/InterfaceUsage/interface-usage.component';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';
import {NglModule, NGL_ICON_CONFIG, NglIconConfig} from 'ng-lightning';
@NgModule({
    exports: [
        SnmpManagerComponent,
        SnmpToolComponent,
        InterfaceDetailsComponent,
        InterfaceUsageComponent
    ],
    providers: [
        SnmpService,
        { provide: NGL_ICON_CONFIG, useValue: { svgPath: '/my/path' } as NglIconConfig },
    ],
    imports: [
        SharedModule,
        SnmpToolRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        NgSelectModule,
        ChartsModule,
        SharedModule,
        NglModule
    ],
    declarations: [
        SnmpManagerComponent,
        SnmpToolComponent,
        InterfaceDetailsComponent,
        InterfaceUsageComponent
    ],
})

export class SnmpToolModule { }
