import { Component, Input, AfterContentInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Interface, SnmpManagerCommand, InterfaceDetail } from '../../shared/equipment.model';
import { SnmpService } from '../../shared/snmp.service';
import { Observable } from 'rxjs-compat';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'interface-usage',
    templateUrl: './interface-usage.component.html'
})

export class InterfaceUsageComponent implements AfterContentInit {
    @Input() public interface: Interface;
    @Input() public snmpManager: SnmpManagerCommand;

    public currentDetails: InterfaceDetail;

    public chartData: ChartDataSets[];
    public chartLabels: Label[] = [];
    public chartOptions: (ChartOptions) = {
        responsive: true,
    };
    public chartColors: Color[] = [
        {
            borderColor: 'blue',
            backgroundColor: 'rgba(255,0,0,0.3)',
        },
    ];
    public chartLegend = true;
    public chartType = 'line';
    public chartPlugins = [];

    constructor(public snmpService: SnmpService) {

    }
    public ngAfterContentInit() {
        this.chartData = [
            { data: [ 0 ], label: this.interface.description },
        ];
        this.chartLabels.push(new Date().toLocaleString());

        this.currentDetails = new InterfaceDetail();
        this.currentDetails.dateTime = new Date();
        this.currentDetails.utilizationRate = 0;

        Observable.interval(this.snmpManager.interval * 1000)
            .takeWhile(() => true)
            .subscribe(() => this.updateChart());
    }
    updateChart(): void {
        this.chartData.forEach((x, i) => {
            this.snmpService
                // tslint:disable-next-line: radix
                .getInterfaceDetails(this.snmpManager, parseInt(this.interface.index))
                .take(1)
                .subscribe((result: InterfaceDetail) => {
                    this.currentDetails = Object.assign(new InterfaceDetail(), result);
                    this.chartLabels.push(`${new Date().toLocaleString()}`);
                });

            const data: number[] = x.data as number[];
            data.push(parseFloat(this.currentDetails.utilizationRate.toPrecision(2)) * 100);
        });
    }
}
