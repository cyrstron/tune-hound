import {
  EXECUTE_SEARCH,
  EXECUTE_SEARCH_PENDING,
  EXECUTE_SEARCH_SUCCESS,
  EXECUTE_SEARCH_FAILURE,
  RESET_SEARCH_RESULT,
  SET_SEARCH_PAGE_INDEX,
  SET_SEARCH_PAGE_SIZE,
} from './consts';
import { SearchSource, SearchResult, SearchOptions } from './types';
import {DeezerSearchOptions} from '../deezer/types';
import { SpotifySearchOptions } from '../spotify/types';

export interface ExecuteSearchAction  {
  type: typeof EXECUTE_SEARCH,
  payload: {
    source: 'deezer',
    options: DeezerSearchOptions,
  } | {
    source: 'spotify',
    options: SpotifySearchOptions,
  }
};

export const executeSearch = (
  source: SearchSource,
  options: SearchOptions,
): ExecuteSearchAction => ({
  type: EXECUTE_SEARCH,
  payload: {source, options} as {
    source: 'deezer',
    options: DeezerSearchOptions,
  } | {
    source: 'spotify',
    options: SpotifySearchOptions,
  },
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
    data: SearchResult[];
    total: number;
  }
}

export const executeSearchSuccess = (
  data: SearchResult[], 
  total: number
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

export interface SetSearchPageIndexAction {
  type: typeof SET_SEARCH_PAGE_INDEX;
  payload: {pageIndex: number};
}

export const setSearchPageIndex = (pageIndex: number): SetSearchPageIndexAction => ({
  type: SET_SEARCH_PAGE_INDEX,
  payload: {pageIndex},
});

export interface SetSearchPageSizeAction {
  type: typeof SET_SEARCH_PAGE_SIZE;
  payload: {pageSize: number};
}

export const setSearchPageSize = (pageSize: number): SetSearchPageSizeAction => ({
  type: SET_SEARCH_PAGE_SIZE,
  payload: {pageSize},
});

export type SearchAction = ExecuteSearchAction |
  ExecuteSearchPendingAction |
  ExecuteSearchSuccessAction |
  ExecuteSearchFailureAction |
  SetSearchPageIndexAction |
  SetSearchPageSizeAction |
  ResetSearchResultAction;