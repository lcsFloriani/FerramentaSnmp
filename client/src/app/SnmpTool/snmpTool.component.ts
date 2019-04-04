import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
    templateUrl: './snmpTool.component.html',
})

export class SnmpToolComponent {
    public form: FormGroup = this.fb.group({
        ip: ['', Validators.required],
        port: ['161', Validators.required],
        community: ['public', Validators.required],
        timeout: ['', Validators.required],
        retries: ['', Validators.required],
        snmpVersion: ['', Validators.required],
    });

    constructor(private fb: FormBuilder) { }
}
