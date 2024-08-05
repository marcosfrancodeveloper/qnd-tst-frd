import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';

import { isAuthenticated } from 'src/app/shared/store/auth/auth.selectors';
import { IAuthState } from 'src/app/shared/store/auth/auth.state';

export const authGuard: CanActivateFn = (): Observable<boolean | UrlTree> => {
  const store = inject(Store<IAuthState>);
  const router = inject(Router);

  return store.select(isAuthenticated)
    .pipe(
      map(isLogged => isLogged || router.createUrlTree(['/login'])
    )
  );
};
