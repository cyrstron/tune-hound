import { MergeTuplesArray, ReadonlyTupleToPlain } from './tuples';

export type MappedParameters<T> = {
  [K in keyof T]: T[K] extends (...a: infer A) => any ? A : never;
};

export type MergedParameters<T extends readonly ((...args: any[]) => any)[]> = MergeTuplesArray<
  MappedParameters<ReadonlyTupleToPlain<T>>
>;

export type MappedReturnTypes<TFuncs extends ReadonlyArray<(...args: any[]) => any>> = readonly [
  ...{
    [K in keyof TFuncs]: TFuncs[K] extends (...args: any[]) => infer R ? R : never;
  }
];
