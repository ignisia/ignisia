import type { IgnisiaContext } from '../../internal/IgnisiaContex';
import type { Random, RecordString, RecordUnknown } from '../common';

export interface IgnisiaAfterHookHandler<
  R = unknown | void,
  M extends RecordUnknown = RecordUnknown,
  H extends RecordString = RecordString,
  P extends RecordUnknown = RecordUnknown,
  Q extends RecordUnknown = RecordUnknown,
  B extends RecordUnknown = RecordUnknown,
> {
  (ctx: IgnisiaContext<M, H, P, Q, B>, res: Random): Promise<R>;
}

export type AnyIgnisiaAfterHookHandler = IgnisiaAfterHookHandler<
  Random,
  Random,
  Random,
  Random,
  Random,
  Random
>;

export type IgnisiaAcceptedAfterHook<
  R = unknown | void,
  M extends RecordUnknown = RecordUnknown,
  H extends RecordString = RecordString,
  P extends RecordUnknown = RecordUnknown,
  Q extends RecordUnknown = RecordUnknown,
  B extends RecordUnknown = RecordUnknown,
> =
  | IgnisiaAfterHookHandler<R, M, H, P, Q, B>
  | IgnisiaAfterHookHandler<R, M, H, P, Q, B>[];

export type AnyAfterHook = IgnisiaAcceptedAfterHook<
  Random,
  Random,
  Random,
  Random,
  Random,
  Random
>;

export interface IgnisiaAfterHookHandlerOption<
  R = unknown | void,
  M extends RecordUnknown = RecordUnknown,
  H extends RecordString = RecordString,
  P extends RecordUnknown = RecordUnknown,
  Q extends RecordUnknown = RecordUnknown,
  B extends RecordUnknown = RecordUnknown,
> {
  result: unknown;
  hooks: IgnisiaAcceptedAfterHook<R, M, H, P, Q, B>;
  blazeCtx: IgnisiaContext<M, H, P, Q, B>;
}
