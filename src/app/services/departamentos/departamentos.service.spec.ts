import { TestBed } from '@angular/core/testing';

import { DepartamentosService } from './departamentos.service';

describe('DepartamentosService', () => {
  let service: DepartamentosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepartamentosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
