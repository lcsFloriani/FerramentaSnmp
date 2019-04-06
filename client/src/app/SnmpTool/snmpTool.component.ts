import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NumberValidator } from '../shared/validators/number.validator';
import { IpValidator } from '../shared/validators/ip.validator';

@Component({
    templateUrl: './snmpTool.component.html',
})

export class SnmpToolComponent {
    public form: FormGroup = this.fb.group({
        ip: ['', [Validators.required, IpValidator.ipV4]],
        port: ['', [Validators.required, NumberValidator.isNumber]],
        community: ['public', Validators.required],
        timeout: ['', [Validators.required, NumberValidator.isNumber, Validators.min(1)]],
        retries: ['', [Validators.required, NumberValidator.isNumber, Validators.min(1)]],
        interval: ['', [Validators.required, NumberValidator.isNumber, Validators.min(10)]],
        snmpVersion: ['', Validators.required],
    });

    constructor(private fb: FormBuilder) { 
    }
}
