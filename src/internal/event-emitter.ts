import type { IgnisiaEventListener } from '../types/handler';

export class IgnisiaEventEmitter {
  private $maxListeners: number;
  private $emitter: Map<string, Set<IgnisiaEventListener>>;

  constructor(maxListener: number = 100) {
    this.$maxListeners = maxListener;
    this.$emitter = new Map();
  }

  public listenerCount(eventName: string) {
    return this.$emitter.get(eventName)?.size ?? 0;
  }

  public get maxListeners() {
    return this.$maxListeners;
  }

  public set maxListeners(value: number) {
    this.$maxListeners = value;
  }

  public emit(eventName: string, ...values: unknown[]) {
    if (!this.$emitter.has(eventName)) {
      return false;
    }

    this.$emitter.get(eventName)?.forEach?.((listener) => {
      listener(...values);
    });

    return true;
  }

  // eslint-disable-next-line no-use-before-define, @typescript-eslint/no-shadow
  public async emitAsync<T, U = T extends Array<infer T> ? T : T>(
    eventName: string,
    ...values: unknown[]
  ): Promise<U[]> {
    if (!this.$emitter.has(eventName)) {
      return [];
    }

    return Promise.all(
      [...(this.$emitter.get(eventName) ?? [])].map<U>(
        (listener) => listener(...values) as U
      )
    );
  }

  public on(eventName: string, listener: EventListener) {
    const listenerCount = this.listenerCount(eventName);

    if (!this.$emitter.has(eventName)) {
      this.$emitter.set(eventName, new Set());
    }

    if (listenerCount >= this.$maxListeners) return;

    this.$emitter.get(eventName)?.add(listener);
  }

  public off(eventName: string, listener: EventListener) {
    if (!this.$emitter.has(eventName)) return;

    this.$emitter.get(eventName)?.delete(listener);
  }

  public offAll(): void;
  public offAll(eventName: string): void;
  public offAll(eventName?: string) {
    if (eventName) {
      this.$emitter.delete(eventName);
      return;
    }

    this.$emitter.clear();
  }

  public eventNames() {
    return [...this.$emitter.keys()];
  }

  public listeners(eventName: string) {
    return [...(this.$emitter.get(eventName) ?? [])];
  }

  public rawListeners(eventName: string) {
    const listenerSet = new Set<EventListener>();

    if (this.$emitter.has(eventName)) {
      this.$emitter.get(eventName)?.forEach((listener) => {
        listenerSet.add(listener);
      });
    }

    return listenerSet;
  }

  // Aliases
  public addListener = this.on;
  public removeListener = this.off;
  public removeAllListeners = this.offAll;
}
