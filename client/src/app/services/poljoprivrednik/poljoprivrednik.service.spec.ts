import { TestBed } from '@angular/core/testing';

import { PoljoprivrednikService } from './poljoprivrednik.service';

describe('PoljoprivrednikService', () => {
  let service: PoljoprivrednikService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PoljoprivrednikService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
