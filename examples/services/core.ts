/* eslint-disable import/no-relative-packages */
import type { IgnisiaAction } from '../../src/types/action';
import type { IgnisiaService } from '../../src/types/service';

const list = {
  rest: 'GET /',
  async handler(ctx) {
    ctx.response = 'text';

    return '';
  },
} satisfies IgnisiaAction;

const service = {
  name: '',
  actions: {
    list,
  },
} satisfies IgnisiaService;

export default service;
