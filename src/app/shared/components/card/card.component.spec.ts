import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';

import { CardComponent } from './card.component';
import { ICardData } from './card.model';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  const cardData: ICardData = {
    icon: 'attach_money',
    title: 'Contribuição mensal',
    content: [
      { label: 'Valor da contribuição', value: 'R$ 500,00' },
      { label: 'Porcentagem do salário', value: '5%' }
    ],
    link: { text: 'Alterar contribuição', url: '#' }
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CardComponent],
      imports: [MatIconModule, RouterTestingModule.withRoutes([])]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.data = cardData;
    fixture.detectChanges();
  });

  it('Deve criar', () => {
    expect(component).toBeTruthy();
  });

  it('Deve ter os dados de entrada corretos', () => {
    const titleElement = fixture.nativeElement.querySelector('.card__header__title');
    expect(titleElement.textContent).toBe(cardData.title);
  });
});
