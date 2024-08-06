import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';

import { Nullable } from 'src/app/shared/types/nullable.type';
import { login, resetState } from 'src/app/shared/store/auth/auth.actions';
import { getAuthError, isAuthenticated } from 'src/app/shared/store/auth/auth.selectors';
import { IAppState } from 'src/app/shared/store/app.state';
import { startLoading, stopLoading } from 'src/app/shared/store/loading/loading.actions';
import { IError } from 'src/app/core/models/error.model';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { CommonsService } from 'src/app/shared/services/commons.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class LoginFormComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  hide = true;
  mask?: string;

  private _destroy$ = new Subject();

  constructor(
    private _store: Store<IAppState>,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _dialogService: DialogService,
    private _commonService: CommonsService,
  ) {}

  ngOnInit(): void {
    this._initForm();
    this._initRules();
    this._loginEvent();
  }

  private _initForm(): void {
    this.form = this._formBuilder.group({
      emailOrCpf: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  private _initRules(): void {
    const field: Nullable<AbstractControl> = this.form.get('emailOrCpf')!;
    field?.valueChanges
      .pipe(
        takeUntil(this._destroy$),
        distinctUntilChanged(),
        debounceTime(500),
      )
      .subscribe((value: string) => this._updateValidators(field, value));
  }

  private _updateValidators(field: AbstractControl, value: string): void {
    const validators = [Validators.required];

    if (this._commonService.isCpf(value)) {
      this.mask = '000.000.000-00';
      validators.push(
        Validators.minLength(11),
        Validators.maxLength(14)
      );
    } else {
      this.mask = undefined;
      validators.push(Validators.email);
    }

    field.setValidators(validators);
    field.updateValueAndValidity();
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this._store.dispatch(startLoading());
    this._store.dispatch(login({ ...this.form.value }));
  }

  private _loginEvent(): void {
    this._store.select(isAuthenticated)
      .pipe(takeUntil(this._destroy$))
      .subscribe((isAuthenticated: boolean) => {
        if (isAuthenticated) {
          this._store.dispatch(stopLoading());
          this._router.navigate(['/contribution']);
        }
      });

    this._store.select(getAuthError)
      .pipe(takeUntil(this._destroy$))
      .subscribe((error: Nullable<IError>) => {
        if (error) {
          [
            resetState(),
            stopLoading()
          ].forEach(this._store.dispatch);
          this._dialogService.alert(error.message);
        }
      });
  }

  ngOnDestroy(): void {
    this._destroy$.next(undefined);
    this._destroy$.complete();
  }
}
