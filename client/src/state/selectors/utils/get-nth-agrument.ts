import { AppState } from '@app/state';
import { NTuple } from '@app/types/utils';

export const getState = (state: AppState): AppState => state;

export function getNthParam<N extends number>(n: N) {
  return <T = string>(): ((state: AppState, ...args: NTuple<N, [], T>) => T) => (
    _state,
    ...args: any[]
  ) => args[n - 1];
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function getFirstParam<P = string>() {
  return getNthParam(1)<P>();
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function getSecondParam<P = string>() {
  return getNthParam(2)<P>();
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function getThirdParam<P = string>() {
  return getNthParam(3)<P>();
}
