import { Component, Input } from '@angular/core';
import { Interface } from '../shared/equipment.model';

@Component({
    selector: 'interface-details',
    templateUrl: './interface-details.component.html'
})

export class InterfaceDetailsComponent { 
    @Input() public interface: Interface;
}