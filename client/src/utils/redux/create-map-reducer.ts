import { Action, Reducer } from 'redux';

export type MapReducersStore<
  TItemState,
  TAction extends Action,
  TKey extends string | number | symbol = string
> = Array<{ key: TKey; reducer: Reducer<TItemState | undefined, TAction> }>;

export interface MapState<TItemState = any, TKey extends string | number | symbol = string> {
  keys: TKey[];
  map: Partial<Record<TKey, TItemState>>;
}

export const mapReducerInitialState: MapState = {
  keys: [],
  map: {},
};

export function getMapReducerInitialState<
  TItemState = any,
  TKey extends string | number | symbol = string
>(): MapState<TItemState, TKey> {
  return mapReducerInitialState as MapState<TItemState, TKey>;
}

export function createMapReducer<
  TItemState,
  TAction extends Action,
  TKey extends string | number | symbol = string
>(
  metaReducer: (
    reducers: Readonly<MapReducersStore<TItemState, TAction, TKey>>,
    action: TAction,
  ) => MapReducersStore<TItemState, TAction, TKey>,
): Reducer<MapState<TItemState, TKey> | undefined, TAction> {
  let currentReducers: MapReducersStore<TItemState, TAction, TKey> = [];

  return function (
    state: MapState<TItemState, TKey> = getMapReducerInitialState<TItemState, TKey>(),
    action: TAction,
  ): MapState<TItemState, TKey> {
    const newReducers = metaReducer(currentReducers, action);

    const newState: MapState<TItemState, TKey> =
      newReducers === currentReducers
        ? state
        : {
            keys: Object.keys(newReducers) as TKey[],
            map: {},
          };

    currentReducers = newReducers;

    const newMap: Partial<Record<TKey, TItemState>> = currentReducers.reduce(
      (newMap, { key, reducer }) => {
        const subState = reducer(state.map[key], action);

        if (subState === state.map[key]) return newMap;

        if (newMap === state.map) {
          newMap = { ...newMap };
        }

        newMap[key] = subState;

        return newMap;
      },
      newState.map,
    );

    return newMap === newState.map
      ? newState
      : {
          ...newState,
          map: newMap,
        };
  };
}
