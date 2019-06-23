import { TestBed } from '@angular/core/testing';

import { UpdateMenuService } from './update-menu.service';

describe('UpdateMenuService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpdateMenuService = TestBed.get(UpdateMenuService);
    expect(service).toBeTruthy();
  });
});
