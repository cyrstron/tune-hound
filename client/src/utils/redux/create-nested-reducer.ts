import { Action, Reducer } from 'redux';

export type ReducersStore<TState, TAction extends Action> = Record<
  keyof TState,
  Reducer<TState[keyof TState], TAction>
>;

export function createDynamicNestedReducer<TState, TAction extends Action>(
  initialReducers: ReducersStore<TState, TAction>,
  initialState: TState,
  manageReducers: (
    reducers: ReducersStore<TState, TAction>,
    action: TAction,
  ) => ReducersStore<TState, TAction>,
): Reducer<TState, TAction> {
  const currentReducers: ReducersStore<TState, TAction> = initialReducers;

  return function (state: TState = initialState, action: TAction): TState {
    const newReducers = manageReducers(currentReducers, action);

    const newState: Partial<TState> = newReducers === currentReducers ? state : {};

    return (Object.entries(newReducers) as [
      keyof TState,
      Reducer<TState[keyof TState], TAction>,
    ][]).reduce((newState, [key, reducer]) => {
      const subState = reducer(state[key], action);

      if (subState === state[key]) return newState;

      if (newState === state) {
        newState = { ...newState };
      }

      newState[key] = subState;

      return newState;
    }, newState) as TState;
  };
}
