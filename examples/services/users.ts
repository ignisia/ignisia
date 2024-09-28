/* eslint-disable import/no-relative-packages */
import type { IgnisiaAction } from '../../src/types/action';
import type { IgnisiaService } from '../../src/types/service';

const find = {
  rest: 'GET /:id',
  async handler(ctx) {
    ctx.response = 'text';

    return ctx.request.params?.id;
  },
} satisfies IgnisiaAction;

const create = {
  rest: 'POST /',
  async handler(ctx) {
    ctx.response = 'text';

    return '';
  },
} satisfies IgnisiaAction;

const service = {
  name: 'user',
  actions: {
    find,
    create,
  },
} satisfies IgnisiaService;

export default service;
