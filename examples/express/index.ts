/* eslint-disable import/no-relative-packages */
import './utils/setup';

import express from 'express';
import { IgnisiaContext, IgnisiaService } from '../../src';
import { injectOn } from './utils/injector';
import { loadedServices } from '../loader';

const app = express();

const router = express.Router();

injectOn(router);

const ctx = new IgnisiaContext({
  body: null,
  params: null,
  header: null,
  meta: null,
  query: null,
  rest: null,
});

const services = loadedServices.map(
  (service) =>
    new IgnisiaService({
      router: router as never,
      service,
      ctx,
      servicePath: '',
      middlewares: [],
    })
);

services.forEach((service) => service.onStarted());

app.use(router);

app.listen(3000);
