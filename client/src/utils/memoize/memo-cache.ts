import { Primitive, safeGet, safeSet } from './utils';

export interface MemoCacheOptions {
  cacheSize?: number;
  serializeKey?: (key: any) => Primitive;
}
export class MemoCache<TPayload> {
  private size = 0;
  private maxSize: number;
  private serializeKey?: (key: any) => Primitive;

  constructor(
    private key: (...args: any) => any,
    { cacheSize = 100, serializeKey }: MemoCacheOptions = {},
  ) {
    this.maxSize = cacheSize;
    this.serializeKey = serializeKey;

    MemoCache.watchGlobalStoreGarbage();
  }

  get(path: Primitive[] | readonly Primitive[]): TPayload | undefined {
    return safeGet(this.store, path);
  }

  set(path: Primitive[] | readonly Primitive[], value: TPayload): void {
    if (this.size >= this.maxSize) {
      this.reset();
      this.size = 0;
    }

    this.size += 1;

    safeSet(this.store, path, value, this.serializeKey);
  }

  private get store() {
    let store = MemoCache.globalStore.get(this.key);

    if (!store) {
      store = {};

      MemoCache.globalStore.set(this.key, store);
      MemoCache.watchGlobalStoreGarbage();
    }

    const callsNumber = MemoCache.journal.get(this.key) ?? 0;

    MemoCache.journal.set(this.key, callsNumber + 1);

    return store;
  }

  reset(): void {
    MemoCache.globalStore.set(this.key, {});
  }

  static globalStore = new Map<(...args: any[]) => any, any>();
  static journal = new Map<(...args: any[]) => any, number>();

  static resetStore(key: (...args: any[]) => any): void {
    MemoCache.globalStore.delete(key);
  }

  static cleanGlobalStore(): void {
    const keys = MemoCache.globalStore.keys();

    let existingKeysNum = 0;

    for (const key of keys) {
      const callNumber = MemoCache.journal.get(key);

      if (!callNumber) {
        MemoCache.resetStore(key);
      } else {
        existingKeysNum += 1;
      }
    }

    if (MemoCache.timerId && !existingKeysNum) {
      clearInterval(MemoCache.timerId);

      MemoCache.timerId = null;
    }
  }

  static watchGlobalStoreGarbage(): void {
    if (MemoCache.timerId) return;

    MemoCache.timerId = window.setInterval(() => {
      MemoCache.cleanGlobalStore();
    }, 120000);
  }

  static timerId: number | null = null;
}
