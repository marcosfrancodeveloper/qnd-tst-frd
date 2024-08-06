import { Component } from '@angular/core';

interface MenuItem {
  icon: string;
  text: string;
  route: string;
  active: boolean;
}

@Component({
  selector: 'app-aside-menu',
  templateUrl: './aside-menu.component.html',
  styleUrls: ['./aside-menu.component.scss']
})
export class AsideMenuComponent {
  menuItems: MenuItem[] = [
    {
      icon: 'receipt',
      text: 'Ver Extrato',
      route: '/extrato',
      active: false
    },
    {
      icon: 'attach_money',
      text: 'Contribuição Mensal',
      route: '/contribuicao-mensal',
      active: true
    },
    {
      icon: 'money',
      text: 'Contribuição Extra',
      route: '/contribuicao-extra',
      active: false
    },
    {
      icon: 'description',
      text: 'Documentos',
      route: '/documentos',
      active: false
    },
    {
      icon: 'gavel',
      text: 'Regime de Tributação',
      route: '/regime-tributacao',
      active: false
    },
    {
      icon: 'assignment_ind',
      text: 'Solicitar Benefício',
      route: '/solicitar-beneficio',
      active: false
    },
    {
      icon: 'assessment',
      text: 'Extrato Regressivo',
      route: '/extrato-regressivo',
      active: false
    },
    {
      icon: 'info',
      text: 'Informações',
      route: '/informacoes',
      active: false
    },
  ];
}
