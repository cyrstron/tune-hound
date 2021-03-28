import get from 'lodash/get';
import set from 'lodash/set';

export class MemoCache {
  private store: any = {};
  private size = 0;

  constructor(private maxSize: number = 100) {}

  get(path: any[]) {
    return get(this.store, path);
  }

  set(path: any[], value: any) {
    if (this.size > this.maxSize) {
      this.store = {};
      this.size = 0;
    }

    set(this.store, path, value);

    this.size += 1;
  }
}
