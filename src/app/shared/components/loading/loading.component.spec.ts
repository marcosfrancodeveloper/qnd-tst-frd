import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { By } from '@angular/platform-browser';

import { LoadingComponent } from './loading.component';
import { IAppState } from '../../store/app.state';
import { isLoading } from '../../store/loading/loading.selectors';

describe('LoadingComponent', () => {
  let fixture: ComponentFixture<LoadingComponent>;
  let component: LoadingComponent;
  let store: MockStore<IAppState>;
  const initialState = { loading: { isLoading: false } };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoadingComponent],
      providers: [provideMockStore({ initialState })]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => jest.clearAllMocks());

  it('Deve criar', () => {
    expect(component).toBeTruthy();
  });

  it('Deve mostrar o spinner quando `isLoading$` for `true`', () => {
    store.overrideSelector(isLoading, true);
    store.refreshState();
    fixture.detectChanges();

    const spinner: DebugElement = fixture.debugElement.query(By.css('.loading__spinner'));
    expect(spinner).toBeTruthy();
  });

  it('Deve ocultar o spinner quando o `isLoading$` for `false`', () => {
    store.overrideSelector(isLoading, false);
    store.refreshState();
    fixture.detectChanges();

    const spinner: DebugElement = fixture.debugElement.query(By.css('.loading__spinner'));
    expect(spinner).toBeNull();
  });
});
