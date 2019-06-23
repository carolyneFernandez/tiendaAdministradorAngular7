import { TestBed } from '@angular/core/testing';

import { SubidaImagenService } from './subida-imagen.service';

describe('SubidaImagenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubidaImagenService = TestBed.get(SubidaImagenService);
    expect(service).toBeTruthy();
  });
});
