import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class ContainerEventBusService {

  /**
   * Holds events subject.
   */
  private events$: Subject<any> = new Subject<any>();

  /**
   * Emit event.
   */
  public emit(event: any): void {

    this.events$.next(event);

  }

  /**
   * Events observable.
   */
  public get events(): Observable<any> {

    return this.events$.asObservable();

  }

}
