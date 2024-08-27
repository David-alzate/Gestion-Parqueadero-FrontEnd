import { TestBed } from '@angular/core/testing';

import { CeldasService } from './celdas.service';

describe('CeldasService', () => {
  let service: CeldasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CeldasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
