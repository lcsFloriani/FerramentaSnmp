import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SnmpManagerComponent } from './SnmpManager/snmpManager.component';
import { SnmpToolRoutingModule } from './snmpTool-routing.module';
import { SnmpToolComponent } from './snmpTool.component';
import { SnmpService } from './shared/snmp.service';
import { NgSelectModule } from '@ng-select/ng-select';
@NgModule({
    exports: [ SnmpManagerComponent, SnmpToolComponent ],
    providers: [ SnmpService ],
    imports: [ CommonModule, SnmpToolRoutingModule, ReactiveFormsModule, FormsModule, NgSelectModule ],
    declarations: [ SnmpManagerComponent, SnmpToolComponent ],
})

export class SnmpToolModule { }
