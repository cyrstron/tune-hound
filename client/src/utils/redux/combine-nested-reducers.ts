import { Action, combineReducers, Reducer, ReducersMapObject } from 'redux';
import { REDUCER_PATH_SEPARATOR } from '../../consts';

export function getReducerPath(path: string | string[]): string[] {
  return Array.isArray(path) ? path : path.split(REDUCER_PATH_SEPARATOR);
}

export type NestedReducersStore<TState, TAction extends Action<any>> = {
  [Key in keyof TState]?:
    | Reducer<TState[Key] | undefined, TAction>
    | NestedReducersStore<TState[Key], TAction>;
};

export function combineNestedReducers<TState, TAction extends Action<any>>(
  dynamicReducers: NestedReducersStore<Partial<TState>, TAction>,
  staticReducers?: NestedReducersStore<TState, TAction>,
): Reducer<TState, TAction> {
  const reducersMap = (Object.keys(dynamicReducers) as Array<keyof TState>).reduce<
    Partial<ReducersMapObject<TState, TAction>>
  >((combinedReducers, key) => {
    const value = dynamicReducers[key];

    if (!value) return combinedReducers;

    const reducer =
      typeof value === 'function'
        ? (value as Reducer<TState[keyof TState], TAction>)
        : combineNestedReducers(
            value as NestedReducersStore<Partial<TState[keyof TState]>, TAction>,
            staticReducers?.[key] as NestedReducersStore<TState[keyof TState], TAction>,
          );

    combinedReducers[key] = reducer;

    return combinedReducers;
  }, {}) as ReducersMapObject<TState, TAction>;

  return combineReducers<TState>({
    ...(staticReducers ? combineNestedReducers(staticReducers) : {}),
    ...reducersMap,
  });
}
