import { TestBed } from '@angular/core/testing';

import { CiudaesService } from './ciudaes.service';

describe('CiudaesService', () => {
  let service: CiudaesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CiudaesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
