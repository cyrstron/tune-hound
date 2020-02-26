import {
  EXECUTE_SEARCH,
  EXECUTE_SEARCH_PENDING,
  EXECUTE_SEARCH_SUCCESS,
  EXECUTE_SEARCH_FAILURE,
  RESET_SEARCH_RESULT,
} from './consts';
import { SearchSource, SearchResult } from './types';
import {DeezerSearchOptions} from '../deezer/types';

export interface ExecuteSearchAction  {
  type: typeof EXECUTE_SEARCH,
  payload: {
    source: 'deezer',
    query: string,
    options?: DeezerSearchOptions,
  } | {
    source: 'spotify',
    query: string,
    options?: any,
  }
};

export const executeSearch = (
  source: SearchSource,
  query: string,
  options?: DeezerSearchOptions,
): ExecuteSearchAction => ({
  type: EXECUTE_SEARCH,
  payload: {source, query, options},
});

export interface ExecuteSearchPendingAction {
  type: typeof EXECUTE_SEARCH_PENDING;
}

export const executeSearchPending = (): ExecuteSearchPendingAction => ({
  type: EXECUTE_SEARCH_PENDING,
});

export interface ExecuteSearchSuccessAction {
  type: typeof EXECUTE_SEARCH_SUCCESS;
  payload: {
    data: any;
    total?: number;
  }
}

export const executeSearchSuccess = (
  data: SearchResult[], 
  total?: number
): ExecuteSearchSuccessAction => ({
  type: EXECUTE_SEARCH_SUCCESS,
  payload: {data, total},
});

export interface ExecuteSearchFailureAction {
  type: typeof EXECUTE_SEARCH_FAILURE;
  payload: {
    error: Error;
  }
}

export const executeSearchFailure = (error: Error): ExecuteSearchFailureAction => ({
  type: EXECUTE_SEARCH_FAILURE,
  payload: {error},
});



export interface ResetSearchResultAction {
  type: typeof RESET_SEARCH_RESULT;
}

export const resetSearchResult = (): ResetSearchResultAction => ({
  type: RESET_SEARCH_RESULT,
});

export type SearchAction = ExecuteSearchAction |
  ExecuteSearchPendingAction |
  ExecuteSearchSuccessAction |
  ExecuteSearchFailureAction |
  ResetSearchResultAction;