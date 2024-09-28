import type { ZodSchema } from 'zod';
import type { Random, RecordString, RecordUnknown } from '../../types/common';

export interface IgnisiaContextValidation<
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

export interface CreateIgnisiaContextOption<
  M extends RecordUnknown = RecordUnknown,
  H extends RecordString = RecordString,
  P extends RecordUnknown = RecordUnknown,
  Q extends RecordUnknown = RecordUnknown,
  B extends RecordUnknown = RecordUnknown,
  HV extends ZodSchema = ZodSchema,
  PV extends ZodSchema = ZodSchema,
  QV extends ZodSchema = ZodSchema,
  BV extends ZodSchema = ZodSchema,
  V extends IgnisiaContextValidation<HV, PV, QV, BV> = IgnisiaContextValidation<
    HV,
    PV,
    QV,
    BV
  >,
> {
  rest: Random | null;
  meta: M | null;
  header: H | null;
  params: P | null;
  query: Q | null;
  body: B | null;
  validator: V | null;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IgnisiaContextConstructorOption<
  M extends RecordUnknown,
  H extends RecordString,
  P extends RecordUnknown,
  Q extends RecordUnknown,
  B extends RecordUnknown,
  HV extends ZodSchema = ZodSchema,
  PV extends ZodSchema = ZodSchema,
  QV extends ZodSchema = ZodSchema,
  BV extends ZodSchema = ZodSchema,
> extends Omit<
    CreateIgnisiaContextOption<M, H, P, Q, B, HV, PV, QV, BV>,
    'validator'
  > {}

export interface IgnisiaContextData<
  H extends RecordString = RecordString,
  P extends RecordUnknown = RecordUnknown,
  Q extends RecordUnknown = RecordUnknown,
  B extends RecordUnknown = RecordUnknown,
> {
  header: H | null;
  params: P | null;
  query: Q | null;
  body: B | null;
}

export interface IgnisiaDataValidatorOption<
  H extends RecordString = RecordString,
  P extends RecordUnknown = RecordUnknown,
  Q extends RecordUnknown = RecordUnknown,
  B extends RecordUnknown = RecordUnknown,
> {
  data: IgnisiaContextData<H, P, Q, B>;
  schema: ZodSchema;
  rest: Random | null;
}
