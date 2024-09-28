/* eslint-disable import/no-relative-packages */
import './setup';

import { Hono } from 'hono';
import { showRoutes } from 'hono/dev';
import { IgnisiaContext, IgnisiaService } from '../../src';
import { loadedServices } from '../loader';

const router = new Hono();

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

showRoutes(router);

export default {
  fetch: router.fetch,
  port: 3000,
};
