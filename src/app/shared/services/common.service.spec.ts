import { CommonService } from './common.service';

describe('CommonService', () => {
  let commonService: CommonService;

  beforeEach(() => {
    commonService = new CommonService();
  });

  it('Deve criar', () => {
    expect(commonService).toBeTruthy();
  });

  it('Deve retornar `true` pelo valor ter características de CPF', () => {
    const value = '123.456.789-09';
    expect(commonService.isCpf(value)).toBeTruthy();
  });

  it('Deve retornar `false` pelo valor não ter características de CPF', () => {
    const value = 'contato@quando.com.vc';
    expect(commonService.isCpf(value)).toBeFalsy();
  });
});
