import { TestBed } from '@angular/core/testing';

import { ContainerService } from './ngx-container.service';

describe('NgxContainerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContainerService = TestBed.get(ContainerService);
    expect(service).toBeTruthy();
  });
});
