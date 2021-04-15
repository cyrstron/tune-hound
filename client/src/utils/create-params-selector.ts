import { AppState } from '@app/state';
import { createSelector } from 'reselect';
import { MemoCache } from './memoize/memo-cache';
import { Primitive } from './memoize/utils';

export interface ParamsSelectorOptions {
  cacheSize?: number;
  serializeKey?: (key: any) => Primitive;
}

type OverrideAny<T, Y = T> = 0 extends 1 & T ? Y : T;

type ReadonlyToPlain<T extends readonly any[]> = [
  ...{
    [K in keyof T]: T[K];
  }
];

type MappedParameters<T> = {
  [K in keyof T]: T[K] extends (...a: infer A) => any ? A : never;
};

type HasDistinctValues<T extends any[]> = Required<T> extends [any, ...any[]] ? true : false;

type MergeTuplesHeads<T1 extends any[], T2 extends any[]> = T1 extends []
  ? T2[0]
  : T2 extends []
  ? T1[0]
  : OverrideAny<T1[0], T2[0]> & OverrideAny<T2[0], T1[0]>;

type WeakShift<T extends any[]> = Required<T> extends [any, ...any[]]
  ? T extends [any?, ...infer R1]
    ? R1
    : T
  : T;

type Unshift<T extends any[], E> = undefined extends E ? [E?, ...T] : [E, ...T];

type MergeTuples<T1 extends any[], T2 extends any[]> = Required<T1> | Required<T2> extends []
  ? []
  : HasDistinctValues<T1> | HasDistinctValues<T2> extends false
  ? MergeTuplesHeads<T1, T2>[]
  : Unshift<MergeTuples<WeakShift<T1>, WeakShift<T2>>, MergeTuplesHeads<T1, T2>>;

type MergeTuplesArray<T> = T extends [...infer I, infer L]
  ? MergeTuples<MergeTuplesArray<I>, L extends any[] ? L : never>
  : [];

type CollapseNever<T> = unknown extends {
  [K in keyof T]: OverrideAny<T[K], unknown> extends never ? unknown : never;
}[keyof T]
  ? never
  : T;

type MergedParameters<T extends readonly ((...args: any[]) => any)[]> = CollapseNever<
  MergeTuplesArray<MappedParameters<ReadonlyToPlain<T>>>
>;

type MappedReturnTypes<TFuncs extends ReadonlyArray<(...args: any[]) => any>> = readonly [
  ...{
    [K in keyof TFuncs]: TFuncs[K] extends (...args: any[]) => infer R ? R : never;
  }
];

type OutputSelector<P extends any[], R> = [P] extends [never] ? never : (...args: P) => R;

export function createParamsSelector<
  TSelectors extends ReadonlyArray<(...args: any[]) => any> | readonly [(...args: any[]) => any],
  TCombiner extends (...args: MappedReturnTypes<TSelectors>) => any
>(
  selectors: TSelectors,
  combiner: TCombiner,
  options: ParamsSelectorOptions = {},
): OutputSelector<MergedParameters<TSelectors>, ReturnType<TCombiner>> {
  const cache = new MemoCache<any>(combiner, options.cacheSize, options.serializeKey);

  function paramsSelector(state: AppState, ...params: any[]): ReturnType<TCombiner> {
    let selector = cache.get(params);

    if (!selector) {
      selector = (createSelector(selectors as any, combiner as any) as any) as (
        ...params: any[]
      ) => ReturnType<TCombiner>;

      cache.set(params, selector);
    }

    return selector(state, ...params);
  }

  return paramsSelector as any;
}
