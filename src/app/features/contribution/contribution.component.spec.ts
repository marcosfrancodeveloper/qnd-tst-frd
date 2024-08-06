import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { ContributionComponent } from './contribution.component';

describe('ContributionComponent', () => {
  let component: ContributionComponent;
  let fixture: ComponentFixture<ContributionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ContributionComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve criar', () => {
    expect(component).toBeTruthy();
  });

  it('Deve ter rótulos de gráfico de donuts corretos', () => {
    expect(component.doughnutChartLabels).toEqual([
      'Contribuição mensal',
      'Contribuição voluntária',
    ]);
  });

  it('Deve ter dados corretos do gráfico de donut', () => {
    expect(component.doughnutChartData).toEqual({
      labels: component.doughnutChartLabels,
      datasets: [
        {
          data: [499999.99, 499999.99],
          backgroundColor: ['#e91e63', '#5e35b1'],
        },
      ],
    });
  });

  it('Deve ter opções corretas de gráfico de donut', () => {
    expect(component.doughnutChartOptions).toEqual({
      responsive: true,
      maintainAspectRatio: false,
      cutout: '70%',
      plugins: {
        legend: {
          display: false,
        },
      },
    });
  });

  it('Deve ter dados de cartões corretos', () => {
    expect(component.cards).toEqual([
      {
        icon: 'attach_money',
        title: 'Contribuição mensal',
        content: [
          { label: 'Valor da contribuição', value: 'R$ 500,00' },
          { label: 'Porcentagem do salário', value: '5%' },
        ],
        link: { text: 'Alterar contribuição', url: '#' },
      },
      {
        icon: 'money_off',
        title: 'Contribuição voluntária',
        content: [
          { label: 'Valor da contribuição', value: 'R$ 300,00' },
          { label: 'Porcentagem do salário', value: '3%' },
        ],
        link: { text: 'Alterar contribuição', url: '#' },
      },
    ]);
  });
});
