export const SYMBOL_UNDEFINED = Symbol('undefined');
export const SYMBOL_NULL = Symbol('null');
export const SYMBOL_FALSE = Symbol('false');
export const SYMBOL_TRUE = Symbol('true');
export const SYMBOL_IS_STORE = Symbol('isStore');

export type Primitive = string | number | boolean | null | undefined;
export type IndexPrimitive = string | number | symbol;

export function getSafeKey<TKey = Primitive>(
  key: TKey | Primitive,
  serializeKey?: (key: TKey | Primitive) => Primitive,
): IndexPrimitive {
  const serializedKey = serializeKey ? serializeKey(key) : (key as Primitive);

  if (typeof serializedKey === 'string' || typeof serializedKey === 'number') {
    return serializedKey;
  } else if (typeof serializedKey === 'boolean') {
    return serializedKey ? SYMBOL_TRUE : SYMBOL_FALSE;
  } else if (serializedKey === undefined) {
    return SYMBOL_UNDEFINED;
  } else {
    return SYMBOL_NULL;
  }
}

export function safeSet<TObject = any, TValue = any>(
  obj: TObject,
  path: any[] | readonly any[],
  value: TValue,
  serializeKey?: (key: any) => Primitive,
): void {
  const params = path.slice(0, -1);
  const lastKey = getSafeKey(path[path.length - 1], serializeKey);

  let subObj: any = obj;

  for (const param of params) {
    const key = getSafeKey(param, serializeKey);

    if (!subObj[key]) {
      subObj[key] = { [SYMBOL_IS_STORE]: true };
    } else if (!subObj[key][SYMBOL_IS_STORE]) {
      subObj[key] = {
        [SYMBOL_UNDEFINED]: subObj[key],
        [SYMBOL_IS_STORE]: true,
      };
    }

    subObj = subObj[key];
  }

  subObj[lastKey] = value;
}

export function safeGet<TObject = any, TValue = any>(
  obj: TObject,
  path: Primitive[] | readonly Primitive[],
  serializeKey?: (key: any) => Primitive,
): TValue {
  let subObj: any = obj;

  for (const key of path) {
    subObj = subObj[getSafeKey(key, serializeKey)];

    if (!subObj) break;
  }

  while (subObj?.[SYMBOL_IS_STORE]) {
    subObj = subObj[SYMBOL_UNDEFINED];
  }

  return subObj;
}
