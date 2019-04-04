import { SnmpManagerCommand, Equipment, Interface } from './../shared/equipment.model';
import { SnmpService } from './../shared/snmp.service';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-snmpmanager',
    templateUrl: './snmpManager.component.html',
})

export class SnmpManagerComponent {
    @Input() public formModel: FormGroup;
    public data: any;
    public equipment: Equipment;
    public interface: Interface;
    constructor(public snmpService: SnmpService) { }

    public GetData(): void {
        const snmpManager: SnmpManagerCommand = new SnmpManagerCommand(this.formModel.value);
        this.snmpService.get(snmpManager)
                .take(1)
                .subscribe((eq: Equipment) => this.updateEquips(eq));
    }
    public startInterfaceMonitor(): void {
        //
    }
    public updateSelectedInterface(data: Interface): void {
        this.interface = data;
    }
    private updateEquips(equipment: Equipment) {
        this.equipment = equipment;
        this.data = equipment.networkInterfaces;
    }
}
