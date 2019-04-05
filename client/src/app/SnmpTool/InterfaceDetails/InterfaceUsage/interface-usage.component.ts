import { Component, OnInit, Input } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Interface, SnmpManagerCommand, InterfaceDetail } from '../../shared/equipment.model';
import { Observable } from 'rxjs-compat';
import { SnmpService } from '../../shared/snmp.service';

@Component({
    selector: 'interface-usage',
    templateUrl: './interface-usage.component.html'
})

export class InterfaceUsageComponent implements OnInit {
    @Input() public interface: Interface;
    @Input() public snmpManager: SnmpManagerCommand;
    constructor(public snmpService: SnmpService) { }
    public ngOnInit() {
        Observable.interval(1000)
            .takeWhile(() => true)
            .subscribe(() => this.updateChart());
    }
    public chartData: ChartDataSets[] = [
        { data: [], label: 'uso em %' },
    ];
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

    updateChart(): void {
        console.log(this.interface);
        let interfaceDetails: InterfaceDetail;
        this.chartData.forEach((x, i) => {
            this.snmpService
                .getInterfaceDetails(this.snmpManager, parseInt(this.interface.index))
                .take(1)
                .subscribe((a: InterfaceDetail) => interfaceDetails = a);
                const data: number[] = x.data as number[];
                data.push(parseFloat(interfaceDetails.utilizationRate.toFixed(2)));
        });
        this.chartLabels.push(`label ${interfaceDetails.DateTime}`)
    }
}