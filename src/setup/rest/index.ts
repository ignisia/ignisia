import { IgnisiaConfig, IgnisiaContext } from '../../internal';
import { IgnisiaError } from '../../internal/error';
import type { IgnisiaAction } from '../../types/action';
import type { Middleware, Random } from '../../types/common';
import type { CreateIgnisiaRestOption, IgnisiaMethod } from '../../types/rest';
import type { IgnisiaService } from '../../types/service';
import { resolvePromise } from '../../utils/common';
import { eventHandler } from '../handler';
import {
  extractRestParams,
  getRestReqObject,
  getRestResObject,
} from './helper';

export class IgnisiaServiceRest {
  public readonly path: string;
  public readonly method: IgnisiaMethod | null;
  public readonly service: IgnisiaService | null;
  private action: IgnisiaAction;

  constructor(options: CreateIgnisiaRestOption) {
    if (!options.action.rest) {
      throw new IgnisiaError(
        'Cannot create REST without action with rest option'
      );
    }

    const [method, path] = extractRestParams(options.action.rest);

    this.path = path;
    this.method = method;
    this.action = options.action;
    this.service = options.service;

    const middlewares: Middleware[] = [
      ...options.middlewares,
      ...(this.action.middlewares ?? []),
    ];

    options.router.on(
      method,
      path,
      ...middlewares,
      this.restHandler.bind(this)
    );
  }

  public async restHandler(...args: Random[]) {
    const [ctx, error] = await resolvePromise(
      IgnisiaContext.create({
        rest: getRestReqObject(...args),
        // NULL => automatically use rest request value instead
        body: null,
        header: null,
        params: null,
        query: null,
        validator: this.action.validator ?? null,
        meta: this.action.meta ?? null,
      })
    );

    if (error || !ctx) {
      return IgnisiaConfig.restErrorHandler({
        ctx,
        res: getRestResObject(...args),
        error,
      });
    }

    const [restResult, restError] = await resolvePromise(
      eventHandler(this.action, ctx)
    );

    if (restError) {
      return IgnisiaConfig.restErrorHandler({
        ctx,
        res: getRestResObject(...args),
        error: restError,
      });
    }

    return IgnisiaConfig.restSuccessHandler({
      ctx,
      result: restResult,
      res: getRestResObject(...args),
    });
  }
}
