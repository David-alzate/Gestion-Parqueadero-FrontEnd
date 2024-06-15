import { TestBed } from '@angular/core/testing';

import { TipoEmpleadosService } from './tipo-empleados.service';

describe('TipoEmpleadosService', () => {
  let service: TipoEmpleadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoEmpleadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
