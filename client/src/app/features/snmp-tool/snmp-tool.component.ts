import { Component, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { IpValidator } from 'src/app/shared/validators/ip.validator';
import { NumberValidator } from 'src/app/shared/validators/number.validator';

@Component({
    templateUrl: './snmp-tool.component.html',
})

export class SnmpToolComponent {

    public form: FormGroup = this.fb.group({
        ip: ['', [Validators.required, IpValidator.ipV4]],
        port: ['', [Validators.required, NumberValidator.isNumber, Validators.min(1)]],
        community: ['', Validators.required],
        timeout: ['', [Validators.required, NumberValidator.isNumber, Validators.min(1)]],
        retries: ['', [Validators.required, NumberValidator.isNumber, Validators.min(1)]],
        interval: ['', [Validators.required, NumberValidator.isNumber, Validators.min(10)]],
        snmpVersion: ['', Validators.required],
    });

    constructor(private fb: FormBuilder) { }
}
