import { TestBed, inject } from '@angular/core/testing';

import { EngineLogService } from './engine-log.service';

describe('EngineLogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EngineLogService]
    });
  });

  it('should be created', inject([EngineLogService], (service: EngineLogService) => {
    expect(service).toBeTruthy();
  }));
});
