import { TestBed } from '@angular/core/testing';

import { TipoIdentificacionService } from './tipo-identificacion.service';

describe('TipoIdentificacionService', () => {
  let service: TipoIdentificacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoIdentificacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
