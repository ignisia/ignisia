import { STATUS_CODE } from '../utils/rest';
import type { Random, RecordString, RecordUnknown } from './common';

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

export type StatusCode =
  | (typeof STATUS_CODE)[keyof typeof STATUS_CODE]
  | (number & NonNullable<unknown>);

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
