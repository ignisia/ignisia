// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Random = any;

export type RecordUnknown = Record<string, unknown>;

export type RecordString = Record<string, string>;

export type Middleware = (...args: Random[]) => unknown;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IgnisiaTrpcQueryCallRecord {
  // Extend the interface with other modules
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IgnisiaTrpcMutationCallRecord {
  // Extend the interface with other modules
}
