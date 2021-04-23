import set from 'lodash/set';
import unset from 'lodash/unset';
import { Action, Reducer, Store } from 'redux';
import {
  combineNestedReducers,
  getReducerPath,
  NestedReducersStore,
} from './combine-nested-reducers';

export class ReducersManager<TState = any, TAction extends Action = Action> {
  private dynamicReducers: NestedReducersStore<Partial<TState>, TAction> = {};
  private _store?: Store<TState, TAction>;

  constructor(private staticReducers: NestedReducersStore<TState, TAction>) {}

  set store(store: Store<TState, TAction>) {
    this._store = store;
  }

  get store(): Store<TState, TAction> {
    if (!this._store) throw new Error("Store hasn't been inited!");

    return this._store;
  }

  recombineAppReducer(): void {
    const newReducer = combineNestedReducers(this.dynamicReducers, this.staticReducers);

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
