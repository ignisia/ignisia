import { IgnisiaContext, IgnisiaEventEmitter } from '../../internal';
import type { IgnisiaEvent, CreateIgnisiaEventOption } from '../../types/event';
import type { Random } from '../../types/common';
import { RESERVED_KEYWORD } from '../broker';
import type { IgnisiaContextValidation } from '../../internal/context/types';
import { eventHandler } from './handler';

export class IgnisiaServiceEvent {
  public readonly serviceName: string;
  public readonly eventName: string;
  public readonly event: IgnisiaEvent;

  private readonly $validator: IgnisiaContextValidation;

  constructor(options: CreateIgnisiaEventOption) {
    this.serviceName = options.serviceName;
    this.eventName = [
      RESERVED_KEYWORD.PREFIX.EVENT,
      this.serviceName,
      options.eventAlias,
    ].join('.');
    this.event = options.event;
    this.$validator = {
      body: this.event.validator,
    };

    IgnisiaEventEmitter.on(this.eventName, this.handler.bind(this));
  }

  public async handler(...values: Random[]) {
    const [body, params, header, query] = values;

    const context = await IgnisiaContext.create({
      rest: null,
      body,
      params,
      header,
      query,
      validator: this.$validator,
      meta: null,
    });

    const options = {
      handler: this.event.handler,
    };

    return eventHandler(options, context);
  }
}
