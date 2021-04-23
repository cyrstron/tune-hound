import { AppState } from '@app/state';
import { createSelector } from 'reselect';
import { MappedReturnTypes, MergedParameters, CollapseNever } from '@app/types/utils/index';
import { MemoCache } from '@app/utils/memoize/memo-cache';
import { Primitive } from '@app/utils/memoize/utils';
import partialRight from 'lodash/partialRight';

export interface ParamsSelectorOptions {
  cacheSize?: number;
  serializeKey?: (key: any) => Primitive;
}

type OutputSelector<P extends any[], R> = [CollapseNever<P>] extends [never]
  ? never
  : (...args: P) => R;

export function createParamsSelector<
  TSelectors extends
    | ReadonlyArray<(state: AppState, ...args: any[]) => any>
    | readonly [(...args: any[]) => any],
  TCombiner extends (...args: MappedReturnTypes<TSelectors>) => any
>(
  selectors: TSelectors,
  combiner: TCombiner,
  options?: ParamsSelectorOptions,
): OutputSelector<MergedParameters<TSelectors>, ReturnType<TCombiner>> {
  const cache = new MemoCache<any>(combiner, options);

  function paramsSelector(state: AppState, ...params: any[]): ReturnType<TCombiner> {
    let selector: (state: AppState) => ReturnType<TCombiner> = cache.get(params);

    if (!selector) {
      selector = partialRight(createSelector(selectors as any, combiner as any) as any, ...params);

      cache.set(params, selector);
    }

    return selector(state);
  }

  return paramsSelector as any;
}
