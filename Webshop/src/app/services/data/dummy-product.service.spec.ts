import { TestBed } from '@angular/core/testing';

import { DummyProductService } from './dummy-product.service';

describe('DummyProductService', () => {
  let service: DummyProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DummyProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
