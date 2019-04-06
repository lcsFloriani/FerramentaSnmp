import { AbstractControl, ValidationErrors } from '@angular/forms';

export class NumberValidator {

    public static isNumber(control: AbstractControl): ValidationErrors | null {
        if (!(control)) return null;
        const controlText: string = control.value;
        
        const haveDot: boolean = controlText.indexOf('.') === -1 ? false : true;

        return (!isNaN(Number(controlText.toString()))) && !haveDot ? null : { invalidNumber: true };
    }
}