import { AppState } from '@app/state';
import { createSelector } from 'reselect';
import { MemoCache } from './memoize/memo-cache';
import { Primitive } from './memoize/utils';

export interface ParamsSelectorOptions {
  cacheSize?: number;
  serializeKey?: (key: any) => Primitive;
}

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void
  ? I
  : never;

type IsUnion<T> = [T] extends [UnionToIntersection<T>] ? false : true;

type OverrideReturnTypes<
  TFuncs extends ReadonlyArray<(...args: any[]) => any>,
  TReturn = any
> = readonly [
  ...{
    [K in keyof TFuncs]: TFuncs[K] extends (...args: infer P) => any
      ? (...args: P) => TReturn
      : never;
  }
];

type FilterUnmutualProps<TTuple extends readonly any[]> = {
  [K in keyof TTuple]: IsUnion<TTuple[K]> extends false
    ? TTuple[number] extends TTuple[K]
      ? TTuple[K]
      : never
    : never;
};

type MutualParameters<TFuncs extends ReadonlyArray<(...args: any) => any>> = FilterUnmutualProps<
  OverrideReturnTypes<TFuncs>
>[number] extends (...args: infer P) => any
  ? P
  : never;

type ReturnTypesTuple<TFuncs extends ReadonlyArray<(...args: any[]) => any>> = readonly [
  ...{
    [K in keyof TFuncs]: TFuncs[K] extends (...args: any[]) => infer R ? R : never;
  }
];

export function createParamsSelector<
  TSelectors extends ReadonlyArray<(...args: any[]) => any> | readonly [(...args: any[]) => any],
  TCombiner extends (...args: ReturnTypesTuple<TSelectors>) => any
>(
  selectors: TSelectors,
  combiner: TCombiner,
  options: ParamsSelectorOptions = {},
): (...args: MutualParameters<TSelectors>) => ReturnType<TCombiner> {
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

  return (paramsSelector as any) as (
    ...args: MutualParameters<TSelectors>
  ) => ReturnType<TCombiner>;
}
