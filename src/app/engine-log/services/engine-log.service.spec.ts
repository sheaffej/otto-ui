import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { EngineLogService } from './engine-log.service';

describe('EngineLogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EngineLogService
      ],
      imports: [
        HttpClientTestingModule
      ],
    });
  });

  it('should be created',
    inject(
      [HttpTestingController, EngineLogService],
      (httpMock: HttpTestingController, service: EngineLogService) => {
        expect(service).toBeTruthy();
      }
    ));
});
