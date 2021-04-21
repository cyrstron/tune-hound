import { combineReducers, Reducer, ReducersMapObject } from 'redux';
import { AppState } from '.';
import { REDUCER_PATH_SEPARATOR } from '../consts';
import { AppAction } from './actions';

export function getReducerPath(path: string | string[]): string[] {
  return Array.isArray(path) ? path : path.split(REDUCER_PATH_SEPARATOR);
}

export type ReducersStore<State> = {
  [Key in keyof State]?: Reducer<State[Key] | undefined, AppAction> | ReducersStore<State[Key]>;
};

export function combineStoredReducers<TState = AppState>(
  dynamicReducers: ReducersStore<Partial<TState>>,
  staticReducers?: ReducersStore<TState>,
): Reducer<TState, AppAction> {
  const reducersMap = (Object.keys(dynamicReducers) as Array<keyof TState>).reduce<
    Partial<ReducersMapObject<TState, AppAction>>
  >((combinedReducers, key) => {
    const value = dynamicReducers[key];

    if (!value) return combinedReducers;

    const reducer =
      typeof value === 'function'
        ? (value as Reducer<TState[keyof TState], AppAction>)
        : combineStoredReducers(
            value as ReducersStore<Partial<TState[keyof TState]>>,
            staticReducers?.[key] as ReducersStore<TState[keyof TState]>,
          );

    combinedReducers[key] = reducer;

    return combinedReducers;
  }, {}) as ReducersMapObject<TState, AppAction>;

  return combineReducers<TState>({
    ...(staticReducers ? combineStoredReducers(staticReducers) : {}),
    ...reducersMap,
  });
}
