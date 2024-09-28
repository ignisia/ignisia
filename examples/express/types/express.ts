import 'express';

declare module 'express-serve-static-core' {
  export interface Router {
    on(
      this: Router,
      method: string,
      path: string,
      ...handlers: RequestHandler[]
    ): Router;
  }
}
