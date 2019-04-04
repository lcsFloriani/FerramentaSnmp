import { NgModule } from '@angular/core';
import { SnmpManagerComponent } from './SnmpManager/snmpManager.component';
import { SnmpToolRoutingModule } from './snmpTool-routing.module';
import { SnmpToolComponent } from './snmpTool.component';

@NgModule({
    exports: [ SnmpManagerComponent, SnmpToolComponent ],
    providers: [],
    imports: [ SnmpToolRoutingModule ],
    declarations: [ SnmpManagerComponent, SnmpToolComponent ],
})

export class SnmpToolModule { }
