import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'snmp',
    pathMatch: 'full',
  },
  {
    path: 'snmp',
    loadChildren: './SnmpTool/snmpTool.module#SnmpToolModule',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
