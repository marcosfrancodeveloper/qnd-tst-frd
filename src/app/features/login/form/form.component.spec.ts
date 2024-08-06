import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

import { LoginFormComponent } from './form.component';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { login, resetState } from 'src/app/shared/store/auth/auth.actions';
import { getAuthError, isAuthenticated } from 'src/app/shared/store/auth/auth.selectors';
import { startLoading, stopLoading } from 'src/app/shared/store/loading/loading.actions';
import { IAppState } from 'src/app/shared/store/app.state';
import { IError } from 'src/app/core/models/error.model';
import { FormErrorMessageService } from 'src/app/shared/services/form-error-message.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormFieldErrorDirective } from 'src/app/shared/directives/form-field-error.directive';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let store: MockStore<IAppState>;
  let dialogService: DialogService;
  let commonService: CommonService;
  let router: Router;

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

  const mockRouter = {
    navigate: jest.fn()
  };

  const mockDialogService = {
    alert: jest.fn()
  };

  const mockCommonService = {
    isCpf: jest.fn()
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FormFieldErrorDirective, LoginFormComponent],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        NgxMaskDirective,
      ],
      providers: [
        FormErrorMessageService,
        provideMockStore({ initialState }),
        { provide: Router, useValue: mockRouter },
        { provide: DialogService, useValue: mockDialogService },
        { provide: CommonService, useValue: mockCommonService },
        provideNgxMask(),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    dialogService = TestBed.inject(DialogService);
    commonService = TestBed.inject(CommonService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
    jest.spyOn(store, 'dispatch');
  });

  afterEach(() => jest.clearAllMocks());

  it('Deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('Deve inicializar o formulário corretamente', () => {
    expect(component.form).toBeDefined();
    expect(component.form.get('emailOrCpf')).toBeDefined();
    expect(component.form.get('password')).toBeDefined();
  });

  it('Deve marcar todos os campos como tocados se o formulário estiver inválido ao enviar', () => {
    component.onSubmit();
    expect(component.form.touched).toBe(true);
  });

  it('Deve despachar startLoading e login ao enviar o formulário válido', () => {
    component.form.setValue({ emailOrCpf: 'test@test.com', password: 'password' });
    component.onSubmit();

    expect(store.dispatch).toHaveBeenCalledWith(startLoading());
    expect(store.dispatch).toHaveBeenCalledWith(login({ emailOrCpf: 'test@test.com', password: 'password' }));
  });

  it('Deve navegar para /contribution se o usuário estiver autenticado', () => {
    store.overrideSelector(isAuthenticated, true);
    store.refreshState();
    fixture.detectChanges();

    expect(store.dispatch).toHaveBeenCalledWith(stopLoading());
    expect(router.navigate).toHaveBeenCalledWith(['/contribution']);
  });

  it('Deve exibir mensagem de erro se houver um erro de autenticação', () => {
    const error: IError = { status: 400, code: 'invalid_credentials', message: 'Credencias inválidas.' };
    store.overrideSelector(getAuthError, error);
    store.refreshState();
    fixture.detectChanges();

    expect(store.dispatch).toHaveBeenCalledWith(resetState());
    expect(store.dispatch).toHaveBeenCalledWith(stopLoading());
    expect(dialogService.alert).toHaveBeenCalledWith(error.message);
  });
});
