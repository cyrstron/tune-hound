import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppAction } from '../state/actions';

export function useDispatcher<TActionCreator extends (...args: any[]) => AppAction>(
  actionCreator: TActionCreator,
): (...args: Parameters<TActionCreator>) => void {
  const dispatch = useDispatch();

  return useCallback(
    (...args: Parameters<TActionCreator>) => {
      const action = actionCreator(...args);

      dispatch(action);
    },
    [actionCreator, dispatch],
  );
}
