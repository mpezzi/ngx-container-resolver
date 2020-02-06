import { tick } from '@angular/core/testing';
import { Subject, of } from 'rxjs';
import { fakeSchedulers } from 'rxjs-marbles/jasmine/angular';

import { ofInstance } from './of-instance.operator';

describe('ofInstance', () => {

  class OneEvent {}
  class TwoEvent {}
  class ThreeEvent {}

  it('should filter instances', fakeSchedulers(() => {

    const subject$: Subject<any> = new Subject<any>();

    let event: any;

    subject$.pipe(
      ofInstance(
        OneEvent,
        TwoEvent
      ),
    ).subscribe(
      e => event = e,
    );

    subject$.next(new OneEvent());

    expect(event).toEqual(jasmine.any(OneEvent));

    subject$.next(new TwoEvent());

    expect(event).toEqual(jasmine.any(TwoEvent));

    subject$.next(new ThreeEvent());

    expect(event).toEqual(jasmine.any(TwoEvent));

  }));

});
