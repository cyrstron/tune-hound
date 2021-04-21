import { useEffect } from 'react';
import { useDispatcher } from '../../../../hooks';
import {
  injectDynamicReducer,
  injectDynamicSaga,
  ejectDynamicReducer,
  ejectDynamicSaga,
} from '../../../../state/root';
import { searchReducer } from '../../state/reducer';

export function useSearchFeatureInit(): void {
  const dipatcher = useDispatcher();
  useEffect(() => {
    dipatcher(injectDynamicReducer, 'search', searchReducer);
    dipatcher(injectDynamicSaga, searchSaga);

    return () => {
      dipatcher(ejectDynamicReducer, 'search');
      dipatcher(ejectDynamicSaga, searchSaga);
    };
  }, []);
}
