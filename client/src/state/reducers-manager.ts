import set from 'lodash/set';
import unset from 'lodash/unset';
import { Reducer, Store } from 'redux';
import { AppState } from '.';
import { AppAction } from './actions';
import { combineStoredReducers, getReducerPath, ReducersStore } from './utils';

export class ReducersManager {
  private dynamicReducers: ReducersStore<Partial<AppState>> = {};
  private _store?: Store<AppState, AppAction>;

  constructor(private staticReducers: ReducersStore<AppState>) {}

  set store(store: Store<AppState, AppAction>) {
    this._store = store;
  }

  get store(): Store<AppState, AppAction> {
    if (!this._store) throw new Error("Store hasn't been inited!");

    return this._store;
  }

  recombineAppReducer(): void {
    const newReducer = combineStoredReducers(this.dynamicReducers, this.staticReducers);

    this.store.replaceReducer(newReducer);
  }

  injectReducer(path: string | string[], reducer: Reducer): void {
    set(this.dynamicReducers, getReducerPath(path), reducer);

    this.recombineAppReducer();
  }

  ejectReducer(path: string | string[]): void {
    unset(this.dynamicReducers, getReducerPath(path));

    this.recombineAppReducer();
  }
}
