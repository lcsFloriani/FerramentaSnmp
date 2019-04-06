import { AbstractControl, ValidationErrors } from '@angular/forms';

export class IpValidator {

    public static ipV4(control: AbstractControl): ValidationErrors | null {
        if (!(control)) return null;
        const controlText: string = control.value;
        
        let regexIpV4= new RegExp('^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$');

        return (regexIpV4.test(controlText.toString())) ? null : { invalidIpV4: true };
    }
}