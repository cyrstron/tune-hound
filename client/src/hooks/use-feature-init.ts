import { AppAction } from '@app/state/actions';
import { ejectDynamicReducer, injectDynamicReducer, injectDynamicSaga } from '@app/state/root';
import { useEffect } from 'react';
import { Reducer } from 'redux';
import { useDispatcher } from './use-dispatcher';

export interface ReducerInitProps {
  reducer: Reducer<any, AppAction>;
  path: string | string[];
}

export interface UseFeatureInitProps {
  state?: ReducerInitProps;
  saga?: () => any;
}

export function useFeatureInit({ saga, state }: UseFeatureInitProps): void {
  const dispatcher = useDispatcher();

  useEffect(() => {
    if (state) {
      dispatcher(injectDynamicReducer, state.path, state.reducer);
    }
    if (saga) {
      dispatcher(injectDynamicSaga, saga);
    }

    return () => {
      if (state) {
        dispatcher(ejectDynamicReducer, state.path);
      }
      if (saga) {
        dispatcher(injectDynamicSaga, saga);
      }
    };
  }, []);
  if (state) {
  }
}
