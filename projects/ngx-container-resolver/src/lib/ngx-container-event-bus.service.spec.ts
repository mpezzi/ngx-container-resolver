import { TestBed } from '@angular/core/testing';

import { NgxContainerResolverModule } from './ngx-container-resolver.module';
import { ContainerService } from './ngx-container.service';

describe('ContainerService', () => {

  let service: ContainerService;
  let event: any;

  class OneEvent {}
  class TwoEvent {}
  class ThreeEvent {}

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        NgxContainerResolverModule.forRoot(),
      ],
    });

  });

  beforeEach(() => {

    service = TestBed.get(ContainerService);

  });

  describe('emit', () => {

    it('should emit', () => {

      service.events.subscribe(e => event = e);

      service.emit(new OneEvent());

      expect(event).toEqual(jasmine.any(OneEvent));

      service.emit(new TwoEvent());

      expect(event).toEqual(jasmine.any(TwoEvent));

      service.emit(new ThreeEvent());

      expect(event).toEqual(jasmine.any(ThreeEvent));

    });

  });

});
