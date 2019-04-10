import { Component, Input } from '@angular/core';
import { Equipment } from '../shared/equipment.model';

@Component({
    selector: 'app-device-info',
    templateUrl: './device-info.component.html'
})

export class DeviceInfoComponent {
    @Input() public equipment: Equipment;
}
