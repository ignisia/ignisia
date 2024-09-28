export enum IgnisiaMethod {
  ALL = 'ALL',
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
  PATCH = 'PATCH',
  OPTIONS = 'OPTIONS',
  DELETE = 'DELETE',
  USE = 'USE',
}

export type IgnisiaRestRoute = `${IgnisiaMethod} /${string}` | `/${string}`;

export interface IgnisiaRestOption {
  method?: IgnisiaMethod | null;
  path: string;
}

export type IgnisiaRestParam = IgnisiaRestRoute | IgnisiaRestOption;
