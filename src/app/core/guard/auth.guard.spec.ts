import { Component } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { provideRouter, Route, Router } from '@angular/router';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';

import { IAuthState } from 'src/app/shared/store/auth/auth.state';
import { isAuthenticated } from 'src/app/shared/store/auth/auth.selectors';
import { authGuard } from './auth.guard';

@Component({
  selector: 'app-test',
  template: `<h1>It's work</h1>`
})
class TestComponent {}

describe('AuthGuard', () => {
  let store: MockStore<IAuthState>;
  let router: Router;
  let harness: RouterTestingHarness;

  const routes: Route[] = [
    {
      path: 'test',
      canActivate: [authGuard],
      component: TestComponent,
    },
    {
      path: 'login',
      component: TestComponent,
    }
  ];

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

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        provideMockStore({ initialState }),
        provideRouter(routes),
      ],
    }).compileComponents();
  }));

  beforeEach(async () => {
    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
    harness = await RouterTestingHarness.create();
  });

  it('should initiate the login flow if not authenticated', async () => {
    store.overrideSelector(isAuthenticated, false);
    store.refreshState();
    await harness.navigateByUrl('/test');

    expect(router.url).toEqual('/login');
  });

  it('should allow access to the test if authenticated', async () => {
    store.overrideSelector(isAuthenticated, true);
    store.refreshState();
    await harness.navigateByUrl('/test');

    expect(router.url).toEqual('/test');
  });
});
