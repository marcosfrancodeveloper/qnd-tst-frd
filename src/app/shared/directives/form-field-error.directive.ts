import {
  Directive,
  Input,
  OnDestroy,
  OnInit,
  Optional,
} from '@angular/core';
import { AbstractControl, FormGroupDirective } from '@angular/forms';
import { Subject } from 'rxjs';

import { Nullable } from '../types/nullable.type';
import { FormErrorMessageService } from '../services/form-error-message.service';

@Directive({
  selector: '[appFormFieldError]',
  exportAs: 'formErrorMessage'
})
export class FormFieldErrorDirective implements OnInit, OnDestroy {
  @Input('appFormFieldError') controlName: string = '';

  private _control: Nullable<AbstractControl> = null;
  private _destroy$ = new Subject();

  /**
   * Retorna a primeira mensagem de erro do campo
   * @returns Mensagem de erro
   * @memberof FormFieldErrorDirective
   */
  get firstError(): string {
    if (!this._control || !this._control.errors) return '';
    const errorKey = Object.keys(this._control.errors).shift()!;
    const errorValue = this._control.errors[errorKey];
    return this._formErrorMessageService.getErrorMessage(errorKey, errorValue);
  }

  constructor(
    @Optional() private _formGroupDirective: FormGroupDirective,
    private _formErrorMessageService: FormErrorMessageService,
  ) {}

  ngOnInit(): void {
    this._control = this._formGroupDirective.form.get(this.controlName);
  }

  ngOnDestroy(): void {
    this._destroy$.next(undefined);
    this._destroy$.complete();
  }
}
