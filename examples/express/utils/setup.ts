/* eslint-disable import/no-relative-packages */
import express, { type Request, type Response } from 'express';
import { IgnisiaConfig } from '../../../src';
import { injectOn } from './injector';
import type {
  OnRestErrorHandler,
  OnRestSuccessHandler,
} from '../../../src/types/rest';

IgnisiaConfig.routeBy = 'use';

IgnisiaConfig.createRestRouter = function createRestRouter() {
  const router = express.Router();

  injectOn(router);

  return router as never;
};

IgnisiaConfig.getRestBody = async function getRestBody(req: Request) {
  return req.body;
};

IgnisiaConfig.getRestHeader = function getRestHeader(req: Request) {
  return req.headers as never;
};

IgnisiaConfig.getRestQuery = function getRestQuery(req: Request) {
  return req.query;
};

IgnisiaConfig.getRestParams = function getRestParams(req: Request) {
  return req.params;
};

const restErrorHandler: OnRestErrorHandler<Response> =
  async function restErrorHandler({ error, res, ctx }) {
    res.status(ctx?.status ?? error?.status ?? 500).json(error);
  };

IgnisiaConfig.restErrorHandler = restErrorHandler;

const restSuccessHandler: OnRestSuccessHandler<Response> =
  async function restSuccessHandler({ ctx, res, result }) {
    res.status(ctx.status ?? 200);

    switch (ctx.response) {
      case 'json':
        return res.json(result);

      case 'text':
      case 'body':
      case 'buffer':
      default:
        return res.send(result);
    }
  };

IgnisiaConfig.restSuccessHandler = restSuccessHandler;
