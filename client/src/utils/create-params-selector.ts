import { AppSelector, AppSelectorCreator, AppState } from '@app/state';
import { createSelector, ParametricSelector } from 'reselect';
import { memoize, MemoizeOptions } from './memoize';

export type P

export function createParamsSelector<TFunc extends AppSelectorCreator<TFunc>>(
  ...args: [...ParametricSelector<AppState, unknown, unknown>[], TFunc]
): ReturnType<typeof createSelector>;
export function createParamsSelector<TFunc extends AppSelectorCreator<TFunc>>(
  ...args: [...ParametricSelector<AppState, unknown, unknown>[], TFunc, MemoizeOptions]
): ReturnType<typeof createSelector> {
  const [lastArg] = args.pop();

  let options = {};
  let selectorCreator: TFunc;

  if (typeof lastArg === 'function') {
    selectorCreator = lastArg;
  } else {
    options = lastArg;
  }

  const memoized = memoize(selectorCreator);

  return createSelector(...params, memoized);
}
