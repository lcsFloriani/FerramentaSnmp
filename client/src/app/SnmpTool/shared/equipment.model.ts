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
    interval: number;
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
    dateTime: Date;
    errorIn: number;
    errorOut: number;
    discardIn: number;
    discardOut: number;

    constructor() {
        const aux = this.dateTime;
        this.dateTime = new Date(aux);
    }
}
export enum statusEnum {
    UP = '1',
    DOWN = '2',
    TESTING = '3'
}
export class SnmpManagerCommand {
    ip: string;
    port: number;
    community: string;
    timeout: number;
    retries: number;
    snmpVersion: SnmpVersionEnum;
    interval: number;
    constructor(snmpManager: SnmpManager) {
        this.ip = snmpManager.ip;
        this.port = snmpManager.port;
        this.community = snmpManager.community;
        this.timeout = snmpManager.timeout;
        this.retries = snmpManager.retries;
        this.snmpVersion = snmpManager.snmpVersion;
        this.interval = snmpManager.interval;
    }
}
export enum SnmpVersionEnum {
    V1 = 'V1',
    V2 = 'V2'
    // V3 = 'V3'
}
