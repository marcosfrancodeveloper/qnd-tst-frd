import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  /**
   * Verifica se o valor possui as características de um CPF
   * @param value Valor a ser verificado
   * @returns `true` quando o valor possuir o formato de CPF, caso contrário `false`
   * @memberof CommonService
   */
  isCpf(value: string): boolean {
    const cleanedInput = value.replace(/\D/g, '');
    return cleanedInput.length === 11;
  }
}
