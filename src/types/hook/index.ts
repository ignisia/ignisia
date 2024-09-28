import type { Random } from '../common';
import type { IgnisiaAcceptedAfterHook } from './after';
import type { IgnisiaAcceptedBeforeHook } from './before';

export type * from './after';
export type * from './before';

export interface IgnisiaActionHook<
  AH extends IgnisiaAcceptedAfterHook<
    Random,
    Random,
    Random,
    Random,
    Random,
    Random
  > = IgnisiaAcceptedAfterHook,
  BH extends IgnisiaAcceptedBeforeHook<
    Random,
    Random,
    Random,
    Random,
    Random
  > = IgnisiaAcceptedBeforeHook,
> {
  after?: AH | null;
  before?: BH | null;
}

export type AnyIgnisiaActionHook = IgnisiaActionHook<Random, Random>;
