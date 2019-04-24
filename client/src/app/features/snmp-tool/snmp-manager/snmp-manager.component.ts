import { Component, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { SnmpService } from '../shared/snmp.service';
import { ToastrService } from 'ngx-toastr';
import { NumberValidator } from 'src/app/shared/validators/number.validator';
import { Interface, SnmpManagerCommand, Equipment } from '../shared/equipment.model';

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
    public monitoring = false;
    public interval: number;
    public interfaceForm: FormGroup = this.fb.group({
        interval: ['', [Validators.required, NumberValidator.isNumber, Validators.min(5)]],
    });

    public active = null;

    openDevice = true;
    collapsableDevice = true;

    openInterface = true;
    collapsableInterface = true;

    openInterfaceDetails = true;
    collapsableInterfaceDetails = true;

    constructor(public snmpService: SnmpService, public toast: ToastrService, private fb: FormBuilder) { }

    public getData(): void {
        this.interface = null;
        const snmpManager: SnmpManagerCommand = new SnmpManagerCommand(this.formModel.value);
        this.snmpService.get(snmpManager)
            .take(1)
            .subscribe(data => { this.updateEquips(data); },
                error => { this.apiReturnedError(error); });
        this.snmpManager = snmpManager;
    }

    public changeDevice() {
        this.collapsableDevice = !this.collapsableDevice;
    }

    public changeInterface() {
        this.collapsableInterface = !this.collapsableInterface;
    }

    public changeInterfaceDetails() {
        this.collapsableInterfaceDetails = !this.collapsableInterfaceDetails;
    }

    public changeMonitoring(): void {
        if (!this.monitoring) {
            this.monitoring = true;
            this.interval = this.interfaceForm.get('interval').value;
        } else {
            this.monitoring = false;
        }
    }

    public updateSelectedInterface(data: Interface): void {
        this.interface = data;
        console.log('interface => ' + this.interface);
        console.log('data => ' + data);
    }

    private updateEquips(equipment: Equipment) {
        this.toast.success('A ferramenta conseguiu capturar as informações', 'Sucesso!', {
            positionClass: 'toast-top-right',
            enableHtml: true
        });
        this.equipment = equipment;
        this.data = equipment.networkInterfaces;
    }
    private apiReturnedError(error: any): void {
        this.toast.error(error.error.errorMessage, 'Erro', {
            positionClass: 'toast-top-right',
            enableHtml: true
        });
        this.equipment = null;
    }
}
