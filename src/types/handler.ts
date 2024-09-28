import type { IgnisiaContext } from '../internal/context';
import type { Random, RecordString, RecordUnknown } from './common';

export interface IgnisiaActionHandler<
  R = unknown | void,
  M extends RecordUnknown = RecordUnknown,
  H extends RecordString = RecordString,
  P extends RecordUnknown = RecordUnknown,
  Q extends RecordUnknown = RecordUnknown,
  B extends RecordUnknown = RecordUnknown,
> {
  (ctx: IgnisiaContext<M, H, P, Q, B>): Promise<R>;
}

export interface IgnisiaEventHandler<
  M extends RecordUnknown = RecordUnknown,
  P extends RecordUnknown = RecordUnknown,
> {
  (ctx: IgnisiaContext<M, Random, Random, Random, P>): Promise<void>;
}

export interface IgnisiaEventListener {
  (...values: Random[]): Promise<void | unknown> | void | unknown;
}
