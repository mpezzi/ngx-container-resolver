import { MonoTypeOperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';

export function ofInstance<T>(
  ...instances: any[]
): MonoTypeOperatorFunction<T> {
  return filter(
    i => instances.some(
      instance => i instanceof instance,
    ),
  );
}
