import type { ZodSchema } from 'zod';
import type { IgnisiaEventHandler } from './handler';
import type { Random, RecordUnknown } from './common';

export interface IgnisiaEvent<
  M extends RecordUnknown = RecordUnknown,
  P extends ZodSchema = ZodSchema,
> {
  validator?: P | null;
  handler: IgnisiaEventHandler<M, P['_output']>;
  throwOnValidationError?: boolean | null;
}

export type AnyIgnisiaEvent = IgnisiaEvent<Random, Random>;

export type AnyIgnisiaEvents = Record<string, AnyIgnisiaEvent>;
