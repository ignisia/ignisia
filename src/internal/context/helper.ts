import type { ZodSchema } from 'zod';
import type { IgnisiaDataValidatorOption } from './types';
// eslint-disable-next-line import/no-cycle
import { IgnisiaConfig } from '..';
import { IgnisiaError } from '../error';

function validateInput<T extends ZodSchema>(input: unknown, schema: T) {
  const result = schema.safeParseAsync(input);

  return result;
}

export async function validateHeader(options: IgnisiaDataValidatorOption) {
  const { data, rest, schema } = options;

  if (!data.header && rest) {
    data.header = IgnisiaConfig.getRestHeader(rest);
  }

  const result = await validateInput(data.header, schema);

  if (!result.success) {
    throw new IgnisiaError({
      errors: result.error,
      message: 'Invalid header',
      status: 400,
      name: 'Invalid header',
    });
  }

  data.header = result.data;
}

export async function validateParams(options: IgnisiaDataValidatorOption) {
  const { data, rest, schema } = options;

  if (!data.params && rest) {
    data.params = IgnisiaConfig.getRestParams(rest);
  }

  const result = await validateInput(data.params, schema);

  if (!result.success) {
    throw new IgnisiaError({
      errors: result.error,
      message: 'Invalid params',
      status: 400,
      name: 'Invalid params',
    });
  }

  data.params = result.data;
}

export async function validateQuery(options: IgnisiaDataValidatorOption) {
  const { data, rest, schema } = options;

  if (!data.query && rest) {
    data.query = IgnisiaConfig.getRestQuery(rest);
  }

  const result = await validateInput(data.query, schema);

  if (!result.success) {
    throw new IgnisiaError({
      errors: result.error,
      message: 'Invalid query',
      status: 400,
      name: 'Invalid query',
    });
  }

  data.query = result.data;
}

export async function validateBody(options: IgnisiaDataValidatorOption) {
  const { data, rest, schema } = options;

  if (!data.body && rest) {
    data.body = await IgnisiaConfig.getRestBody(rest);
  }

  const result = await validateInput(data.body, schema);

  if (!result.success) {
    throw new IgnisiaError({
      errors: result.error,
      message: 'Invalid body',
      status: 400,
      name: 'Invalid body',
    });
  }

  data.body = result.data;
}
