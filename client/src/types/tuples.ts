import { OverrideAny } from './any';

export type NTuple<N extends number, T extends any[] = [], L = any> = T['length'] extends N
  ? T
  : NTuple<N, [L, ...T]>;

export type ReadonlyTupleToPlain<T extends readonly any[]> = [
  ...{
    [K in keyof T]: T[K];
  }
];

export type HasDistinctValues<T extends any[]> = Required<T> extends [any, ...any[]] ? true : false;

export type MergeTuplesHeads<T1 extends any[], T2 extends any[]> = T1 extends []
  ? T2[0]
  : T2 extends []
  ? T1[0]
  : OverrideAny<T1[0], T2[0]> & OverrideAny<T2[0], T1[0]>;

export type WeakShift<T extends any[]> = Required<T> extends [any, ...any[]]
  ? T extends [any?, ...infer R1]
    ? R1
    : T
  : T;

export type Unshift<T extends any[], E> = undefined extends E ? [E?, ...T] : [E, ...T];

export type MergeTuples<T1 extends any[], T2 extends any[]> = Required<T1> | Required<T2> extends []
  ? []
  : HasDistinctValues<T1> | HasDistinctValues<T2> extends false
  ? MergeTuplesHeads<T1, T2>[]
  : Unshift<MergeTuples<WeakShift<T1>, WeakShift<T2>>, MergeTuplesHeads<T1, T2>>;

export type MergeTuplesArray<T> = T extends [...infer I, infer L]
  ? MergeTuples<MergeTuplesArray<I>, L extends any[] ? L : never>
  : [];

export type CollapseNever<T> = unknown extends {
  [K in keyof T]: [OverrideAny<T[K], unknown>] extends [never] ? unknown : never;
}[keyof T]
  ? never
  : T;
