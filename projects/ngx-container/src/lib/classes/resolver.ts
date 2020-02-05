import { BehaviorSubject, Observable, isObservable } from 'rxjs';

import { ResolverChanges, ResolverLoader } from '../interfaces';

export class Resolver<T> {

  /**
   * Holds changes behavior subject.
   */
  private changes$: BehaviorSubject<ResolverChanges<T>> = new BehaviorSubject<ResolverChanges<T>>({
    data: null,
    error: null,
    loading: true,
  });

  /**
   * Holds run function.
   */
  private run: (...args: any[]) => Promise<T>;

  /**
   * Constructor.
   */
  public constructor(
    public key: string,
    public readonly loader: ResolverLoader<T>,
    public readonly unsubscriber: () => void,
  ) {
    this.init();
  }

  /**
   * Initialize.
   */
  public init(): void {

    this.run = async (...args) => {

      this.changes$.next({
        ...this.changes$.getValue(),
        loading: true
      });

      try {

        let data = await this.loader(...args);

        if (isObservable(data)) {
          data = await data.toPromise();
        }

        this.changes$.next({
          data,
          error: null,
          loading: false,
        });

        return data;

      } catch (error) {

        this.changes$.next({
          data: null,
          error,
          loading: false,
        });

      }

    };

  }

  /**
   * Load.
   */
  public load(...args: any[]): Promise<T> {

    return this.run(...args);

  }

  /**
   * Changes.
   */
  public get changes(): Observable<ResolverChanges<T>> {

    return this.changes$.asObservable();

  }

  /**
   * Unsubscribe.
   */
  public unsubscribe(): void {

    this.unsubscriber();

  }

}
