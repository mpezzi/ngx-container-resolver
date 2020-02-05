import { Observable } from 'rxjs';

export interface ResolverChanges<T> {
  data: T;
  error: any;
  loading: boolean;
}

export type ResolverLoaderResult<T> = Observable<T> | Promise<T> | T;
export type ResolverLoader<T> = (...args: any) => ResolverLoaderResult<T>;
