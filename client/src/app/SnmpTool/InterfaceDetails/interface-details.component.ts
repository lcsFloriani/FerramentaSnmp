import { Component, Input } from '@angular/core';
import { Interface, SnmpManagerCommand } from '../shared/equipment.model';

@Component({
    selector: 'interface-details',
    templateUrl: './interface-details.component.html'
})

export class InterfaceDetailsComponent { 
    @Input() public interface: Interface;
    @Input() public snmpManager: SnmpManagerCommand;
}