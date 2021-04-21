import { AppAction } from '../actions';
import {
  INJECT_DYNAMIC_REDUCER,
  EJECT_DYNAMIC_REDUCER,
  INJECT_DYNAMIC_SAGA,
  INIT_APP,
  EJECT_DYNAMIC_SAGA,
} from './consts';

export interface InitAppAction {
  type: typeof INIT_APP;
}

export const initApp = (): InitAppAction => ({
  type: INIT_APP,
});

export interface InjectDynamicSagaAction {
  type: typeof INJECT_DYNAMIC_SAGA;
  payload: {
    saga: () => any;
  };
}

export const injectDynamicSaga = (saga: () => any): InjectDynamicSagaAction => ({
  type: INJECT_DYNAMIC_SAGA,
  payload: { saga },
});

export interface EjectDynamicSagaAction {
  type: typeof EJECT_DYNAMIC_SAGA;
  payload: {
    saga: () => any;
  };
}

export const ejectDynamicSaga = (saga: () => any): EjectDynamicSagaAction => ({
  type: EJECT_DYNAMIC_SAGA,
  payload: { saga },
});

export interface InjectDynamicReducerAction<S = any> {
  type: typeof INJECT_DYNAMIC_REDUCER;
  payload: {
    path: string | string[];
    reducer: (state: S, action: AppAction) => S;
  };
}

export const injectDynamicReducer = <S>(
  path: string | string[],
  reducer: (state: S, action: AppAction) => S,
): InjectDynamicReducerAction<S> => ({
  type: INJECT_DYNAMIC_REDUCER,
  payload: {
    path,
    reducer,
  },
});

export interface EjectDynamicReducerAction {
  type: typeof EJECT_DYNAMIC_REDUCER;
  payload: {
    path: string | string[];
  };
}

export const ejectDynamicReducer = (path: string | string[]): EjectDynamicReducerAction => ({
  type: EJECT_DYNAMIC_REDUCER,
  payload: {
    path,
  },
});

export type RootAction =
  | InitAppAction
  | InjectDynamicSagaAction
  | EjectDynamicSagaAction
  | InjectDynamicReducerAction
  | EjectDynamicReducerAction;
