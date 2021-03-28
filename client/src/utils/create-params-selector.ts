import { AppSelector, AppSelectorCreator, AppState } from '@app/state';
import { createSelector, ParametricSelector } from 'reselect';
import { memoize, MemoizeOptions } from './memoize';

export interface ParamsSelectorOptions {
  cacheSize?: number;
}

// export function createParamsSelector<TFunc extends AppSelectorCreator<TFunc>>(
//   ...args: [...ParametricSelector<AppState, unknown, unknown>[], TFunc]
// ): ReturnType<typeof createSelector>;
// export function createParamsSelector<TFunc extends AppSelectorCreator<TFunc>>(
//   ...args: [...ParametricSelector<AppState, unknown, unknown>[], TFunc, MemoizeOptions]
// ): ReturnType<typeof createSelector> {
//   const [lastArg] = args.pop();

//   let options = {};
//   let selectorCreator: TFunc;

//   if (typeof lastArg === 'function') {
//     selectorCreator = lastArg;
//   } else {
//     options = lastArg;
//   }

//   const memoized = memoize(selectorCreator);

//   return createSelector(...params, memoized);
// }

export function createParamsSelector(
  ...args:
    | Parameters<typeof createSelector>
    | [...Parameters<typeof createSelector>, ParamsSelectorOptions]
) {
  const lastArg = args.pop();

  let options: ParamsSelectorOptions = {};
  if (typeof lastArg === 'object') {
    options = lastArg as ParamsSelectorOptions;
  }

  const selector = memoize((...params: any[]) => createSelector());

  function paramsSelector(state: AppState, ...params: any[]) {}
}
