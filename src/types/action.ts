import type { ProcedureType } from '@trpc/server';
import type { ZodSchema } from 'zod';
import type { Middleware, Random, RecordUnknown } from './common';
import type { IgnisiaActionHandler } from './handler';
import type {
  IgnisiaAcceptedAfterHook,
  IgnisiaAcceptedBeforeHook,
  IgnisiaActionHook,
} from './hook';
import { IgnisiaRestParam } from './rest';

export interface IgnisiaActionValidator<
  H extends ZodSchema = ZodSchema,
  P extends ZodSchema = ZodSchema,
  Q extends ZodSchema = ZodSchema,
  B extends ZodSchema = ZodSchema,
> {
  header?: H | null;
  params?: P | null;
  query?: Q | null;
  body?: B | null;
}

export interface IgnisiaAction<
  R = unknown | void,
  HR = unknown | void,
  M extends RecordUnknown = RecordUnknown,
  H extends ZodSchema = ZodSchema,
  P extends ZodSchema = ZodSchema,
  Q extends ZodSchema = ZodSchema,
  B extends ZodSchema = ZodSchema,
  AH extends IgnisiaAcceptedAfterHook<
    HR,
    M,
    H['_output'],
    P['_output'],
    Q['_output'],
    B['_output']
  > = IgnisiaAcceptedAfterHook<
    HR,
    M,
    H['_output'],
    P['_output'],
    Q['_output'],
    B['_output']
  >,
  BH extends IgnisiaAcceptedBeforeHook<
    M,
    H['_output'],
    P['_output'],
    Q['_output'],
    B['_output']
  > = IgnisiaAcceptedBeforeHook<
    M,
    H['_output'],
    P['_output'],
    Q['_output'],
    B['_output']
  >,
  TRPC extends ProcedureType = ProcedureType,
> {
  middlewares?: Middleware[] | null;
  validator?: IgnisiaActionValidator<H, P, Q, B> | null;
  handler: IgnisiaActionHandler<
    R,
    M,
    H['_output'],
    P['_output'],
    Q['_output'],
    B['_output']
  >;
  meta?: M | null;
  rest?: IgnisiaRestParam | null;
  hooks?: IgnisiaActionHook<AH, BH> | null;
  throwOnValidationError?: boolean | null;
  trpc?: TRPC | null;
}

export type AnyIgnisiaAction = IgnisiaAction<
  Random,
  Random,
  Random,
  Random,
  Random,
  Random,
  Random,
  Random,
  Random,
  Random
>;

export type AnyIgnisiaActionValidator = IgnisiaActionValidator<
  ZodSchema,
  ZodSchema,
  ZodSchema,
  ZodSchema
>;

export type AnyIgnisiaActions = Record<string, AnyIgnisiaAction>;

export interface CreateIgnisiaActionOption {
  action: IgnisiaAction;
  serviceName: string;
  actionAlias: string;
}
