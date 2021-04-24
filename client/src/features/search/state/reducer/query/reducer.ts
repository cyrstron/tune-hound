import { SearchOptions } from '../../types';
import {
  EXECUTE_SEARCH_PENDING,
  EXECUTE_SEARCH_SUCCESS,
  EXECUTE_SEARCH_FAILURE,
  RESET_SEARCH,
  EXECUTE_SEARCH,
  RESET_SEARCH_RESULTS,
  SET_SEARCH_PAGE_INDEX,
  SET_SEARCH_PAGE_SIZE,
} from '../../consts';
import { AppAction } from '@app/state/actions';
import produce from 'immer';
import { MediaSource } from '@app/types/media';
export interface SearchQueryState {
  readonly searchQuery?: SearchOptions;
  readonly searchSource?: MediaSource;
  readonly total?: number;
  readonly pageIndex: number;
  readonly pageSize: number;
  readonly error?: Error;
  readonly isPending: boolean;
}

const initialSearchState: SearchQueryState = {
  isPending: false,
  pageIndex: 0,
  pageSize: 20,
};

export const queryReducer = produce((stateDraft, action: AppAction) => {
  switch (action.type) {
    case EXECUTE_SEARCH:
      stateDraft.searchQuery = action.payload.options;
      stateDraft.searchSource = action.payload.source;
      break;
    case EXECUTE_SEARCH_PENDING:
      stateDraft.isPending = true;
      delete stateDraft.error;
      break;
    case EXECUTE_SEARCH_SUCCESS:
      stateDraft.isPending = false;
      stateDraft.total = action.payload.total;
      break;
    case EXECUTE_SEARCH_FAILURE:
      stateDraft.isPending = false;
      stateDraft.error = action.payload.error;
      break;
    case RESET_SEARCH_RESULTS:
      stateDraft.total = undefined;
      break;
    case SET_SEARCH_PAGE_INDEX:
      stateDraft.pageIndex = action.payload.pageIndex;
      break;
    case SET_SEARCH_PAGE_SIZE:
      stateDraft.pageSize = action.payload.pageSize;
      break;
    case RESET_SEARCH:
      return initialSearchState;
  }
}, initialSearchState);
