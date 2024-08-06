import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NgChartsModule } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import { ChartComponent } from './chart.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  const doughnutChartLabels: string[] = [
    'Contribuição mensal',
    'Contribuição voluntária'
  ];

  const doughnutChartData: ChartData<'doughnut'> = {
    labels: doughnutChartLabels,
    datasets: [
      {
        data: [499999.99, 499999.99],
        backgroundColor: ['#e91e63', '#5e35b1'],
      },
    ],
  };

  const doughnutChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ChartComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    component.chartLabels = doughnutChartLabels;
    component.chartData = doughnutChartData;
    component.chartOptions = doughnutChartOptions;
    fixture.detectChanges();
  });

  it('Deve criar', () => {
    expect(component).toBeTruthy();
  });
});
