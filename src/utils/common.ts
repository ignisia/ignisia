import type { IgnisiaService } from '../types/service';

export function toArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value];
}

export function isNil<T>(
  value: T | null | undefined
): value is null | undefined {
  return value === null || value === undefined;
}

export function removeTrailingSlash(path: string) {
  return path.replace(/^\/+/, '');
}

export function getRestPath(service: IgnisiaService) {
  const version = service.version ? `v${service.version}` : '';
  const restPath =
    typeof service.rest === 'string' ? service.rest : service.name;

  return [version, restPath]
    .map((val) => (typeof val === 'string' ? removeTrailingSlash(val) : null))
    .filter(Boolean)
    .join('/');
}

export function getServiceName(service: IgnisiaService) {
  const version = !isNil(service.version) ? `v${service.version}` : '';

  return [version, service.name].filter(Boolean).join('.');
}

export async function resolvePromise<T>(
  promise: Promise<T> | T
): Promise<
  readonly [result: T, error: null] | readonly [result: null, error: unknown]
> {
  try {
    const res = await promise;

    return [res, null] as const;
  } catch (err) {
    return [null, err] as const;
  }
}

export function hasOwnProperty<
  Z extends NonNullable<unknown>,
  X extends NonNullable<unknown> = NonNullable<unknown>,
  Y extends PropertyKey = PropertyKey,
>(obj: X, property: Y): obj is X & Record<Y, Z> {
  return Object.hasOwn(obj, property);
}

export function isOnCjs() {
  return typeof module !== 'undefined' && typeof exports !== 'undefined';
}
