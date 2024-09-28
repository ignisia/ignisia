// eslint-disable-next-line import/no-cycle
import { IgnisiaBroker as Broker } from './broker';
import { IgnisiaEventEmitter as EventEmitter } from './event-emitter';
import { IgnisiaConfig as Config } from './config';

export const IgnisiaEventEmitter = new EventEmitter();

export const IgnisiaBroker = new Broker();

export const IgnisiaConfig = new Config();
