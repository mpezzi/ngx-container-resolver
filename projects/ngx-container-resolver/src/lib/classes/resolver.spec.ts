import { tick } from '@angular/core/testing';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { fakeSchedulers } from 'rxjs-marbles/jasmine/angular';
import { switchMap } from 'rxjs/operators';

import { Resolver } from './resolver';

describe('Resolver', () => {

  describe('changes', () => {

    it('should update changes for promise success', fakeSchedulers(() => {

      let changes: any;

      const resolver = new Resolver<any>(
        'name',
        (args: any = {}) => Promise.resolve({ test: true, args }),
        () => {},
      );

      resolver.changes.subscribe(c => changes = c);

      // Initial state.
      expect(changes).toEqual({
        data: null,
        error: null,
        loading: false,
      });

      resolver.load();

      // Before promise resolves.
      expect(changes).toEqual({
        data: null,
        error: null,
        loading: true,
      });

      tick();

      // After promise resolves.
      expect(changes).toEqual({
        data: {
          test: true,
          args: {},
        },
        error: null,
        loading: false,
      });

      resolver.load({ test: true });

      // Before promise resolves.
      expect(changes).toEqual({
        data: {
          test: true,
          args: {},
        },
        error: null,
        loading: true,
      });

      tick();

      // After promise resolves.
      expect(changes).toEqual({
        data: {
          test: true,
          args: {
            test: true,
          },
        },
        error: null,
        loading: false,
      });

    }));

    it('should update changes for promise failure', fakeSchedulers(() => {

      let changes: any;

      const resolver = new Resolver<any>(
        'name',
        () => Promise.reject({ test: true }),
        () => {},
      );

      resolver.changes.subscribe(c => changes = c);

      // Initial state.
      expect(changes).toEqual({
        data: null,
        error: null,
        loading: false,
      });

      resolver.load();

      // Before promise rejects.
      expect(changes).toEqual({
        data: null,
        error: null,
        loading: true,
      });

      tick();

      // After promise rejects.
      expect(changes).toEqual({
        data: null,
        error: {
          test: true,
        },
        loading: false,
      });

      resolver.load();

      // Before promise resolves.
      expect(changes).toEqual({
        data: null,
        error: {
          test: true,
        },
        loading: true,
      });

      tick();

      // After promise resolves.
      expect(changes).toEqual({
        data: null,
        error: {
          test: true,
        },
        loading: false,
      });

    }));

    it('should update changes for observable success', fakeSchedulers(() => {

      let changes: any;

      const resolver = new Resolver<any>(
        'name',
        (args: any = {}) => of({ test: true, args }),
        () => {},
      );

      resolver.changes.subscribe(c => changes = c);

      // Initial state.
      expect(changes).toEqual({
        data: null,
        error: null,
        loading: false,
      });

      resolver.load();

      // Before promise resolves.
      expect(changes).toEqual({
        data: null,
        error: null,
        loading: true,
      });

      tick();

      // After promise resolves.
      expect(changes).toEqual({
        data: {
          test: true,
          args: {},
        },
        error: null,
        loading: false,
      });

      resolver.load({ test: true });

      // Before promise resolves.
      expect(changes).toEqual({
        data: {
          test: true,
          args: {},
        },
        error: null,
        loading: true,
      });

      tick();

      // After promise resolves.
      expect(changes).toEqual({
        data: {
          test: true,
          args: {
            test: true,
          },
        },
        error: null,
        loading: false,
      });

    }));

    it('should update changes for observable success for subject', fakeSchedulers(() => {

      const subject: BehaviorSubject<any> = new BehaviorSubject<any>(true);

      let changes: any;

      const resolver = new Resolver<any>(
        'name',
        (args: any = {}) => subject.pipe(switchMap(s => of({ test: true, args }))),
        () => {},
      );

      resolver.changes.subscribe(c => changes = c);

      // Initial state.
      expect(changes).toEqual({
        data: null,
        error: null,
        loading: false,
      });

      resolver.load();

      // Before promise resolves.
      expect(changes).toEqual({
        data: null,
        error: null,
        loading: true,
      });

      tick();

      // After promise resolves.
      expect(changes).toEqual({
        data: {
          test: true,
          args: {},
        },
        error: null,
        loading: false,
      });

      resolver.load({ test: true });

      // Before promise resolves.
      expect(changes).toEqual({
        data: {
          test: true,
          args: {},
        },
        error: null,
        loading: true,
      });

      tick();

      // After promise resolves.
      expect(changes).toEqual({
        data: {
          test: true,
          args: {
            test: true,
          },
        },
        error: null,
        loading: false,
      });

    }));

    it('should update changes for observable failure', fakeSchedulers(() => {

      let changes: any;

      const resolver = new Resolver<any>(
        'name',
        () => throwError({ test: true }),
        () => {},
      );

      resolver.changes.subscribe(c => changes = c);

      // Initial state.
      expect(changes).toEqual({
        data: null,
        error: null,
        loading: false,
      });

      resolver.load();

      // Before promise rejects.
      expect(changes).toEqual({
        data: null,
        error: null,
        loading: true,
      });

      tick();

      // After promise rejects.
      expect(changes).toEqual({
        data: null,
        error: {
          test: true,
        },
        loading: false,
      });

      resolver.load();

      // Before promise resolves.
      expect(changes).toEqual({
        data: null,
        error: {
          test: true,
        },
        loading: true,
      });

      tick();

      // After promise resolves.
      expect(changes).toEqual({
        data: null,
        error: {
          test: true,
        },
        loading: false,
      });

    }));

  });

  describe('load', () => {

    it('should load', fakeSchedulers(() => {

      let value;

      const loader = jasmine.createSpy('loader').and.returnValue({ test: true });

      const resolver = new Resolver('name', loader, () => null);

      resolver.load().then(v => value = v);

      tick();

      expect(loader).toHaveBeenCalledTimes(1);
      expect(loader).not.toHaveBeenCalledWith({ test: true });
      expect(value).toEqual({ test: true });

      resolver.load({ test: true }).then(v => value = v);

      tick();

      expect(loader).toHaveBeenCalledTimes(2);
      expect(loader).toHaveBeenCalledWith({ test: true });
      expect(value).toEqual({ test: true });

    }));

  });

  describe('unsubscribe', () => {

    it('should unsubscribe', () => {

      const unsubscriber = jasmine.createSpy('subscriber').and.returnValue(true);

      const resolver = new Resolver('name', () => {}, unsubscriber);

      resolver.unsubscribe();

      expect(unsubscriber).toHaveBeenCalledTimes(1);

    });

  });

});
