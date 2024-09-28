import type { IgnisiaContext } from '../internal';
import { RESPONSE_TYPE, REST_METHOD, STATUS_CODE } from '../utils/rest';
import type { IgnisiaAction } from './action';
import type { Middleware, Random, RecordString, RecordUnknown } from './common';
import type { IgnisiaService } from './service';

export type IgnisiaMethod = (typeof REST_METHOD)[keyof typeof REST_METHOD];

export type IgnisiaRestRoute = `${IgnisiaMethod} /${string}` | `/${string}`;

export interface IgnisiaRestOption {
  method?: IgnisiaMethod | null;
  path: string;
}

export type IgnisiaRestParam = IgnisiaRestRoute | IgnisiaRestOption;

export type StatusCode =
  | (typeof STATUS_CODE)[keyof typeof STATUS_CODE]
  | (number & NonNullable<unknown>);

export type ResponseType = (typeof RESPONSE_TYPE)[keyof typeof RESPONSE_TYPE];

export interface GetRestBody {
  (...args: Random[]): Promise<Random>;
}

export interface GetRestHeader {
  (...args: Random[]): RecordString;
}

export interface GetRestParams {
  (...args: Random[]): RecordUnknown;
}

export interface GetRestQuery {
  (...args: Random[]): RecordUnknown;
}

export interface RestRouter {
  on: (...args: Random[]) => void;
  use: (path: string, router: RestRouter) => void;
  route: (path: string, router: RestRouter) => void;
}

export interface CreateRestRouter {
  (): RestRouter;
}

export interface CreateIgnisiaRestOption {
  service: IgnisiaService;
  action: Omit<IgnisiaAction, 'name'>;
  middlewares: Middleware[];
  router: RestRouter;
}

export interface OnRestSuccessHandler<T = Random> {
  (options: { ctx: IgnisiaContext; result: Random; res: T }): Promise<Random>;
}

export interface OnRestErrorHandler<T = Random> {
  (options: {
    ctx?: IgnisiaContext | null;
    error: Random;
    res: T;
  }): Promise<Random>;
}
