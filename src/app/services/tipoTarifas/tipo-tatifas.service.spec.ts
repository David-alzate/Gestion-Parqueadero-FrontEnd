import { TestBed } from '@angular/core/testing';

import { TipoTatifasService } from './tipo-tatifas.service';

describe('TipoTatifasService', () => {
  let service: TipoTatifasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoTatifasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
