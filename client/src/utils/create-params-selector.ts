import { AppState } from '@app/state';
import { createSelector } from 'reselect';
import { MemoCache } from './memoize/memo-cache';
import { Primitive } from './memoize/utils';

export interface ParamsSelectorOptions {
  cacheSize?: number;
  serializeKey?: (key: any) => Primitive;
}

export type CreateParamsSelector = typeof createSelector extends (...args: infer U) => infer R
  ? typeof createSelector & { (args: U): R & { configure: () => void } }
  : never;

type MaybeReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

type SameTupleInArray<TArray extends any[]> = TArray extends [infer E1, ...(infer E)[]]
  ? E extends E1
    ? E1 extends ReadonlyArray<any>
      ? E1
      : never
    : never
  : never;

type SameFunctionsParamaters<
  TFuncs extends ReadonlyArray<(...args: readonly any[]) => any>
> = SameTupleInArray<
  [
    ...{
      [K in keyof TFuncs]: TFuncs[K] extends (...args: infer P) => any
        ? Parameters<TFuncs[K]>
        : never;
    }
  ]
>;

type ReturnTypesTuple<TFuncs extends ReadonlyArray<(...args: any[]) => any>> = readonly [
  ...{
    [K in keyof TFuncs]: MaybeReturnType<TFuncs[K]>;
  }
];

export function createParamsSelector<
  TSelectors extends
    | ReadonlyArray<(...args: readonly any[]) => any>
    | readonly [(...args: readonly any[]) => any],
  TCombiner extends (...args: ReturnTypesTuple<TSelectors>) => any
>(
  selectors: TSelectors,
  combiner: TCombiner,
  options: ParamsSelectorOptions = {},
): (...args: SameFunctionsParamaters<TSelectors>) => ReturnType<TCombiner> {
  const cache = new MemoCache<any>(combiner, options.cacheSize, options.serializeKey);

  function paramsSelector(
    state: AppState,
    ...params: Primitive[]
  ): ReturnType<typeof createSelector> {
    let selector = cache.get(params);

    if (!selector) {
      selector = createSelector(selectors as any, combiner as any) as (
        ...args: SameFunctionsParamaters<TSelectors>
      ) => ReturnType<TCombiner>;

      cache.set(params, selector);
    }

    return selector(state, ...params);
  }

  return (paramsSelector as any) as (
    ...args: SameFunctionsParamaters<TSelectors>
  ) => ReturnType<TCombiner>;
}
