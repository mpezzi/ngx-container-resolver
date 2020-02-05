import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

export const ofInstance = (...args: any[]) => <T>(source: Observable<T>) => (
  source.pipe(
    filter(
      e => args.some(a => e instanceof a)
    )
  )
);
