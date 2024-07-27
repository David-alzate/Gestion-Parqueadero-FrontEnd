import { TestBed } from '@angular/core/testing';

import { SesionesParqueoService } from './sesiones-parqueo.service';

describe('SesionesParqueoService', () => {
  let service: SesionesParqueoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SesionesParqueoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
