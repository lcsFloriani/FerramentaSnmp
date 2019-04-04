export class Equipment {
    description: string;
    contact: string;
    name: string;
    location: string;
    upTime: string;
    interfacesCount: number;
    networkInterfaces: Interface[] = [];
}

export class SnmpManager {
    ip: string;
    port: number;
    community: string;
    timeout: number;
    retries: number;
    snmpVersion: SnmpVersionEnum;
}

export class Interface {
    index: string;
    description: string;
    type: string;
    speed: number;
    mac: string;
    adminStatus: string;
    operationalStatus: string;
}

export class InterfaceDetail {
    utilizationRate: number;
    DateTime: Date;
}

export class SnmpManagerCommand {
    ip: string;
    port: number;
    community: string;
    timeout: number;
    retries: number;
    snmpVersion: SnmpVersionEnum;
    constructor(snmpManager: SnmpManager) {
        this.ip = snmpManager.ip;
        this.port = snmpManager.port;
        this.community = snmpManager.community;
        this.timeout = snmpManager.timeout;
        this.retries = snmpManager.retries;
        this.snmpVersion = snmpManager.snmpVersion;
    }
}
export enum SnmpVersionEnum {
    V1,
    V2,
    V3
}
