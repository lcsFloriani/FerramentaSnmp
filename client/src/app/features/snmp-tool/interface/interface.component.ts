import { Component, Input } from "@angular/core";

import { Interface } from '../shared/equipment.model';

@Component({
    selector: 'app-interface-details',
    templateUrl: './interface.component.html'
})

export class InterfaceComponent {
    @Input() public interface: Interface;
}
