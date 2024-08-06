import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { FormFieldErrorDirective } from './form-field-error.directive';
import { FormErrorMessageService } from '../services/form-error-message.service';

@Component({
  template: `
    <form [formGroup]="form">
      <mat-form-field appearance="outline">
        <mat-label>E-mail</mat-label>
        <input
          matInput
          formControlName="email"
          appFormFieldError="email"
          #emailError="formErrorMessage"
        />
        <mat-error *ngIf="emailError.firstError">
          {{ emailError.firstError }}
        </mat-error>
      </mat-form-field>
    </form>
  `,
})
class TestComponent {
  form: FormGroup = this._formBuilder.group({
    email: ['', [
      Validators.required,
      Validators.email,
    ]],
  });

  constructor(
    private _formBuilder: FormBuilder,
  ) {}
}

describe('FormFieldErrorDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let formErrorMessageService: FormErrorMessageService;
  let directive: FormFieldErrorDirective;

  const errorMessageServiceSpy = {
    getErrorMessage: jest.fn((key: string) => {
      switch (key) {
        case 'required':
          return 'Este campo é obrigatório';
        case 'email':
          return 'Formato de e-mail inválido';
        default:
          return 'Erro desconhecido';
      }
    }),
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, FormFieldErrorDirective],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
      ],
      providers: [
        {
          provide: FormErrorMessageService,
          useValue: errorMessageServiceSpy
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    formErrorMessageService = TestBed.inject(FormErrorMessageService);
    directive = fixture.debugElement
      .query(By.directive(FormFieldErrorDirective))
      .injector.get(FormFieldErrorDirective);
    fixture.detectChanges();
  });

  it('Deve criar', () => {
    expect(component).toBeTruthy();
  });

  it('Deve exibir a mensagem de erro quando o campo é inválido', () => {
    const control = component.form.get('email');
    control?.setErrors({ email: true });
    control?.markAllAsTouched();
    fixture.detectChanges();

    const errorElement = fixture.nativeElement.querySelector('mat-error');
    expect(errorElement.textContent).toContain('Formato de e-mail inválido');
  });

  it('Deve exibir a mensagem de erro "Este campo é obrigatório"', () => {
    const control = component.form.get('email');
    control?.setErrors({ required: true });
    control?.markAllAsTouched();
    fixture.detectChanges();

    const errorElement = fixture.nativeElement.querySelector('mat-error');
    expect(errorElement.textContent).toContain('Este campo é obrigatório');
  });

  it('Não deve exibir a mensagem de erro quando o campo é válido', () => {
    const control = component.form.get('email');
    control?.setErrors(null);
    control?.markAllAsTouched();
    fixture.detectChanges();

    const errorElement = fixture.nativeElement.querySelector('mat-error');
    expect(errorElement).toBeNull();
  });
});
