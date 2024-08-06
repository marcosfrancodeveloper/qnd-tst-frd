import { Component } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { ICardData } from 'src/app/shared/components/card/card.model';

@Component({
  selector: 'app-contribution',
  templateUrl: './contribution.component.html',
  styleUrls: ['./contribution.component.scss']
})
export class ContributionComponent {
  doughnutChartLabels: string[] = [
    'Contribuição mensal',
    'Contribuição voluntária'
  ];

  doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      {
        data: [499999.99, 499999.99],
        backgroundColor: ['#e91e63', '#5e35b1'],
      },
    ],
  };

  doughnutChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  cards: ICardData[] = [
    {
      icon: 'attach_money',
      title: 'Contribuição mensal',
      content: [
        { label: 'Valor da contribuição', value: 'R$ 500,00' },
        { label: 'Porcentagem do salário', value: '5%' }
      ],
      link: { text: 'Alterar contribuição', url: '#' }
    },
    {
      icon: 'money_off',
      title: 'Contribuição voluntária',
      content: [
        { label: 'Valor da contribuição', value: 'R$ 300,00' },
        { label: 'Porcentagem do salário', value: '3%' }
      ],
      link: { text: 'Alterar contribuição', url: '#' }
    }
  ];
}
