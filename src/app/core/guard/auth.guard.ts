import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { isAuthenticated } from 'src/app/shared/store/auth/auth.selectors';
import { IAuthState } from 'src/app/shared/store/auth/auth.state';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private _store: Store<IAuthState>,
    private _router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this._store.select(isAuthenticated).pipe(
      map(isAuthenticated => {
        if (!isAuthenticated) {
          this._router.navigate(['/login']);
          return false;
        }
        return true;
      })
    );
  }
}
