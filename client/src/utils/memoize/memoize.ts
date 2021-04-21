import { MemoCache } from './memo-cache';

export interface MemoizeOptions {
  cacheSize?: number;
}

export function memoize<TFunc extends (...args: any[]) => ReturnType<TFunc>>(
  func: TFunc,
  options: MemoizeOptions = {},
): (...args: Parameters<TFunc>) => ReturnType<TFunc> {
  const cache = new MemoCache<ReturnType<TFunc>>(func, options);

  function memoized(...args: Parameters<TFunc>): ReturnType<TFunc> {
    const cached = cache.get(args);

    if (cached) return cached;

    const value = func(...args);

    cache.set(args, value);

    return value;
  }

  return memoized;
}
