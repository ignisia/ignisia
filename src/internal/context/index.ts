/* eslint-disable import/no-cycle */
import type { ZodSchema } from 'zod';
import type { Random, RecordString, RecordUnknown } from '../../types/common';
import type {
  CreateIgnisiaContextOption,
  IgnisiaContextConstructorOption,
  IgnisiaContextData,
} from './types';
import {
  validateBody,
  validateHeader,
  validateParams,
  validateQuery,
} from './helper';

import { IgnisiaBroker, IgnisiaConfig } from '..';
import type { IgnisiaBroker as Broker } from '../broker';
import { isNil } from '../../utils/common';
import { StatusCode } from '../../types/rest';

export class IgnisiaContext<
  M extends RecordUnknown = RecordUnknown,
  H extends RecordString = RecordString,
  P extends RecordUnknown = RecordUnknown,
  Q extends RecordUnknown = RecordUnknown,
  B extends RecordUnknown = RecordUnknown,
> {
  private $meta: M | null;
  private $query: Q | null;
  private $body: B | null;
  private $params: P | null;
  private $reqHeader: H | null;

  public status: StatusCode | null;
  private $resHeader: Record<string, string | string[]> | null;
  private $rest: Random | null;
  public readonly isRest: boolean;
  public readonly broker: Broker;

  // Aliases for broker
  public readonly call: Broker['call'];
  public readonly emit: Broker['emit'];
  public readonly event: Broker['event'];

  constructor(options: IgnisiaContextConstructorOption<M, H, P, Q, B>) {
    this.status = null;
    this.isRest = !isNil(options.rest);
    this.$resHeader = null;

    this.$rest = options.rest;
    this.$reqHeader = options.header;
    this.$params = options.params;
    this.$query = options.query;
    this.$body = options.body;

    this.$meta = options.meta ? structuredClone(options.meta) : null;

    this.broker = IgnisiaBroker;
    this.call = IgnisiaBroker.call.bind(IgnisiaBroker);
    this.emit = IgnisiaBroker.emit.bind(IgnisiaBroker);
    this.event = IgnisiaBroker.event.bind(IgnisiaBroker);
  }

  public get meta() {
    if (!this.$meta) this.$meta = {} as M;

    const meta = this.$meta;

    return {
      set<K extends keyof M, V extends M[K]>(key: K, value: V) {
        meta[key] = value;

        return this;
      },
      get<K extends keyof M, V extends M[K]>(key: K) {
        return meta[key] as V;
      },
      entries() {
        return Object.entries(meta);
      },
    };
  }

  public get header() {
    if (!this.$resHeader) this.$resHeader = {};

    const resHeader = this.$resHeader;

    return {
      set(key: string, value: string | string[]) {
        resHeader[key] = value;

        return this;
      },
      get(key: string) {
        return resHeader[key];
      },
      entries() {
        return Object.entries(resHeader);
      },
    };
  }

  private get reqHeader(): H {
    if (this.$reqHeader) return this.$reqHeader;

    if (!this.$rest) {
      this.$reqHeader = {} as H;
    } else {
      this.$reqHeader = IgnisiaConfig.getRestHeader(this.$rest) as H;
    }

    return this.$reqHeader;
  }

  private get reqQuery() {
    if (this.$query) return this.$query;

    if (!this.$rest) {
      this.$query = {} as Q;
    } else {
      this.$query = IgnisiaConfig.getRestQuery(this.$rest) as Q;
    }

    return this.$query;
  }

  private get reqParams(): P {
    if (this.$params) return this.$params;

    if (!this.$rest) {
      this.$params = {} as P;
    } else {
      this.$params = IgnisiaConfig.getRestParams(this.$rest) as P;
    }

    return this.$params;
  }

  private async getBody(): Promise<B> {
    if (this.$body) return this.$body;

    if (!this.$rest) {
      this.$body = {} as B;
    } else {
      this.$body = (await IgnisiaConfig.getRestBody(this.$rest)) ?? ({} as B);
    }

    return this.$body as B;
  }

  public get request() {
    return {
      header: this.reqHeader,
      query: this.reqQuery,
      params: this.reqParams,
      body: this.getBody.bind(this),
    };
  }

  public static async create<
    M extends RecordUnknown,
    H extends RecordString,
    P extends RecordUnknown,
    Q extends RecordUnknown,
    B extends RecordUnknown,
    HV extends ZodSchema,
    PV extends ZodSchema,
    QV extends ZodSchema,
    BV extends ZodSchema,
  >(options: CreateIgnisiaContextOption<M, H, P, Q, B, HV, PV, QV, BV>) {
    const { rest, validator, meta } = options;

    const data: IgnisiaContextData<H, P, Q, B> = {
      header: options.header,
      params: options.params,
      query: options.query,
      body: options.body,
    };

    if (validator?.header) {
      await validateHeader({
        data,
        rest,
        schema: validator.header,
      });
    }

    if (validator?.params) {
      await validateParams({
        data,
        rest,
        schema: validator.params,
      });
    }

    if (validator?.query) {
      await validateQuery({
        data,
        rest,
        schema: validator.query,
      });
    }

    if (validator?.body) {
      await validateBody({
        data,
        rest,
        schema: validator.body,
      });
    }

    const ctx = new IgnisiaContext({
      body: data.body,
      params: data.params,
      header: data.header,
      query: data.query,
      rest,
      meta,
    });

    return ctx;
  }
}
