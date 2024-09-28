import type { RecordString, RecordUnknown } from '../../types/common';
import type { StatusCode } from '../../types/rest';

export interface IgnisiaErrorOption {
  errors: RecordUnknown | RecordString | unknown | null;
  status: StatusCode;
  message: string;
  name?: string | null;
}
