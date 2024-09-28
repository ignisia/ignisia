import { IgnisiaBroker as Broker } from './broker';
import { IgnisiaEventEmitter as EventEmitter } from './event-emitter';

export const IgnisiaEventEmitter = new EventEmitter();

export const IgnisiaBroker = new Broker();
