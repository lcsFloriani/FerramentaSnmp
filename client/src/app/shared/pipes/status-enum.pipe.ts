import { statusEnum } from './../../features/snmp-tool/shared/equipment.model';
import { Pipe, PipeTransform } from '@angular/core';

import { EnumValues } from 'enum-values';

@Pipe({ name: 'statusEnum' })
/* tslint:disable */
export class StatusEnumPipe implements PipeTransform {
    public transform(value: any): any {
        return EnumValues.getNameFromValue(statusEnum, value);
    }
}