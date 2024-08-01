import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";

import { AuthService } from "src/app/core/services/auth.service";
import {
  login,
  loginFailure,
  loginSuccess
} from "./auth.actions";

@Injectable()
export class AuthEffects {
  constructor(
    private _actions$: Actions,
    private _authService: AuthService
  ) {}

  login$ = createEffect(() =>
    this._actions$.pipe(
      ofType(login),
      switchMap(({ emailOrCpf, password }) =>
        this._authService.login(emailOrCpf, password)
        .pipe(
          map(user => loginSuccess({ user })),
          catchError(error => of(loginFailure({ error })))
        )
      )
    )
  );
}
