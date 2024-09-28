import type {
  AnyRouter,
  CreateRouterInner,
  DefaultDataTransformer,
  DefaultErrorShape,
  initTRPC,
  RootConfig,
} from '@trpc/server';
import type { FetchHandlerRequestOptions } from '@trpc/server/adapters/fetch';
import type {
  IgnisiaTrpcMutationCallRecord,
  IgnisiaTrpcQueryCallRecord,
  Middleware,
} from './common';

export type IgnisiaTrpcRouter = CreateRouterInner<
  RootConfig<{
    ctx: object;
    meta: object;
    errorShape: DefaultErrorShape;
    transformer: DefaultDataTransformer;
  }>,
  // @ts-expect-error no-defined-name-props
  IgnisiaTrpcMutationCallRecord & IgnisiaTrpcQueryCallRecord
>;

type Trpc = ReturnType<(typeof initTRPC)['create']>;

export type TrpcProcedure = Trpc['procedure'];

export interface IgnisiaTrpc {
  instance: Trpc;
  router: IgnisiaTrpcRouter;
  procedure: TrpcProcedure;
}

export interface IgnisiaTrpcOption
  extends Partial<
    Omit<
      FetchHandlerRequestOptions<AnyRouter>,
      'req' | 'createContext' | 'router'
    >
  > {
  middlewares?: Middleware[];
}
