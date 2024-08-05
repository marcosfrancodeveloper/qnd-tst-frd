import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';

import { Nullable } from 'src/app/shared/types/nullable.type';
import { login } from 'src/app/shared/store/auth/auth.actions';

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
    private _store: Store,
    private _formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this._initForm();
    this._initRules();
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

    if (this._isCpf(value)) {
      this.mask = '000.000.000-00';
      validators.push(
        Validators.minLength(11),
        Validators.maxLength(14),
        Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
      );
    } else {
      this.mask = undefined;
      validators.push(Validators.email);
    }

    field.setValidators(validators);
    field.updateValueAndValidity();
    console.log(field);
  }

  private _isCpf(input: string): boolean {
    const cleanedInput = input.replace(/\D/g, '');
    return cleanedInput.length === 11;
  }

  onSubmit(): void {
    if (this.form.valid) {
      this._store.dispatch(login({ ...this.form.value }));
    }
  }

  ngOnDestroy(): void {
    this._destroy$.next(undefined);
    this._destroy$.complete();
  }
}
