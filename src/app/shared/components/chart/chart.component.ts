import { Component, Input } from '@angular/core';
import { ChartData, ChartDataset, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent {
  @Input() chartLabels!: string[];
  @Input() chartData!: ChartData<'doughnut'>;
  @Input() chartOptions!: ChartOptions<'doughnut'>;

  get datasets(): any {
    return this.chartData.datasets[0];
  }
}
