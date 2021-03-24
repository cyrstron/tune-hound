import { AppState } from '@app/state';
import { useRef } from 'react';
import { useSelector } from 'react-redux';

interface ParamsCache<T> {
  [key: string]: ParamsCache<T> | ((state: AppState) => T) | undefined;
}

export function useSelectorCreator<T>(
  selectorCreator: (...[]: any[]) => (state: AppState) => T,
  ...params: Array<string | number | undefined>
): T {
  const cache = useRef<ParamsCache<T>>({});

  let selector = params.reduce<ParamsCache<T> | ((state: AppState) => T) | undefined>(
    (value, param) => (typeof value === 'object' ? value[`${param}`] : value),
    cache.current,
  ) as ((state: AppState) => T) | undefined;

  if (!selector) {
    selector = selectorCreator(...params);

    params.reduce<ParamsCache<T>>((value, param, index) => {
      const isLast = index === params.length - 1;
      const key = `${param}`;

      value[key] = isLast ? selector : value[key] ?? {};

      return value[key] as ParamsCache<T>;
    }, cache.current);
  }

  return useSelector(selector);
}
