import { Pipe, PipeTransform } from '@angular/core';
import { EnumValues } from 'enum-values';
import { statusEnum } from 'src/app/SnmpTool/shared/equipment.model';

@Pipe({ name: 'statusEnum' })
/* tslint:disable */
export class StatusEnumPipe implements PipeTransform {
    public transform(value: any): any {
        console.log(EnumValues.getNameFromValue(statusEnum, value));
        return EnumValues.getNameFromValue(statusEnum, value);
    }
}