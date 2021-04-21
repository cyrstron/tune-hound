import { AppState } from '@app/state';
import { useSelector } from 'react-redux';

export function useParamsSelector<TSelector extends (state: AppState, ...[]: any[]) => any>(
  selector: TSelector,
  ...params: Parameters<TSelector> extends [any, ...infer P] ? P : []
): ReturnType<TSelector> {
  return useSelector((state: AppState) => selector(state, ...params));
}
