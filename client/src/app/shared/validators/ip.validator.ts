import { AbstractControl, ValidationErrors } from '@angular/forms';
import { v4 } from 'is-ip';
export class IpValidator {

    public static ipV4(control: AbstractControl): ValidationErrors | null {
        if (!(control)) return null;
        const controlText: string = control.value;

        return (v4(controlText.toString())) ? null : { invalidIpV4: true };
    }
}