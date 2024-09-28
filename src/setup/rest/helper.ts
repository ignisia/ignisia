import type { Random } from '../../types/common';
import type {
  IgnisiaMethod,
  IgnisiaRestParam,
  IgnisiaRestRoute,
} from '../../types/rest';

export function extractRestPath(restRoute: IgnisiaRestRoute) {
  const restPath = restRoute.split(' ');

  if (restPath.length === 1) {
    return [null, restPath[0]] as const;
  }

  return [restPath[0] as IgnisiaMethod, restPath[1]] as const;
}

export function extractRestParams(params: IgnisiaRestParam) {
  if (typeof params === 'string') return extractRestPath(params);

  return [params.method ?? null, params.path] as const;
}

export function getRestReqObject(...args: Random[]) {
  return args[0];
}

export function getRestResObject(...args: Random[]) {
  if (args.length === 1) {
    return args[0];
  }

  return args[1];
}
