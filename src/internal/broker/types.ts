import type {
  IgnisiaActionCallRecord,
  IgnisiaEventCallRecord,
} from '../../types/common';

export type IgnisiaActionCallName =
  | keyof IgnisiaActionCallRecord
  | (string & NonNullable<unknown>);

export type IgnisiaEventCallName =
  | keyof IgnisiaEventCallRecord
  | (string & NonNullable<unknown>);
