import { AppSelector } from '@app/state';
import { useSelector } from 'react-redux';

export function useSelectorCreator<
  TFunc extends (...[]: any[]) => AppSelector<ReturnType<ReturnType<TFunc>>>
>(selectorCreator: TFunc, ...params: Parameters<TFunc>): ReturnType<ReturnType<TFunc>> {
  const selector = selectorCreator(...params);

  return useSelector(selector);
}
