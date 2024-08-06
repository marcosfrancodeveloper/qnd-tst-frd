import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BannerComponent } from './banner.component';

describe('BannerComponent', () => {
  let fixture: ComponentFixture<BannerComponent>;
  let component: BannerComponent;

  beforeEach(waitForAsync( () => {
    TestBed.configureTestingModule({
      declarations: [BannerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve criar', () => {
    expect(component).toBeTruthy();
  });

  it('Deve renderizar a legenda da imagem no banner', () => {
    const bannerElement: HTMLElement = fixture.nativeElement;
    const bannerText = bannerElement.querySelector('.banner__content__figure__caption');
    expect(bannerText!.textContent).toContain('Bem-vindo a seu novo Dashboard');
  });
});
