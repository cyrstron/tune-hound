import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppAction } from '../state/actions';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useDispatcher() {
  const dispatch = useDispatch();

  return useCallback(
    <TActionCreator extends (...args: any[]) => AppAction>(
      actionCreator: TActionCreator,
      ...args: Parameters<TActionCreator>
    ) => {
      const action = actionCreator(...args);

      dispatch(action);
    },
    [dispatch],
  );
}
