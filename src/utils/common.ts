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
