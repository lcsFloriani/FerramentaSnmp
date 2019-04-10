import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs-compat/Observable';

import { BaseService } from '../../../shared/utils/base-service';
import { SnmpManagerCommand, Equipment, InterfaceDetail } from './equipment.model';


@Injectable()

export class SnmpService extends BaseService {
    private api = 'http://localhost:5674/';
    constructor(public httpClient: HttpClient) {
        super(null);
    }
    public get(snmpManagerCommand: SnmpManagerCommand): Observable<Equipment> {
        return this.httpClient.post(`${this.api}api/equipment/`, snmpManagerCommand)
            .map((response: Equipment) => response);
    }
    public getInterfaceDetails(snmpManagerCommand: SnmpManagerCommand, interfaceId: number): Observable<InterfaceDetail> {
        return this.httpClient.post(`${this.api}api/equipment/${interfaceId}`, snmpManagerCommand)
            .map((response: InterfaceDetail) => response);
    }
}
