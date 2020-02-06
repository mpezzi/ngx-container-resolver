import { TestBed } from '@angular/core/testing';
import { tick } from '@angular/core/testing';
import { fakeSchedulers } from 'rxjs-marbles/jasmine/angular';

import { Resolver } from './classes';
import { ContainerChanges } from './interfaces';
import { ContainerEventBusService } from './ngx-container-event-bus.service';
import { NgxContainerModule } from './ngx-container.module';
import { ContainerService } from './ngx-container.service';

describe('ContainerService', () => {

  let service: ContainerService;
  let eventBus: ContainerEventBusService;
  let event: any;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        NgxContainerModule.forRoot(),
      ],
    });

  });

  beforeEach(() => {

    service = TestBed.get(ContainerService);
    eventBus = TestBed.get(ContainerEventBusService);

  });

  describe('createResolver', () => {

    it('should create resolver', () => {

      const loader = jasmine.createSpy('loader').and.returnValue({ test: true });

      const resolver = service.createResolver(() => {
        return loader();
      });

      resolver.load();

      expect(loader).toHaveBeenCalledTimes(1);
      expect(resolver).toEqual(jasmine.any(Resolver));

      resolver.unsubscribe();

    });

    it('should create resolver with defined key', () => {

      const loader = jasmine.createSpy('loader').and.returnValue({ test: true });

      const resolver = service.createResolver(() => {
        return loader();
      }, 'test');

      resolver.load();

      expect(resolver.key).toEqual('test');
      expect(loader).toHaveBeenCalledTimes(1);
      expect(resolver).toEqual(jasmine.any(Resolver));

      resolver.unsubscribe();

    });

  });

  describe('destroyResolver', () => {

    it('should destroy resolver', () => {

      const resolver = service.createResolver(() => {});

      expect(service.destroyResolver(resolver.key)).toBe(true);

    });

  });

  describe('changes', () => {

    it('should emit changes', fakeSchedulers(() => {

      let changes: ContainerChanges;

      service.changes.subscribe(c => changes = c);

      tick();

      expect(changes).toEqual({
        loading: false,
      });

      const resolver1 = service.createResolver(
        () => Promise.resolve({ test: true }),
      );
      const resolver2 = service.createResolver(
        () => Promise.resolve({ test: true }),
      );

      expect(changes).toEqual({
        loading: false,
      });

      tick();

      resolver1.load();

      expect(changes).toEqual({
        loading: true,
      });

      tick();

      expect(changes).toEqual({
        loading: false,
      });

      resolver2.load();

      expect(changes).toEqual({
        loading: true,
      });

      tick();

      expect(changes).toEqual({
        loading: false,
      });

    }));

  });

  describe('events', () => {

    it('should emit events', () => {

      class OneEvent { }
      class TwoEvent { }
      class ThreeEvent { }

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
