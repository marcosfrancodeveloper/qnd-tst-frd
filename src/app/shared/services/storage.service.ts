import { Injectable } from "@angular/core";
import * as CryptoJs from "crypto-js";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly _key = 'QUANDO_STORAGE';

  /**
   * Retorna um valor do localStorage criptografado
   * @template T Tipo do valor a ser retornado
   * @param key Chave a ser buscada
   * @returns Valor encontrado
   * @memberof StorageService
   */
  get<T>(key: string): T {
    const value = localStorage.getItem(key);
    return value
      ? JSON.parse(this._decrypt(value))
      : null;
  }

  /**
   * Retorna um valor do localStorage
   * @param key Chave a ser buscada
   * @returns Valor encontrado
   * @memberof StorageService
   */
  set<T>(key: string, value: T): void {
    const encrypted = this._encrypt(JSON.stringify(value));
    localStorage.setItem(key, encrypted);
  }

  /**
   * Remove uma chave do localStorage
   * @param key Chave a ser removida
   * @memberof StorageService
   */
  remove(key: string): void {
    localStorage.removeItem(key);
  }

  /**
   * Criptografa um valor utilizando a biblioteca crypto-js
   * @param value Valor a ser criptografado
   * @returns Valor criptografado
   * @memberof StorageService
   */
  private _encrypt(value: string): string {
    return CryptoJs.AES
      .encrypt(value, this._key)
      .toString();
  }

  /**
   * Descriptografa um valor utilizando a biblioteca crypto-js
   * @param value Valor a ser descriptografado
   * @returns Valor descriptografado
   * @memberof StorageService
   */
  private _decrypt(value: string): string {
    return CryptoJs.AES
      .decrypt(value, this._key)
      .toString(CryptoJs.enc.Utf8);
  }
}
