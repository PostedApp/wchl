import { PromiseOr } from 'simplytyped';
import { Arrayable, Cached, Primitive, Then } from './types';

export function arrayed<T>(input: Arrayable<T>): T[] {
  return Array.isArray(input) ? input : [input];
}

export function filtered<T extends any[] | number | object>(
  item: T,
  omits?: any[]
) {
  if (typeof item !== 'object') return item;

  const isKept = (arg: T) =>
    Array.isArray(omits) ? !omits.includes(arg) : !!arg;

  return Array.isArray(item)
    ? item.filter((value) => isKept(value))
    : isKept(item) &&
        fromEntries(Object.entries(item).filter(([, value]) => isKept(value)));
}

export function forEachOf<T>(
  arr?: T[] | IterableIterator<T>,
  fn?: (arg: T) => any
) {
  if (arr === undefined || fn === undefined) return;
  for (const arg of arr) fn(arg);
}

export async function* forEachYield<T, TMapped>(
  gen: AsyncIterableIterator<T>,
  fnMap: (item: T) => TMapped
) {
  let step: IteratorResult<T>;
  do {
    step = await gen.next();
    yield (await fnMap(step.value)) as Then<TMapped>; // prevents nested Promises
  } while (!step.done);
}

export function fromEntries(entries: Array<[string, any]>) {
  const result: { [k: string]: any } = {};
  forEachOf(entries, ([key, value]) => (result[key] = value));
  return result;
}

export async function iterate<T>(
  source: AsyncIterable<T> | Iterable<T>,
  { limit = 1, output = new Array<T>() } = {}
) {
  for await (const item of source) {
    output.push(item);
    if (--limit < 1) break;
  }
  return output;
}

export function joined(input: Arrayable<string>, separator?: string) {
  return [...new Set(arrayed(input))].join(separator);
}

export async function parsed<T>(response: PromiseOr<Response>) {
  const res = await response;
  if (!res.ok) throw Error(`${res.status}:${res.statusText}`);
  return { json: ((await res.json()) as unknown) as T, res };
}

export function prepend(
  input: Arrayable<string>,
  text: string,
  add: boolean = true
) {
  const process = (item: string) =>
    item.startsWith(text)
      ? (add && item) || item.substring(text.length)
      : (add && text.concat(item)) || item;

  return Array.isArray(input) ? input.map(process) : process(input);
}

export function querify(
  params: { [s: string]: any },
  {
    array = ',',
    entry = '&',
    excluded = [undefined] as Arrayable<Primitive | object>,
    pair = '=',
    prefix = '?',
  } = {}
) {
  const exclusions = arrayed(excluded);
  const mapped = new Array<string>();
  forEachOf(
    Object.entries(params),
    ([key, value]) =>
      exclusions.includes(value) ||
      mapped.push(key + pair + joined(value, array))
  );
  return mapped.length ? prefix + mapped.join(entry) : '';
}

export function replaceAll(input: string, find: string, replacement = '') {
  const escapedFind = find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return input.replace(new RegExp(escapedFind, 'g'), replacement);
}

export function replaceSpaces(input: string, replacement = '') {
  return replaceAll(input, ' ', replacement);
}

export function searchUri<K extends string>(
  encodedUri: string,
  find: Arrayable<K>,
  { delimiter = '&', findAll = true } = {}
) {
  const uri = decodeURI(encodedUri);
  const keys = arrayed(find);
  const result: Partial<Record<K, string>> = {};
  for (const key of keys) {
    const iKey = uri.indexOf(key);
    if (iKey === -1) continue;

    const iStart = iKey + key.length + 1;
    const iEnd = uri.indexOf(delimiter, iStart);
    result[key] = uri.substring(iStart, iEnd !== -1 ? iEnd : undefined);
    if (!findAll) break;
  }
  return result;
}

export async function tryCached<K, V>(
  { _cached }: Cached<K, Then<V>>,
  { key, valued }: { key: K; valued: () => V }
) {
  if (!_cached) return { isCache: false, value: (await valued()) as Then<V> };

  const {
    duration = Infinity,
    store = new Map() as typeof _cached.store,
  } = _cached;
  Object.assign(_cached, { duration, store });

  const cached = store!.get(key);
  const unix = Date.now();
  if (cached && cached.unix + duration > unix) {
    return { isCache: true, value: cached.value };
  }

  const value = (await valued()) as Then<V>;
  store!.set(key, { unix, value });
  return { isCache: false, value };
}
