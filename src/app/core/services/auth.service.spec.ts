import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpStatusCode } from '@angular/common/http';
import { NgxMaskService } from 'ngx-mask';

import { mockUser } from 'src/app/shared/mock/user.mock';
import { CommonService } from 'src/app/shared/services/common.service';
import { IError } from '../models/error.model';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let commonService: CommonService;
  let ngxMaskService: NgxMaskService;

  beforeEach(() => {
    const commonServiceSpy = {
      isCpf: jest.fn().mockReturnValue(true),
    };

    const ngxMaskServiceSpy = {
      applyMask: jest.fn().mockReturnValue('000.000.000-00'),
    };

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: CommonService, useValue: commonServiceSpy },
        { provide: NgxMaskService, useValue: ngxMaskServiceSpy },
      ],
    });

    service = TestBed.inject(AuthService);
    commonService = TestBed.inject(CommonService);
    ngxMaskService = TestBed.inject(NgxMaskService);
  });

  it('Deve criar', () => {
    expect(service).toBeTruthy();
  });
});
