import type { RecordUnknown } from '../../types/common';
import type { StatusCode } from '../../types/rest';
import type { IgnisiaErrorOption } from './types';

export class IgnisiaError extends Error {
  public status: StatusCode;
  public errors: RecordUnknown | unknown | null;

  constructor(err: IgnisiaErrorOption);
  constructor(message: string, status?: StatusCode);
  constructor(err: IgnisiaErrorOption | string, status: StatusCode = 500) {
    if (typeof err === 'string') {
      super(err);
      this.status = status;
      this.name = 'IgnisiaError';
    } else {
      super(err.message);

      this.status = err.status;
      this.errors = err.errors;
      this.name = err.name ?? 'IgnisiaError';
    }
  }

  public toJSON() {
    return {
      errors: this.errors,
      message: this.message,
      name: this.name,
      status: this.status,
    };
  }
}
