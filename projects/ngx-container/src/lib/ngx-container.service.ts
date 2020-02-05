import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { uuid as uuidv4 } from 'uuidv4';

import { Resolver } from './classes';
import { ContainerChanges, ResolverLoader } from './interfaces';
import { ContainerEventBusService } from './ngx-container-event-bus.service';

@Injectable()
export class ContainerService {

  /**
   * Holds keys behavior subject.
   */
  private keys$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  /**
   * Holds resolvers.
   */
  private resolvers: Map<string, Resolver<any>> = new Map<string, Resolver<any>>();

  /**
   * Constructor.
   */
  public constructor(
    private readonly eventBus: ContainerEventBusService,
  ) { }

  /**
   * Create resolver.
   */
  public createResolver<T>(loader: ResolverLoader<T>, key: string = uuidv4()): Resolver<T> {

    const resolver: Resolver<T> = new Resolver(
      key,
      loader,
      () => this.destroyResolver(key),
    );

    this.resolvers.set(key, resolver);

    this.updateKeys();

    return resolver;

  }

  /**
   * Destroy resolver.
   */
  public destroyResolver(key: string): void {

    this.resolvers.delete(key);

    this.updateKeys();

  }

  /**
   * Emit event.
   */
  public emit(event: any): void {

    this.eventBus.emit(event);

  }

  /**
   * Events observable.
   */
  public get events(): Observable<any> {

    return this.eventBus.events;

  }

  /**
   * Changes observable.
   */
  public get changes(): Observable<ContainerChanges> {

    return this.keys$.pipe(
      map(
        keys => keys.map(k => this.resolvers.get(k).changes),
      ),
      switchMap(
        observables => combineLatest(observables).pipe(
          map(
            changes => ({
              loading: changes.length ? changes.some(change => change.loading) : false
            })
          )
        ),
      ),
      startWith({
        loading: false,
      }),
    );

  }

  /**
   * Update keys.
   */
  private updateKeys(): void {

    this.keys$.next(
      Array.from(this.resolvers.keys()),
    );

  }

}
