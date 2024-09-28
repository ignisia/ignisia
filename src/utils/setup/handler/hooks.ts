import type {
  IgnisiaAfterHookHandlerOption,
  IgnisiaBeforeHookHandlerOption,
} from '../../../types/hook';
import { toArray } from '../../common';

export async function beforeActionHookHandler(
  options: IgnisiaBeforeHookHandlerOption
): Promise<void> {
  const hooks = toArray(options.hooks);

  // eslint-disable-next-line no-restricted-syntax
  for (const hook of hooks) {
    await hook(options.ctx);
  }
}

export async function afterActionHookHandler(
  options: IgnisiaAfterHookHandlerOption
): Promise<unknown> {
  const hooks = toArray(options.hooks);

  // eslint-disable-next-line prefer-destructuring
  let result = options.result;

  // eslint-disable-next-line no-restricted-syntax
  for (const hook of hooks) {
    result = await hook(options.ctx, result);
  }

  return result;
}
