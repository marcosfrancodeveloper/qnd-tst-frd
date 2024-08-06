import { TestBed } from '@angular/core/testing';
import { FormErrorMessageService } from './form-error-message.service';
import { ValidationMessagesEnum } from '../enums/validation-messages.enum';
import { ErrorMessageType } from '../types/error-message.type';

describe('FormErrorMessageService', () => {
  let service: FormErrorMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormErrorMessageService);
  });

  it('Deve criar', () => {
    expect(service).toBeTruthy();
  });

  describe('getErrorMessage', () => {
    it('Deve retornar a mensagem padrão para o erro necessário', () => {
      const message = service.getErrorMessage('required');
      expect(message).toBe(ValidationMessagesEnum.REQUIRED);
    });

    it('Deve retornar a mensagem padrão para o erro de `minlength` com parâmetros', () => {
      const message = service.getErrorMessage('minlength', { length: 5 });
      expect(message).toBe('Deve conter pelo menos 5 caracteres');
    });

    it('Deve retornar a mensagem padrão para erro `maxlength` com parâmetros', () => {
      const message = service.getErrorMessage('maxlength', { length: 10 });
      expect(message).toBe('Deve conter no máximo 10 caracteres');
    });

    it('Deve retornar a mensagem padrão para erro de e-mail', () => {
      const message = service.getErrorMessage('email');
      expect(message).toBe(ValidationMessagesEnum.EMAIL);
    });

    it('Deve retornar a mensagem padrão para erro desconhecido', () => {
      const message = service.getErrorMessage('unknownError');
      expect(message).toBe(ValidationMessagesEnum.INVALID);
    });

    it('Deve retornar uma mensagem personalizada se fornecido', () => {
      const customMessage = 'Custom error message';
      service.setCustomMessage('customError', customMessage);
      const message = service.getErrorMessage('customError');
      expect(message).toBe(customMessage);
    });

    it('Deve interpolar o modelo de mensagem com parâmetros', () => {
      const template = 'Deve conter pelo menos {requiredLength} caracteres.';
      service.setCustomMessage('minlength', template);
      const message = service.getErrorMessage('minlength', { requiredLength: 5 });
      expect(message).toBe('Deve conter pelo menos 5 caracteres.');
    });
  });

  describe('setCustomMessage', () => {
    it('Deve definir uma mensagem de erro personalizada', () => {
      const customMessage = 'Custom error message';
      service.setCustomMessage('customError', customMessage);
      const message = service.getErrorMessage('customError');
      expect(message).toBe(customMessage);
    });

    it('Deve definir uma função de mensagem de erro personalizada', () => {
      const customMessageFn: ErrorMessageType = (params) => `Custom message with ${params.value}`;
      service.setCustomMessage('customErrorFn', customMessageFn);
      const message = service.getErrorMessage('customErrorFn', { value: 'dynamic value' });
      expect(message).toBe('Custom message with dynamic value');
    });
  });
});
