import type { AnyIgnisiaActions } from './action';
import type { Middleware, Random } from './common';
import type { AnyIgnisiaEvents } from './event';
import type { IgnisiaActionHandler } from './handler';

export interface IgnisiaService<
  N extends string = string,
  V extends number = number,
  A extends AnyIgnisiaActions = AnyIgnisiaActions,
  E extends AnyIgnisiaEvents = AnyIgnisiaEvents,
> {
  name?: N | null;
  rest?: string | null;
  version?: V | null;
  actions?: A | null;
  events?: E | null;
  middlewares?: Middleware[] | null;
  onCreated?: IgnisiaActionHandler | null;
  onStarted?: IgnisiaActionHandler | null;
}

export type AnyIgnisiaService = IgnisiaService<
  Random,
  Random,
  AnyIgnisiaActions,
  AnyIgnisiaEvents
>;
