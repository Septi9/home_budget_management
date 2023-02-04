import { TestBed } from '@angular/core/testing';

import { TransfersLimitService } from './transfers-limit.service';

describe('TransfersLimitService', () => {
  let service: TransfersLimitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransfersLimitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
