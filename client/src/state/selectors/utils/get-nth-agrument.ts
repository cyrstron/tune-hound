import { NTuple } from '@app/utils/types/tuples';

export function getNthArgument<N extends number>(n: N) {
  return <T = string>(): ((...args: NTuple<N, [], T>) => T) => (...args: any[]) => args[n - 1];
}
