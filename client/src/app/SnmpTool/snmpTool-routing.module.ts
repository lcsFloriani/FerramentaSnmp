import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SnmpToolComponent } from './snmpTool.component';

const snmpRoutes: Routes = [
    {
        path: '',
        component: SnmpToolComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(snmpRoutes)],
    exports: [RouterModule],
    declarations: [],
    providers: [],
})

export class SnmpToolRoutingModule {

}
