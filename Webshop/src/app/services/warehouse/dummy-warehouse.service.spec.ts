import { TestBed } from '@angular/core/testing';

import { DummyWarehouseService } from './dummy-warehouse.service';

describe('DummyWarehouseService', () => {
  let service: DummyWarehouseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DummyWarehouseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
