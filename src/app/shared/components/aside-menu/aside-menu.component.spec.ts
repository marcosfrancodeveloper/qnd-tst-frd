import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIconModule } from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AsideMenuComponent } from './aside-menu.component';

describe('AsideMenuComponent', () => {
  let component: AsideMenuComponent;
  let fixture: ComponentFixture<AsideMenuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AsideMenuComponent],
      imports: [
        RouterTestingModule.withRoutes([]),
        MatIconModule,
        NoopAnimationsModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve criar', () => {
    expect(component).toBeTruthy();
  });

  it('Deve renderizar todos os itens do menu', () => {
    const menuItems = fixture.debugElement.queryAll(By.css('.aside-menu__nav__link'));
    expect(menuItems.length).toBe(component.menuItems.length);
  });

  it('Deve aplicar a classe "active" no item ativo', () => {
    const activeMenuItem = fixture.debugElement.query(By.css('.aside-menu__nav__link.active'));
    expect(activeMenuItem).toBeTruthy();
    expect(activeMenuItem.nativeElement.textContent).toContain('Contribuição Mensal');
  });

  it('Deve exibir os ícones corretamente', () => {
    const menuItems = fixture.debugElement.queryAll(By.css('.aside-menu__nav__link__icon'));
    menuItems.forEach((item, index) => {
      expect(item.nativeElement.textContent.trim()).toBe(component.menuItems[index].icon);
    });
  });
});
