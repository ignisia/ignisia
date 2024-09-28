import type { RequestHandler, Router } from 'express';

export function injectOn(router: Router) {
  // eslint-disable-next-line max-params, no-param-reassign
  router.on = function fn(
    this: Router,
    method: string,
    path: string,
    ...handlers: RequestHandler[]
  ) {
    switch (method.toLowerCase()) {
      case 'get':
        return this.get(path, ...handlers);

      case 'post':
        return this.post(path, ...handlers);

      case 'put':
        return this.put(path, ...handlers);

      case 'delete':
        return this.delete(path, ...handlers);

      case 'patch':
        return this.patch(path, ...handlers);

      case 'options':
        return this.options(path, ...handlers);

      case 'head':
        return this.head(path, ...handlers);

      case 'use':
      default:
        return this.use(path, ...handlers);
    }
  };

  return router;
}
