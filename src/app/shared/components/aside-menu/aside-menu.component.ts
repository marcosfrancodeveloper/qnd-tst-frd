import { Component } from '@angular/core';

interface MenuItem {
  icon: string;
  text: string;
  route: string;
}

@Component({
  selector: 'app-aside-menu',
  templateUrl: './aside-menu.component.html',
  styleUrls: ['./aside-menu.component.scss']
})
export class AsideMenuComponent {
  menuItems: MenuItem[] = [
    { icon: 'receipt', text: 'Ver Extrato', route: '/extrato' },
    { icon: 'attach_money', text: 'Contribuição Mensal', route: '/contribuicao-mensal' },
    { icon: 'money', text: 'Contribuição Extra', route: '/contribuicao-extra' },
    { icon: 'description', text: 'Documentos', route: '/documentos' },
    { icon: 'gavel', text: 'Regime de Tributação', route: '/regime-tributacao' },
    { icon: 'assignment_ind', text: 'Solicitar Benefício', route: '/solicitar-beneficio' },
    { icon: 'assessment', text: 'Extrato Regressivo', route: '/extrato-regressivo' },
    { icon: 'info', text: 'Informações', route: '/informacoes' },
  ];
}
