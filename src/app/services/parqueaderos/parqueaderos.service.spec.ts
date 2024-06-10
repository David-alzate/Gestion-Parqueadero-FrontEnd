import { TestBed } from '@angular/core/testing';

import { ParqueaderosService } from './parqueaderos.service';

describe('ParqueaderosService', () => {
  let service: ParqueaderosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParqueaderosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
