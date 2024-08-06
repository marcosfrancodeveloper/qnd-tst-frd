import { TestBed } from '@angular/core/testing';
import * as CryptoJs from 'crypto-js';
import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;
  const mockKey = 'mockKey';
  const mockValue = { name: 'test' };
  const mockValueString = JSON.stringify(mockValue);

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
    localStorage.clear();
  });

  it('Deve criar', () => {
    expect(service).toBeTruthy();
  });

  it('Deve retornar o valor descriptografado do localStorage', () => {
    const encryptedValue = CryptoJs.AES.encrypt(mockValueString, service['_key']).toString();
    localStorage.setItem(mockKey, encryptedValue);

    const result = service.get<typeof mockValue>(mockKey);
    expect(result).toEqual(mockValue);
  });

  it('Deve retornar `null` se a chave não estiver presente no localStorage', () => {
    const result = service.get(mockKey);
    expect(result).toBeNull();
  });

  it('Deve armazenar o valor criptografado no localStorage', () => {
    service.set(mockKey, mockValue);
    const storedValue = localStorage.getItem(mockKey);
    const decryptedValue = CryptoJs.AES.decrypt(storedValue!, service['_key']).toString(CryptoJs.enc.Utf8);

    expect(decryptedValue).toEqual(mockValueString);
  });

  it('Deve remover a chave do localStorage', () => {
    localStorage.setItem(mockKey, mockValueString);
    service.remove(mockKey);
    expect(localStorage.getItem(mockKey)).toBeNull();
  });
});
