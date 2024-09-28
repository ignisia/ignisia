import type { IgnisiaContext } from '../../internal/IgnisiaContex';
import type { Random, RecordString, RecordUnknown } from '../common';

export interface IgnisiaBeforeHookHandler<
  M extends RecordUnknown = RecordUnknown,
  H extends RecordString = RecordString,
  P extends RecordUnknown = RecordUnknown,
  Q extends RecordUnknown = RecordUnknown,
  B extends RecordUnknown = RecordUnknown,
> {
  (ctx: IgnisiaContext<M, H, P, Q, B>): Promise<void> | void;
}

export type AnyIgnisiaBeforeHookHandler = IgnisiaBeforeHookHandler<
  Random,
  Random,
  Random,
  Random,
  Random
>;

export type IgnisiaAcceptedBeforeHook<
  M extends RecordUnknown = RecordUnknown,
  H extends RecordString = RecordString,
  P extends RecordUnknown = RecordUnknown,
  Q extends RecordUnknown = RecordUnknown,
  B extends RecordUnknown = RecordUnknown,
> =
  | IgnisiaBeforeHookHandler<M, H, P, Q, B>
  | IgnisiaBeforeHookHandler<M, H, P, Q, B>[];

export type AnyBeforeHook = IgnisiaAcceptedBeforeHook<
  Random,
  Random,
  Random,
  Random,
  Random
>;

export interface IgnisiaBeforeHookHandlerOption<
  M extends RecordUnknown = RecordUnknown,
  B extends RecordUnknown = RecordUnknown,
  P extends RecordUnknown = RecordUnknown,
  H extends RecordString = RecordString,
  Q extends RecordUnknown = RecordUnknown,
> {
  hooks: IgnisiaAcceptedBeforeHook<M, H, P, Q, B>;
  blazeCtx: IgnisiaContext<M, H, P, Q, B>;
}
