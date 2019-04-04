import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SnmpManagerComponent } from './SnmpManager/snmpManager.component';
import { SnmpToolRoutingModule } from './snmpTool-routing.module';
import { SnmpToolComponent } from './snmpTool.component';
import { CommonModule } from '@angular/common';

@NgModule({
    exports: [ SnmpManagerComponent, SnmpToolComponent ],
    providers: [],
    imports: [ CommonModule, SnmpToolRoutingModule, ReactiveFormsModule, FormsModule ],
    declarations: [ SnmpManagerComponent, SnmpToolComponent ],
})

export class SnmpToolModule { }
