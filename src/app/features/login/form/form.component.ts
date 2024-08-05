import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { login } from 'src/app/shared/store/auth/auth.actions';

@Component({
  selector: 'app-login-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class LoginFormComponent implements OnInit {
  loginForm!: FormGroup;
  hide = true;

  constructor(
    private _store: Store,
    private _formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      emailOrCpf: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this._store.dispatch(login({ ...this.loginForm.value }));
    }
  }
}
