import { Injectable } from '@angular/core';

import { ValidationMessagesEnum } from '../enums/validation-messages.enum';
import { ErrorMessageType } from '../types/error-message.type';

interface IErrorMessage {
  [key: string]: ErrorMessageType;
}

@Injectable({
  providedIn: 'root',
})
export class FormErrorMessageService {
  private _customMessages: IErrorMessage = {};

  private _defaultMessages: IErrorMessage = {
    required: ValidationMessagesEnum.REQUIRED,
    minlength: ValidationMessagesEnum.MIN_LENGTH,
    maxlength: ValidationMessagesEnum.MAX_LENGTH,
    email: ValidationMessagesEnum.EMAIL,
    invalid: ValidationMessagesEnum.INVALID,
  };

  /**
   * Retorna a mensagem de erro correspondente à chave de erro fornecida, interpolando parâmetros se necessário
   * @param errorKey A chave do erro
   * @param params Parâmetros opcionais para interpolação na mensagem de erro
   * @returns A mensagem de erro correspondente
   * @memberof ErrorMessageService
   */
  getErrorMessage(errorKey: string, params?: any): string {
    const messageTemplate = this._customMessages[errorKey]
      || this._defaultMessages[errorKey]
      || this._defaultMessages['invalid'];
    return (typeof messageTemplate === 'function')
      ? messageTemplate(params)
      : this._interpolate(messageTemplate, params);
  }

  /**
   * Define uma mensagem de erro customizada para uma chave de erro específica
   * @param errorKey A chave do erro
   * @param message A mensagem de erro customizada ou função geradora de mensagem
   * @memberof ErrorMessageService
   */
  setCustomMessage(errorKey: string, message: ErrorMessageType): void {
    this._customMessages[errorKey] = message;
  }

  /**
   * Interpola uma string template substituindo as chaves pelos valores correspondentes nos parâmetros
   * @param template A string template contendo chaves a serem substituídas
   * @param params Objeto contendo os valores para substituição das chaves
   * @returns A string interpolada
   * @memberof ErrorMessageService
   * @private
   */
  private _interpolate(template: string, params: any): string {
    return template.replace(/{([^}]+)}/g, (match, key) => params[key] || match);
  }
}
