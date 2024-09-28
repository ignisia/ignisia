/* eslint-disable @typescript-eslint/ban-ts-comment */
import type {
  IgnisiaEventCallRecord,
  IgnisiaActionCallRecord,
  Random,
} from '../../types/common';
import { RESERVED_KEYWORD } from '../../utils/broker';
import { IgnisiaError } from '../error';
// eslint-disable-next-line import/no-cycle
import { IgnisiaEventEmitter } from '..';
import type { IgnisiaEventCallName, IgnisiaActionCallName } from './types';

export class IgnisiaBroker {
  public hasListener(eventName: string) {
    return IgnisiaEventEmitter.listenerCount(eventName) > 0;
  }

  private validateEventName(eventName: string) {
    if (this.hasListener(eventName)) return;

    throw new IgnisiaError({
      status: 500,
      errors: {
        message: `No listener for event ${eventName}`,
      },
      message: 'No listener for event',
    });
  }

  public async call<
    T extends IgnisiaActionCallName,
    // @ts-expect-error
    U = IgnisiaActionCallRecord[T],
    // @ts-expect-error
    V = U['result'],
    // @ts-expect-error
  >(eventName: T, body: U['body']): Promise<V>;
  public async call<
    T extends IgnisiaActionCallName,
    // @ts-expect-error
    U = IgnisiaActionCallRecord[T],
    // @ts-expect-error
    V = U['result'],
  >(
    eventName: T,
    // @ts-expect-error
    body: U['body'],
    // @ts-expect-error
    params: U['params']
  ): Promise<V>;
  public async call<
    T extends IgnisiaActionCallName,
    // @ts-expect-error
    U = IgnisiaActionCallRecord[T],
    // @ts-expect-error
    V = U['result'],
  >(
    eventName: T,
    // @ts-expect-error
    body: U['body'],
    // @ts-expect-error
    params: U['params'],
    // @ts-expect-error
    header: U['header']
  ): Promise<V>;
  public async call<
    T extends IgnisiaActionCallName,
    // @ts-expect-error
    U = IgnisiaActionCallRecord[T],
    // @ts-expect-error
    V = U['result'],
  >(
    eventName: T,
    // @ts-expect-error
    body: U['body'],
    // @ts-expect-error
    params: U['params'],
    // @ts-expect-error
    header: U['header'],
    // @ts-expect-error
    query: U['query']
  ): Promise<V>;
  public async call<
    T extends IgnisiaActionCallName,
    // @ts-expect-error
    U = IgnisiaActionCallRecord[T],
    // @ts-expect-error
    V = U['result'],
  >(eventName: T, ...values: Random[]): Promise<V> {
    this.validateEventName(eventName);

    const results = await IgnisiaEventEmitter.emitAsync<never, V>(
      eventName,
      ...values
    );

    return results[0];
  }

  public emit<
    T extends IgnisiaActionCallName,
    // @ts-expect-error
    U = IgnisiaActionCallRecord[T],
    // @ts-expect-error
  >(eventName: T, body: U['body']): boolean;
  public emit<
    T extends IgnisiaActionCallName,
    // @ts-expect-error
    U = IgnisiaActionCallRecord[T],
    // @ts-expect-error
  >(eventName: T, body: U['body'], params: U['params']): boolean;
  public emit<
    T extends IgnisiaActionCallName,
    // @ts-expect-error
    U = IgnisiaActionCallRecord[T],
  >(
    eventName: T,
    // @ts-expect-error
    body: U['body'],
    // @ts-expect-error
    params: U['params'],
    // @ts-expect-error
    header: U['header']
  ): boolean;
  public emit<T extends IgnisiaActionCallName>(
    eventName: T,
    ...values: Random[]
  ) {
    return IgnisiaEventEmitter.emit(eventName, ...values);
  }

  public event<T extends IgnisiaEventCallName>(eventName: T): boolean;
  public event<
    T extends IgnisiaEventCallName,
    // @ts-expect-error
    U = IgnisiaEventCallRecord[T],
    // @ts-expect-error
  >(eventName: T, body: U['body']): boolean;
  public event<T extends IgnisiaEventCallName>(
    eventName: T,
    ...values: Random[]
  ) {
    const evtName = [RESERVED_KEYWORD.PREFIX.EVENT.toString(), eventName].join(
      '.'
    );

    return IgnisiaEventEmitter.emit(evtName, ...values);
  }
}
