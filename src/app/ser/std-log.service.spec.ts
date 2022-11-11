import { TestBed } from '@angular/core/testing';

import { StdLogService } from './std-log.service';

describe('StdLogService', () => {
  let service: StdLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StdLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
