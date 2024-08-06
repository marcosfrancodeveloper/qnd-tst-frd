import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';

import { IUser } from 'src/app/core/models/user.model';
import { Nullable } from '../../types/nullable.type';
import { IAppState } from '../../store/app.state';
import { getUser, isAuthenticated } from '../../store/auth/auth.selectors';
import { logout } from '../../store/auth/auth.actions';
import { startLoading, stopLoading } from '../../store/loading/loading.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  readonly user$: Observable<Nullable<IUser>> = this._store.select(getUser);

  private _destroy$ = new Subject();

  constructor(
    private _store: Store<IAppState>,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    this._loginEvent();
  }

  private _loginEvent(): void {
    this._store.select(isAuthenticated)
      .pipe(takeUntil(this._destroy$))
      .subscribe((isAuthenticated: boolean) => {
        if (!isAuthenticated) {
          this._store.dispatch(stopLoading());
          this._router.navigate(['/']);
        }
      });
  }

  onLogout(): void {
    this._store.dispatch(startLoading());
    this._store.dispatch(logout());
  }

  ngOnDestroy(): void {
    this._destroy$.next(undefined);
    this._destroy$.complete();
  }
}
