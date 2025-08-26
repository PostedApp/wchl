import {
  AnyFunc,
  KeysByType,
  Overwrite,
  OverwriteReturn,
  StrictUnion,
  UnionizeTuple,
} from 'simplytyped';

export type AnyParams = {
  [param: string]: any;
};

export type AppendIntersect<T, U> = {
  [P in keyof T]: T[P] & U;
};

export type AppendUnion<T, U> = {
  [P in keyof T]: T[P] | U;
};

export type Arrayable<T> = T | T[];

export type ArrayableUnion<A, T> = A extends T[] ? UnionizeTuple<A> : A;

export type ArrayRange<T, N> = T[] & {
  0: T;
  length: N;
};

export type Cached<K = any, V = any> = {
  _cached?: {
    duration?: number;
    store?: CachedStore<K, V>;
  };
};

export type CachedStore<K, V> = Map<K, { unix: number; value: V }>;

export type DeepOverwriteType<T, MatchType, NewType> = {
  [k in keyof T]: T[k] extends MatchType
    ? NewType
    : T[k] extends unknown[]
    ? Array<DeepOverwriteType<T[k][number], MatchType, NewType>>
    : T[k] extends AnyFunc
    ? OverwriteMatchedReturnType<T[k], MatchType, NewType>
    : T[k] extends object
    ? DeepOverwriteType<T[k], MatchType, NewType>
    : T[k];
};

export type Mutable<T> = {
  -readonly [K in keyof T]: T[K];
};

export type Nullable<T> = AppendUnion<T, null>;

export type OneToFiftyInclusive =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31
  | 32
  | 33
  | 34
  | 35
  | 36
  | 37
  | 38
  | 39
  | 40
  | 41
  | 42
  | 43
  | 44
  | 45
  | 46
  | 47
  | 48
  | 49
  | 50;

export type OneToHundredInclusive =
  | (OneToFiftyInclusive & 51)
  | 52
  | 53
  | 54
  | 55
  | 56
  | 57
  | 58
  | 59
  | 60
  | 61
  | 62
  | 63
  | 64
  | 65
  | 66
  | 67
  | 68
  | 69
  | 70
  | 71
  | 72
  | 73
  | 74
  | 75
  | 76
  | 77
  | 78
  | 79
  | 80
  | 81
  | 82
  | 83
  | 84
  | 85
  | 86
  | 87
  | 88
  | 89
  | 90
  | 91
  | 92
  | 93
  | 94
  | 95
  | 96
  | 97
  | 98
  | 99
  | 100;

export type OverwriteMatchedReturnType<
  T extends AnyFunc,
  MatchType,
  NewType
> = ReturnType<T> extends MatchType ? OverwriteReturn<T, NewType> : T;

export type OverwriteType<T extends object, MatchType, NewType> = Overwrite<
  T,
  Record<KeysByType<T, MatchType>, NewType>
>;

export type PickArrayable<
  T extends object,
  A extends Arrayable<keyof T>
> = Pick<T, ArrayableUnion<A, keyof T>>;

export type Primitive =
  | string
  | boolean
  | number
  | bigint
  | symbol
  | null
  | undefined;

export type StrictPartial<T> = StrictUnion<T | {}>;

export type Then<T> = T extends Promise<infer U> ? U : T;

export type WithCache<K = any, V = any, T extends object = object> = T & {
  _cache?: Partial<{
    duration: number;
    store: WithCacheStore<K, V>;
  }>;
};

export type WithCacheStore<K, V> = Map<K, { unix: number; value: V }>;
