import { TestBed } from '@angular/core/testing';

import { TipoSedeService } from './tipo-sede.service';

describe('TipoSedeService', () => {
  let service: TipoSedeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoSedeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
