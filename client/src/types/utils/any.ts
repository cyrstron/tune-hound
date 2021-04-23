export type IfAny<T, Y = T, N = T> = 0 extends 1 & T ? Y : N;

export type OverrideAny<T, O = T> = IfAny<T, O>;
