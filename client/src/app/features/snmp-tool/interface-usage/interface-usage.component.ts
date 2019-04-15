import { Component, OnDestroy, AfterContentInit, Input } from '@angular/core';

import { SnmpManagerCommand, Interface, InterfaceDetail } from '../shared/equipment.model';
import { Observable, Subject } from 'rxjs-compat';
import { SnmpService } from '../shared/snmp.service';
import { Color, Label } from 'ng2-charts';
import { ChartOptions, ChartDataSets } from 'chart.js';

@Component({
    selector: 'app-interface-usage',
    templateUrl: './interface-usage.component.html'
})

export class InterfaceUsageComponent implements AfterContentInit, OnDestroy {
    @Input() public snmpManager: SnmpManagerCommand;
    @Input() public interface: Interface;
    @Input() public monitoring: boolean;
    @Input() public interval: number;
    public currentDetails: InterfaceDetail;

    public chartData: ChartDataSets[];
    public chartLabels: Label[] = [];
    public chartOptions: (ChartOptions) = {
        responsive: true,
    };
    public chartColors: Color[] = [
        {
            borderColor: 'grey',
            backgroundColor: 'rgba(255,0,0,0.3)',
        },
    ];
    public chartLegend = true;
    public chartType = 'line';
    public chartPlugins = [];

    private ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(public snmpService: SnmpService) { }
    public ngAfterContentInit() {
        this.chartData = [
            { data: [0], label: this.interface.description },
        ];

        this.currentDetails = new InterfaceDetail();
        this.currentDetails.dateTime = new Date();
        this.currentDetails.utilizationRate = 0;
        this.currentDetails.discardIn = 0;
        this.currentDetails.discardOut = 0;
        this.currentDetails.errorIn = 0;
        this.currentDetails.errorOut = 0;

        this.chartLabels.push(this.currentDetails.dateTime.toLocaleString());

        Observable.interval(this.interval * 1000)
            .takeWhile(() => true)
            .subscribe(() => this.updateChart());
    }
    public ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
    updateChart(): void {
        this.chartData.forEach((x, i) => {
            this.snmpService
                // tslint:disable-next-line: radix
                .getInterfaceDetails(this.snmpManager, parseInt(this.interface.index))
                .take(1)
                .subscribe((result: InterfaceDetail) => {
                    this.currentDetails = Object.assign(new InterfaceDetail(), result);
                });

            const data: number[] = x.data as number[];

            this.chartLabels.push(`${this.currentDetails.dateTime.toLocaleString()}`);
            data.push(parseFloat(this.currentDetails.utilizationRate.toFixed(2)));
        });
    }
}
