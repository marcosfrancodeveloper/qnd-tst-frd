import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { HeaderComponent } from './header.component';
import { IAppState } from '../../store/app.state';
import { logout } from '../../store/auth/auth.actions';
import { startLoading, stopLoading } from '../../store/loading/loading.actions';
import { isAuthenticated } from '../../store/auth/auth.selectors';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let store: MockStore<IAppState>;
  let router: Router;

  const initialState = {
    auth: {
      isAuthenticated: false,
      user: null,
      error: null,
    },
    loading: {
      isLoading: false,
    }
  };

  const mockRouter = {
    navigate: jest.fn()
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        provideMockStore({ initialState }),
        { provide: Router, useValue: mockRouter }
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    jest.spyOn(store, 'dispatch');
  });

  beforeEach(() => jest.clearAllMocks());

  it('Deve criar', () => {
    expect(component).toBeTruthy();
  });

  it('Deve despachar o `stopLoading` e navegar para `/`, se não estiver autenticado', () => {
    store.overrideSelector(isAuthenticated, false);
    store.refreshState();
    fixture.detectChanges();

    expect(store.dispatch).toHaveBeenCalledWith(stopLoading());
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });

  it('Não deve navegar para `/` se estiver autenticado', () => {
    store.overrideSelector(isAuthenticated, true);
    store.refreshState();
    fixture.detectChanges();

    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('Deve despachar logout e `startloading` ao sair', () => {
    component.onLogout();
    expect(store.dispatch).toHaveBeenCalledWith(startLoading());
    expect(store.dispatch).toHaveBeenCalledWith(logout());
  });
});
