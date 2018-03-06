import { TestBed, inject } from '@angular/core/testing';

import { ProcessInstanceService } from './process-instance.service';

describe('ProcessInstanceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProcessInstanceService]
    });
  });

  it('should be created', inject([ProcessInstanceService], (service: ProcessInstanceService) => {
    expect(service).toBeTruthy();
  }));
});
