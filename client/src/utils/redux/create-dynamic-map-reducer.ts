import { Action, Reducer } from 'redux';

export type MapReducersStore<
  TItemState,
  TAction extends Action,
  TKey extends string | number | symbol = string
> = Readonly<Partial<Record<TKey, Reducer<TItemState, TAction>>>>;

export interface MapState<TItemState = any, TKey extends string | number | symbol = string> {
  ids: TKey[];
  map: Partial<Record<TKey, TItemState>>;
}

export const mapReducerInitialState: MapState = {
  ids: [],
  map: {},
};

export function getMapReducerInitialState<
  TItemState = any,
  TKey extends string | number | symbol = string
>(): MapState<TItemState, TKey> {
  return mapReducerInitialState as MapState<TItemState, TKey>;
}

export function createDynamicMapReducer<
  TItemState,
  TAction extends Action,
  TKey extends string | number | symbol = string
>(
  manageReducersMap: (
    reducers: MapReducersStore<TItemState, TAction, TKey>,
    action: TAction,
  ) => MapReducersStore<TItemState, TAction, TKey>,
): Reducer<MapState<TItemState, TKey>, TAction> {
  let currentReducers = {} as MapReducersStore<TItemState, TAction, TKey>;

  return function (
    state: MapState<TItemState, TKey> = getMapReducerInitialState<TItemState, TKey>(),
    action: TAction,
  ): MapState<TItemState, TKey> {
    const newReducers = manageReducersMap(currentReducers, action);

    const newState: MapState<TItemState, TKey> =
      newReducers === currentReducers
        ? state
        : {
            ids: Object.keys(newReducers) as TKey[],
            map: {},
          };

    currentReducers = newReducers;

    const newMap: Partial<Record<TKey, TItemState>> = (Object.entries(currentReducers) as [
      TKey,
      Reducer<TItemState, TAction>,
    ][]).reduce((newMap, [key, reducer]) => {
      const subState = reducer(state.map[key], action);

      if (subState === state.map[key]) return newMap;

      if (newMap === state.map) {
        newMap = { ...newMap };
      }

      newMap[key] = subState;

      return newMap;
    }, newState.map);

    return newMap === newState.map
      ? newState
      : {
          ...newState,
          map: newMap,
        };
  };
}
