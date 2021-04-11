import { AppState } from '@app/state';
import { createSelector } from 'reselect';
import { MemoCache } from './memoize/memo-cache';
import { Primitive } from './memoize/utils';

export interface ParamsSelectorOptions {
  cacheSize?: number;
  serializeKey?: (key: any) => Primitive;
}

type IfAny<T, Y, N> = 0 extends 1 & T ? Y : N;

type ReplaceAnyInTuple<T extends any[]> = [
  ...{
    [I in keyof T]: IfAny<T[I], unknown, T[I]>;
  }
];

type ReadonlyToPlain<T extends readonly any[]> = [
  ...{
    [K in keyof T]: T[K];
  }
];

type MappedParametersWithoutAny<T> = {
  [K in keyof T]: T[K] extends (...a: infer A) => any ? ReplaceAnyInTuple<A> : never;
};

type MappedReturnTypes<TFuncs extends ReadonlyArray<(...args: any[]) => any>> = readonly [
  ...{
    [K in keyof TFuncs]: TFuncs[K] extends (...args: any[]) => infer R ? R : never;
  }
];

export function createParamsSelector<
  TSelectors extends ReadonlyArray<(...args: any[]) => any> | readonly [(...args: any[]) => any],
  TCombiner extends (...args: MappedReturnTypes<TSelectors>) => any
>(
  selectors: TSelectors,
  combiner: TCombiner,
  options: ParamsSelectorOptions = {},
): (...args: MergedParameters<TSelectors>) => ReturnType<TCombiner> {
  const cache = new MemoCache<any>(combiner, options.cacheSize, options.serializeKey);

  function paramsSelector(state: AppState, ...params: any[]): ReturnType<TCombiner> {
    let selector = cache.get(params);

    if (!selector) {
      selector = (createSelector(selectors as any, combiner as any) as any) as (
        ...params: any[]
      ) => ReturnType<TCombiner>;

      cache.set(params, selector);
    }

    return selector(state, ...params);
  }

  return paramsSelector as any;
}

type Blank = [
  unknown,
  unknown,
  unknown,
  unknown,
  unknown,
  unknown,
  unknown,
  unknown,
  unknown,
  unknown,
  unknown,
  unknown,
  unknown,
];

type MergeTuple<T1 extends any[], T2 extends any[]> = IsShorter<T1, T2> extends true
  ? [
      ...{
        [K in keyof T2]: T2[K] & (K extends keyof T1 ? T1[K] : unknown);
      }
    ]
  : [
      ...{
        [K in keyof T1]: T1[K] & (K extends keyof T2 ? T2[K] : unknown);
      }
    ];

type MapAny<T extends any[]> = [
  ...{
    [K in keyof T]-?: any;
  }
];

type IsEqualLength<T1 extends any[], T2 extends any[]> = MapAny<T1> extends MapAny<T2>
  ? MapAny<T2> extends MapAny<T1>
    ? true
    : false
  : false;

type IsShorter<T1 extends any[], T2 extends any[]> = IsEqualLength<T1, T2> extends true
  ? false
  : T1 extends []
  ? true
  : T1 extends [...infer T, any]
  ? IsShorter<T, T2>
  : never;

type MergeTuples<T> = T extends [...infer I, infer L]
  ? MergeTuple<MergeTuples<I>, L extends any[] ? L : never>
  : [];

type CollapseNever<T> = unknown extends {
  [K in keyof T]-?: T[K] extends never ? unknown : never;
}[keyof T]
  ? never
  : T;

type ExpandTuple<T, U> = [T] extends [readonly any[]]
  ? U extends readonly any[]
    ? number extends T['length']
      ? [...U, ...T[typeof Infinity][]]
      : U
    : never
  : never;

type MergedParameters<T extends readonly ((...args: any[]) => any)[]> = ExpandTuple<
  Parameters<T[number]>,
  MergeTuples<MappedParametersWithoutAny<ReadonlyToPlain<T>>>
>;

type MergedParameters2<T extends readonly ((...args: any[]) => any)[]> = MergeTuples<
  MappedParametersWithoutAny<ReadonlyToPlain<T>>
>;

type Func = readonly [
  (a: boolean) => boolean,
  (a: boolean, b: string) => string,
  (a: boolean, b: unknown, c: string) => number,
];

type Func2 = [
  (a: boolean) => boolean,
  (a: string, b: string) => string,
  (a: boolean, b: any, c: string) => number,
];

type K = [number, ...any[]] extends [any, ...infer U] ? U : never;

type UnionToTuple<T extends any[]> = [...T];

type nnn = UnionToTuple<[boolean] | [boolean, string]>;

type E = MergeTuples<
  MappedParametersWithoutAny<
    ReadonlyToPlain<
      readonly [(a: string, b: string) => string, (a: string, b: string, c?: string) => number]
    >
  >
>;

type L = IsShorter<
  Parameters<(a: string, b: string, c: string, ...args: any[]) => string>,
  Parameters<(a: string, b: string, c?: string) => number>
>;
type L2 = MergedParameters<Func2>;

type Lala = MergeTuples<
  [
    Parameters<(a: string, b: string, c?: string) => number>,
    Parameters<(a: string, b: string) => string>,
  ]
>;
type Lala123 = MergeTuples<[[number], [boolean, string], [boolean], [boolean, string, string]]>;

type Lala1 = TrimTuple<[string, boolean & string, number, unknown, unknown]>;

type Params1 = MergedParameters2<[(a: string, b: boolean) => string, (...args: any[]) => number]>; // should be [a: string, b: boolean, ...any[]]

// with optional parameters
type Params2 = MergedParameters2<
  [(a: string, b?: boolean) => string, (a: string, b: boolean) => number]
>; // should be  [a: string, b: boolean]

type Params3 = MergedParameters2<
  readonly [(a: string, b: string) => string, (a: string, b: string, c?: string) => number]
>; // should be  [a: string, b: string, c: string | undefined]

// with less precise parameters

type Params4 = MergedParameters<
  [(a: string, b: string) => string, (a: string | number, b: string) => number]
>; // should be  [a: string, b: string]

// with conflicting parameters

type Params5 = MergedParameters2<
  [(a: number, b?: boolean) => string, (a: string, b: boolean) => number]
>; // should be  never

type Params6 = MergedParameters2<
  [
    (a: string, b: number) => string,
    (a: string, b: number, c?: string) => number,
    (a: string, b: number, c: string, ...args: any[]) => number,
  ]
>; // should be  [a: string, b: number, c: string, ...any[]]

type TupleRestValue<T extends any[]> = ((...args: T) => any )extends ((infer U), ...any) => any) ? U : never;

type D = TupleRestValue<[string, number, ...boolean[]]>;
type Q = keyof [string, ...boolean[]];
