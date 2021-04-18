import { AppAction } from '../actions';
import {
  ADD_DYNAMIC_REDUCER,
  CANCEL_DYNAMIC_SAGA,
  INIT_APP,
  REMOVE_DYNAMIC_REDUCER,
  SPAWN_DYNAMIC_SAGA,
} from './consts';

export interface InitAppAction {
  type: typeof INIT_APP;
}

export const initApp = (): InitAppAction => ({
  type: INIT_APP,
});

export interface SpawnDynamicSagaAction {
  type: typeof SPAWN_DYNAMIC_SAGA;
  payload: {
    saga: () => any;
  };
}

export const spawnDynamicSaga = (saga: () => any): SpawnDynamicSagaAction => ({
  type: SPAWN_DYNAMIC_SAGA,
  payload: { saga },
});

export interface CancelDynamicSagaAction {
  type: typeof CANCEL_DYNAMIC_SAGA;
  payload: {
    saga: () => any;
  };
}

export const cancelDynamicSaga = (saga: () => any): CancelDynamicSagaAction => ({
  type: CANCEL_DYNAMIC_SAGA,
  payload: { saga },
});

export interface AddDynamicReducerAction<S = any> {
  type: typeof ADD_DYNAMIC_REDUCER;
  payload: {
    path: string | string[];
    reducer: (state: S, action: AppAction) => S;
  };
}

export const addDynamicReducer = <S>(
  path: string | string[],
  reducer: (state: S, action: AppAction) => S,
): AddDynamicReducerAction<S> => ({
  type: ADD_DYNAMIC_REDUCER,
  payload: {
    path,
    reducer,
  },
});

export interface RemoveDynamicReducerAction {
  type: typeof REMOVE_DYNAMIC_REDUCER;
  payload: {
    path: string | string[];
  };
}

export const removeDynamicReducer = (path: string | string[]): RemoveDynamicReducerAction => ({
  type: REMOVE_DYNAMIC_REDUCER,
  payload: {
    path,
  },
});

export type RootAction =
  | InitAppAction
  | SpawnDynamicSagaAction
  | CancelDynamicSagaAction
  | AddDynamicReducerAction
  | RemoveDynamicReducerAction;
