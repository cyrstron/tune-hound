import { SearchResult, SourceItemShort } from '../../../types';
import { EXECUTE_SEARCH_SUCCESS, RESET_SEARCH_RESULTS } from '../../../consts';
import { AppAction } from '@app/state/actions';
import produce, { Draft } from 'immer';
import { MediaSourceDict } from '@app/types/media';
import { createMapReducer, MapReducersStore } from '@app/utils/redux';
import { Reducer } from 'react';
import { combineReducers } from 'redux';

const initialReducers: MapReducersStore<SearchResultState, AppAction> = [];

export const searchResultsReducer = createMapReducer<SearchResultState, AppAction>(
  produce((reducers, action) => {
    switch (action.type) {
      case EXECUTE_SEARCH_SUCCESS:
        action.payload.keys.forEach((id, index) => {
          reducers[index + action.payload.offset] = {
            key: id,
            reducer: createSearchResultReducer(id),
          };
        });
        break;
      case RESET_SEARCH_RESULTS:
        return [];
    }
  }, initialReducers),
);

export interface SearchResultState {
  readonly result?: SearchResult;
  readonly subSearch?: MediaSourceDict<SourceItemShort[]>;
}

export const createSearchResultReducer = (
  id: string,
): Reducer<SearchResultState | undefined, AppAction> =>
  combineReducers<SearchResultState>({
    result: produce((_stateDraft: Draft<SearchResult>, action: AppAction) => {
      switch (action.type) {
        case EXECUTE_SEARCH_SUCCESS:
          return action.payload.map[id];
      }
    }, undefined),
  });
