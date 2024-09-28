import type { Random } from '../../types/common';
import type {
  GetRestBody,
  GetRestHeader,
  GetRestParams,
  GetRestQuery,
} from '../../types/rest';
import { isNil } from '../../utils/common';
import { IgnisiaError } from '../error';

export class IgnisiaConfig {
  /**
   * Define a method to retrieve the REST body
   */
  private $getRestBody: GetRestBody | null;
  /**
   * Define a method to retrieve the REST params
   */
  private $getRestParams: GetRestParams | null;
  /**
   * Define a method to retrieve the REST header
   */
  private $getRestHeader: GetRestHeader | null;
  /**
   * Define a method to retrieve the REST queries
   */
  private $getRestQuery: GetRestQuery | null;

  constructor() {
    this.$getRestBody = null;
    this.$getRestParams = null;
    this.$getRestHeader = null;
    this.$getRestQuery = null;
  }

  private error(type: string) {
    return new IgnisiaError(
      `Define a method to retrieve the REST ${type} first!`
    );
  }

  private validateGetter(fn: (...args: Random[]) => Random) {
    if (isNil(fn) || typeof fn !== 'function') {
      throw new IgnisiaError('The method should be a function');
    }

    if (fn.length < 1) {
      throw new IgnisiaError('The method should take an argument');
    }
  }

  /**
   * Define a method to retrieve the REST body
   */
  public get getRestBody() {
    if (!this.$getRestBody) {
      throw this.error('body');
    }

    return this.$getRestBody;
  }

  /**
   * Define a method to retrieve the REST body
   */
  public set getRestBody(fn: GetRestBody) {
    this.validateGetter(fn);

    this.$getRestBody = fn;
  }

  /**
   * Define a method to retrieve the REST params
   */
  public get getRestParams() {
    if (isNil(this.$getRestParams)) {
      throw this.error('params');
    }

    return this.$getRestParams;
  }

  /**
   * Define a method to retrieve the REST params
   */
  public set getRestParams(fn: GetRestParams) {
    this.validateGetter(fn);

    this.$getRestParams = fn;
  }

  /**
   * Define a method to retrieve the REST header
   */
  public get getRestHeader() {
    if (isNil(this.$getRestHeader)) {
      throw this.error('header');
    }

    return this.$getRestHeader;
  }

  /**
   * Define a method to retrieve the REST header
   */
  public set getRestHeader(fn: GetRestHeader) {
    this.validateGetter(fn);

    this.$getRestHeader = fn;
  }

  /**
   * Define a method to retrieve the REST queries
   */
  public get getRestQuery() {
    if (isNil(this.$getRestQuery)) {
      throw this.error('query');
    }

    return this.$getRestQuery;
  }

  /**
   * Define a method to retrieve the REST queries
   */
  public set getRestQuery(fn: GetRestQuery) {
    this.validateGetter(fn);

    this.$getRestQuery = fn;
  }
}
