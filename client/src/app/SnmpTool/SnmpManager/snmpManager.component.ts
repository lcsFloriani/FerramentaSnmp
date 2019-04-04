import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-snmpmanager',
    templateUrl: './snmpManager.component.html',
})

export class SnmpManagerComponent {
    @Input() public formModel: FormGroup;


}
