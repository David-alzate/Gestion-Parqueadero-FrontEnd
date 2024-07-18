import { TestBed } from '@angular/core/testing';

import { TipoPlanesService } from './tipo-planes.service';

describe('TipoPlanesService', () => {
  let service: TipoPlanesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoPlanesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
