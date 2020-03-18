import {
  EXECUTE_SEARCH,
  EXECUTE_SEARCH_BY_PAGE_INDEX,
  EXECUTE_SEARCH_BY_PAGE_SIZE,
  EXECUTE_SEARCH_PENDING,
  EXECUTE_SEARCH_SUCCESS,
  EXECUTE_SEARCH_FAILURE,
  RESET_SEARCH,
  RESET_SEARCH_RESULTS,
  SET_SEARCH_PAGE_INDEX,
  SET_SEARCH_PAGE_SIZE,
  EXTEND_SEARCH_RESULT,
  EXTEND_SEARCH_RESULT_PENDING,
  EXTEND_SEARCH_RESULT_SUCCESS,
  EXTEND_SEARCH_RESULT_FAILURE,
} from './consts';
import { SearchSource, SearchResult, SearchOptions } from './types';
import {DeezerSearchOptions, DeezerTrack} from '../deezer/types';
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

export interface ExecuteSearchByPageIndexAction {
  type: typeof EXECUTE_SEARCH_BY_PAGE_INDEX;
  payload: {pageIndex: number};
}

export const executeSearchByPageIndex = (pageIndex: number): ExecuteSearchByPageIndexAction => ({
  type: EXECUTE_SEARCH_BY_PAGE_INDEX,
  payload: {pageIndex},
});

export interface ExecuteSearchByPageSizeAction {
  type: typeof EXECUTE_SEARCH_BY_PAGE_SIZE;
  payload: {pageSize: number};
}

export const executeSearchByPageSize = (pageSize: number): ExecuteSearchByPageSizeAction => ({
  type: EXECUTE_SEARCH_BY_PAGE_SIZE,
  payload: {pageSize},
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

export interface ResetSearchAction {
  type: typeof RESET_SEARCH;
}

export const resetSearch = (): ResetSearchAction => ({
  type: RESET_SEARCH,
});

export interface ResetSearchResultsAction {
  type: typeof RESET_SEARCH_RESULTS;
}

export const resetSearchResults = (): ResetSearchResultsAction => ({
  type: RESET_SEARCH_RESULTS,
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

export interface ExtendSearchResultAction  {
  type: typeof EXTEND_SEARCH_RESULT,
  payload: {
    itemId: string,
    source: SearchSource,
  }
};

export const extendSearchResult = (
  itemId: string,
  source: SearchSource,
): ExtendSearchResultAction => ({
  type: EXTEND_SEARCH_RESULT,
  payload: {itemId, source}
});

export interface ExtendSearchResultPendingAction {
  type: typeof EXTEND_SEARCH_RESULT_PENDING;
  payload: {
    itemId: string;
    source: SearchSource;
  }
}

export const extendSearchResultPending = (
  itemId: string,
  source: SearchSource,
): ExtendSearchResultPendingAction => ({
  type: EXTEND_SEARCH_RESULT_PENDING,
  payload: {itemId, source}
});

export interface ExtendSearchResultSuccessAction {
  type: typeof EXTEND_SEARCH_RESULT_SUCCESS;
  payload: {
    itemId: string;
    source: SearchSource;
    result: {
      deezer?: DeezerTrack;
      spotify?: SpotifyApi.TrackObjectFull | 
        SpotifyApi.AlbumObjectSimplified | 
        SpotifyApi.ArtistObjectFull | 
        SpotifyApi.PlaylistObjectSimplified;
    };
  };
}

export const extendSearchResultSuccess = (
  itemId: string,
  source: SearchSource,
  result: {
    deezer?: DeezerTrack;
    spotify?: SpotifyApi.TrackObjectFull | 
      SpotifyApi.AlbumObjectSimplified | 
      SpotifyApi.ArtistObjectFull | 
      SpotifyApi.PlaylistObjectSimplified;
  },
): ExtendSearchResultSuccessAction => ({
  type: EXTEND_SEARCH_RESULT_SUCCESS,
  payload: {itemId, source, result},
});

export interface ExtendSearchResultFailureAction {
  type: typeof EXTEND_SEARCH_RESULT_FAILURE;
  payload: {
    itemId: string;
    source: SearchSource;
    error: Error;
  }
}

export const extendSearchResultFailure = (
  itemId: string,
  source: SearchSource,
  error: Error,
): ExtendSearchResultFailureAction => ({
  type: EXTEND_SEARCH_RESULT_FAILURE,
  payload: {itemId, source, error},
});

export type SearchAction = ExecuteSearchAction |
  ExecuteSearchPendingAction |
  ExecuteSearchSuccessAction |
  ExecuteSearchFailureAction |
  SetSearchPageIndexAction |
  SetSearchPageSizeAction |
  ResetSearchResultsAction |
  ExtendSearchResultAction |
  ExtendSearchResultPendingAction |
  ExtendSearchResultSuccessAction |
  ExtendSearchResultFailureAction |
  ResetSearchAction;