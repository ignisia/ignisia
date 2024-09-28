/* eslint-disable import/no-relative-packages */
import { Hono, type Context } from 'hono';
import { IgnisiaConfig } from '../../src';
import type {
  OnRestErrorHandler,
  OnRestSuccessHandler,
} from '../../src/types/rest';

IgnisiaConfig.createRestRouter = function createRestRouter() {
  const router = new Hono();

  return router as never;
};

IgnisiaConfig.getRestBody = async function getRestBody(ctx: Context) {
  return ctx.req.json();
};

IgnisiaConfig.getRestHeader = function getRestHeader(ctx: Context) {
  return ctx.req.header();
};

IgnisiaConfig.getRestQuery = function getRestQuery(ctx: Context) {
  return ctx.req.query();
};

IgnisiaConfig.getRestParams = function getRestParams(ctx: Context) {
  return ctx.req.param();
};

const restErrorHandler: OnRestErrorHandler<Context> =
  async function restErrorHandler({ error, res, ctx }) {
    res.json(error, ctx?.status ?? error?.status ?? 500);
  };

IgnisiaConfig.restErrorHandler = restErrorHandler;

const restSuccessHandler: OnRestSuccessHandler<Context> =
  async function restSuccessHandler({ ctx, res, result }) {
    res.status((ctx.status as never) ?? 200);

    switch (ctx.response) {
      case 'json':
        return res.json(result);

      case 'text':
        return res.text(result);

      case 'body':
      case 'buffer':
      default:
        return res.body(result);
    }
  };

IgnisiaConfig.restSuccessHandler = restSuccessHandler;
