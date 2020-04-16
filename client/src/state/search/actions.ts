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
  SET_OPTIONS_FOR_EXTEND,
  PICK_OPTION_FOR_EXTEND,
  RESET_OPTIONS_FOR_EXTEND,
  FETCH_OPTIONS_FOR_EXTEND,
  FETCH_OPTIONS_FOR_EXTEND_PENDING,
  FETCH_OPTIONS_FOR_EXTEND_FAILURE,
  FETCH_OPTIONS_FOR_EXTEND_SUCCESS,  
  SET_EXTENSION_OFFSET,
  SET_EXTENSION_LIMIT,
  SET_EXTENSION_TOTALS,
  FETCH_NEXT_OPTIONS_FOR_EXTEND,
} from './consts';
import { 
  SearchSource, 
  SearchResult, 
  SearchOptions,
  DeezerSearchItem, 
  SpotifySearchItem, 
  SearchItem 
} from './types';
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
      deezer?: DeezerSearchItem | null;
      spotify?: SpotifySearchItem | null;
    };
  };
}

export const extendSearchResultSuccess = (
  itemId: string,
  source: SearchSource,
  result: {
    deezer?: DeezerSearchItem | null;
    spotify?: SpotifySearchItem | null;
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


export interface SetOptionsForExtendAction {
  type: typeof SET_OPTIONS_FOR_EXTEND;
  payload: {
    itemId: string;
    source: SearchSource;
    items: SearchItem[];
  };
}

export const setOptionsForExtend = (
  itemId: string,
  source: SearchSource,
  items: SearchItem[],
): SetOptionsForExtendAction => ({
  type: SET_OPTIONS_FOR_EXTEND,
  payload: {itemId, source, items},
});

export interface PickOptionForExtendAction {
  type: typeof PICK_OPTION_FOR_EXTEND;
  payload: {
    itemId: string;
    source: SearchSource;
    pickedItem: SearchItem | null;
  }
}

export const pickOptionForExtend = (
  itemId: string,
  source: SearchSource,
  pickedItem: SearchItem | null,
): PickOptionForExtendAction => ({
  type: PICK_OPTION_FOR_EXTEND,
  payload: {itemId, source, pickedItem},
});

export interface ResetOptionsForExtendAction {
  type: typeof RESET_OPTIONS_FOR_EXTEND;
  payload: {
    itemId: string;
    source: SearchSource;
  }
}

export const resetOptionsForExtend = (
  itemId: string,
  source: SearchSource,
): ResetOptionsForExtendAction => ({
  type: RESET_OPTIONS_FOR_EXTEND,
  payload: {itemId, source},
});

export interface FetchOptionsForExtendAction {
  type: typeof FETCH_OPTIONS_FOR_EXTEND;
  payload: {
    itemId: string;
    source: SearchSource;
  }
}

export const fetchOptionsForExtend = (
  itemId: string,
  source: SearchSource,
): FetchOptionsForExtendAction => ({
  type: FETCH_OPTIONS_FOR_EXTEND,
  payload: {itemId, source},
});

export interface FetchOptionsForExtendPendingAction {
  type: typeof FETCH_OPTIONS_FOR_EXTEND_PENDING;
  payload: {
    itemId: string;
    source: SearchSource;
  };
}

export const fetchOptionsForExtendPending = (
  itemId: string,
  source: SearchSource,
): FetchOptionsForExtendPendingAction => ({
  type: FETCH_OPTIONS_FOR_EXTEND_PENDING,
  payload: {itemId, source},
});

export interface FetchOptionsForExtendFailureAction {
  type: typeof FETCH_OPTIONS_FOR_EXTEND_FAILURE;
  payload: {
    itemId: string;
    source: SearchSource;
    error: Error;
  }
}

export const fetchOptionsForExtendFailure = (
  itemId: string,
  source: SearchSource,
  error: Error,
): FetchOptionsForExtendFailureAction => ({
  type: FETCH_OPTIONS_FOR_EXTEND_FAILURE,
  payload: {itemId, source, error},
});

export interface FetchOptionsForExtendSuccessAction {
  type: typeof FETCH_OPTIONS_FOR_EXTEND_SUCCESS;
  payload: {
    itemId: string;
    source: SearchSource;
    results: SearchItem[];
  }
}

export const fetchOptionsForExtendSuccess = (
  itemId: string,
  source: SearchSource,
  results: SearchItem[],
): FetchOptionsForExtendSuccessAction => ({
  type: FETCH_OPTIONS_FOR_EXTEND_SUCCESS,
  payload: {itemId, source, results},
});

export interface SetExtensionOffsetAction {
  type: typeof SET_EXTENSION_OFFSET;
  payload: {
    itemId: string;
    source: SearchSource;
    offset: number;
  }
}

export const setExtensionOffset = (
  itemId: string,
  source: SearchSource,
  offset: number,
): SetExtensionOffsetAction => ({
  type: SET_EXTENSION_OFFSET,
  payload: {itemId, source, offset},
});

export interface SetExtensionLimitAction {
  type: typeof SET_EXTENSION_LIMIT;
  payload: {
    itemId: string;
    source: SearchSource;
    limit: number;
  }
}

export const setExtensionLimit = (
  itemId: string,
  source: SearchSource,
  limit: number,
): SetExtensionLimitAction => ({
  type: SET_EXTENSION_LIMIT,
  payload: {itemId, source, limit},
});

export interface SetExtensionTotalsAction {
  type: typeof SET_EXTENSION_TOTALS;
  payload: {
    itemId: string;
    source: SearchSource;
    totals: Array<number | undefined>;
  }
}

export const setExtensionTotals = (
  itemId: string,
  source: SearchSource,
  totals: Array<number | undefined>,
): SetExtensionTotalsAction => ({
  type: SET_EXTENSION_TOTALS,
  payload: {itemId, source, totals},
});

export interface FetchNextOptionsForExtendAction {
  type: typeof FETCH_NEXT_OPTIONS_FOR_EXTEND;
  payload: {
    itemId: string;
    source: SearchSource;
  }
}

export const fetchNextOptionsForExtend = (
  itemId: string,
  source: SearchSource,
): FetchNextOptionsForExtendAction => ({
  type: FETCH_NEXT_OPTIONS_FOR_EXTEND,
  payload: {itemId, source},
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
  SetOptionsForExtendAction |
  PickOptionForExtendAction |
  ResetSearchAction |
  ResetOptionsForExtendAction |
  FetchOptionsForExtendPendingAction |
  FetchOptionsForExtendFailureAction |
  FetchOptionsForExtendSuccessAction |
  SetExtensionOffsetAction |
  SetExtensionLimitAction |
  FetchNextOptionsForExtendAction |
  SetExtensionTotalsAction;
