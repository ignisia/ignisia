import { IgnisiaContext, IgnisiaEventEmitter } from '../internal';
import type { CreateIgnisiaActionOption, IgnisiaAction } from '../types/action';
import type { Random } from '../types/common';
import { eventHandler } from './handler';

export class IgnisiaServiceAction {
  public readonly serviceName: string;
  public readonly actionName: string;
  public readonly action: IgnisiaAction;

  constructor(options: CreateIgnisiaActionOption) {
    this.serviceName = options.serviceName;
    this.actionName = options.actionAlias;
    this.action = options.action;

    IgnisiaEventEmitter.on(this.actionName, this.handler.bind(this));
  }

  public async handler(...values: Random[]) {
    const [body, params, header, query] = values;

    const context = await IgnisiaContext.create({
      rest: null,
      body,
      header,
      params,
      query,
      validator: this.action.validator ?? null,
      meta: this.action.meta ?? null,
    });

    return eventHandler(this.action, context);
  }
}
