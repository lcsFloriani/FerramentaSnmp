import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Equipment, Interface, SnmpManagerCommand } from 'src/app/SnmpTool/shared/equipment.model';
import { SnmpService } from '../shared/snmp.service';

@Component({
    selector: 'app-snmpmanager',
    templateUrl: './snmp-manager.component.html'
})
export class SnmpManagerComponent {
    @Input() public formModel: FormGroup;

    public data: any;
    public equipment: Equipment;
    public interface: Interface;
    public snmpManager: SnmpManagerCommand;

    open = true;
    collapsable = true;
    
    constructor(public snmpService: SnmpService) { }

    public GetData(): void {
        const snmpManager: SnmpManagerCommand = new SnmpManagerCommand(this.formModel.value);
        this.snmpService.get(snmpManager)
            .take(1)
            .subscribe((eq: Equipment) => this.updateEquips(eq));
        this.snmpManager = snmpManager;
    }

    change() {
        this.collapsable = !this.collapsable;
    }
    public updateSelectedInterface(data: Interface): void {
        this.interface = data;
    }
    private updateEquips(equipment: Equipment) {
        this.equipment = equipment;
        this.data = equipment.networkInterfaces;
    }
}
