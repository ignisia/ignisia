import path from 'node:path';
import { IgnisiaConfig, type IgnisiaContext } from '../../internal';
import type { AnyIgnisiaAction } from '../../types/action';
import type { Middleware } from '../../types/common';
import type { RestRouter } from '../../types/rest';
import type {
  CreateIgnisiaService,
  CreateIgnisiaServiceOption,
  IgnisiaService as Service,
} from '../../types/service';
import { getRestPath, getServiceName } from '../../utils/common';
import { IgnisiaServiceAction } from '../action';
import { IgnisiaServiceEvent } from '../event';
import { IgnisiaServiceRest } from '../rest';
import { loadService } from './helper';

export class IgnisiaService {
  public readonly servicePath: string;
  public readonly serviceName: string;
  public readonly restPath: string;
  public readonly mainRouter: RestRouter;
  public readonly actions: IgnisiaServiceAction[];
  public readonly events: IgnisiaServiceEvent[];
  public readonly rests: IgnisiaServiceRest[];
  public readonly middlewares: Middleware[];
  public router: RestRouter | null;

  private readonly ctx: IgnisiaContext;
  private readonly service: Service;
  private isStarted: boolean;

  constructor(options: CreateIgnisiaServiceOption) {
    this.service = options.service;
    this.servicePath = options.servicePath;
    this.ctx = options.ctx;
    this.serviceName = getServiceName(this.service);
    this.restPath = getRestPath(this.service);
    this.mainRouter = options.router;
    this.isStarted = false;

    this.actions = [];
    this.events = [];
    this.rests = [];
    this.middlewares = this.service.middlewares ?? [];

    if (options.middlewares) {
      this.middlewares.unshift(...options.middlewares);
    }

    this.router = null;

    Promise.all([this.loadServiceActions(), this.loadServiceEvents()]);
  }

  private async loadRest(action: AnyIgnisiaAction) {
    if (!this.router) {
      this.router = IgnisiaConfig.createRestRouter();
    }

    const restInstance = new IgnisiaServiceRest({
      action,
      router: this.router,
      service: this.service,
      middlewares: this.middlewares,
    });

    this.rests.push(restInstance);
  }

  private async loadServiceActions() {
    if (!this.service.actions) return this.actions;

    // eslint-disable-next-line guard-for-in, no-restricted-syntax
    for (const actionAlias in this.service.actions) {
      const action = this.service.actions[actionAlias];

      if (action.rest) this.loadRest(action);

      const instance = new IgnisiaServiceAction({
        action,
        actionAlias,
        serviceName: this.serviceName,
      });

      this.actions.push(instance);
    }

    return this.actions;
  }

  private async loadServiceEvents() {
    if (!this.service.events) return this.events;

    // eslint-disable-next-line guard-for-in, no-restricted-syntax
    for (const eventAlias in this.service.events) {
      const event = this.service.events[eventAlias];

      const instance = new IgnisiaServiceEvent({
        event,
        eventAlias,
        serviceName: this.serviceName,
      });

      this.events.push(instance);
    }

    return this.events;
  }

  private assignRestRoute() {
    if (!this.router) return;

    this.mainRouter[IgnisiaConfig.routeBy](`/${this.restPath}`, this.router);
  }

  public onStarted() {
    if (this.isStarted) return;

    this.assignRestRoute();
    this.service.onStarted?.(this.ctx);
    this.isStarted = true;
  }

  public static async create(options: CreateIgnisiaService) {
    const servicePath = path.resolve(options.sourcePath, options.servicePath);
    const serviceFile = await loadService(servicePath);

    const service = new IgnisiaService({
      router: options.router,
      ctx: options.ctx,
      servicePath,
      service: serviceFile,
      middlewares: options.middlewares,
    });

    return service;
  }
}
