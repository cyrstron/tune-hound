import {
  SearchResult, 
  SearchOptions, 
  SearchSource,
  SourceItemShort,
} from './types';
import {
  SearchAction, 
  ExtendSearchResultSuccessAction, 
  ExtendSearchResultPendingAction, 
  ExtendSearchResultFailureAction,
  SetExtensionTotalsAction,
  FetchOptionsForExtendSuccessAction,
  SetExtensionOffsetAction,
} from './actions';
import { 
  EXECUTE_SEARCH_PENDING, 
  EXECUTE_SEARCH_SUCCESS, 
  EXECUTE_SEARCH_FAILURE, 
  RESET_SEARCH,
  EXECUTE_SEARCH,
  RESET_SEARCH_RESULTS,
  SET_SEARCH_PAGE_INDEX,
  SET_SEARCH_PAGE_SIZE,
  EXTEND_SEARCH_RESULT_PENDING,
  EXTEND_SEARCH_RESULT_SUCCESS,
  EXTEND_SEARCH_RESULT_FAILURE,
  SET_EXTENSION_TOTALS,
  SET_EXTENSION_OFFSET,
  FETCH_OPTIONS_FOR_EXTEND_SUCCESS,
} from './consts';

export type ExtensionSubState = {
  searchOptions?: SearchOptions[];
  limit: number;
  offset: number;
  totals: Array<number | undefined>;
  error?: Error;
  isPending: boolean;
  isFetchPending: boolean;
  results?: SourceItemShort[];
};

export interface SearchState {
  extensions: {
    [key in SearchSource]?: {
      [key: string]: ExtensionSubState | undefined;
    };
  };
  searchQuery?: SearchOptions;
  searchSource?: SearchSource;
  result?: SearchResult[];
  total?: number;
  pageIndex: number;
  pageSize: number;
  error?: Error;
  isPending: boolean;
}

const initialSearchState: SearchState = {
  extensions: {},
  isPending: false,
  pageIndex: 0,
  pageSize: 20,
  result: undefined,
}

export function searchReducer(
  state: SearchState = initialSearchState,
  action: SearchAction,
): SearchState {
  switch(action.type) {
    case EXECUTE_SEARCH:
      return {
        ...state,
        searchQuery: action.payload.options,
        searchSource: action.payload.source,
      };
    case EXECUTE_SEARCH_PENDING:
      return {
        ...state,
        isPending: true,
        error: undefined,
      };
    case EXECUTE_SEARCH_SUCCESS:
      return {
        ...state,
        isPending: false,
        result: action.payload.data.reduce<SearchResult[]>((results, item, index) => {
          results[state.pageIndex * state.pageSize + index] = item;

          return results;
        }, [...(state.result || [])]),
        total: action.payload.total,
      };
    case EXECUTE_SEARCH_FAILURE:
      return {
        ...state,
        isPending: false,
        error: action.payload.error,
      };
    case RESET_SEARCH:
      return {
        ...initialSearchState
      };
    case RESET_SEARCH_RESULTS:
      return {
        ...state,
        extensions: {},
        result: undefined,
        total: undefined,
      };
    case SET_SEARCH_PAGE_INDEX:
      return {
        ...state,
        pageIndex: action.payload.pageIndex,
      };
    case SET_SEARCH_PAGE_SIZE:
      return {
        ...state,
        pageSize: action.payload.pageSize,
      };
    case EXTEND_SEARCH_RESULT_PENDING:
      return setExtendSearchResultPending(state, action);
    case EXTEND_SEARCH_RESULT_SUCCESS:
      return setExtendSearchResultSuccess(state, action);
    case EXTEND_SEARCH_RESULT_FAILURE:
      return setExtendSearchResultFailure(state, action);
    case FETCH_OPTIONS_FOR_EXTEND_SUCCESS:
      return setOptionsForExtend(state, action);
    case SET_EXTENSION_TOTALS:
      return setExtensionTotals(state, action);
    case SET_EXTENSION_OFFSET:
      return setExtensionOffset(state, action);
    default:
      return state;
  }
}

function setExtendSearchResultPending(
  state: SearchState, 
  {payload: {itemId, source}}: ExtendSearchResultPendingAction, 
): SearchState {
  const {
    extensions
  } = state;

  const updatedExtensions = {
    ...extensions,
    [source]: {
      ...(extensions[source] || {}),
      [itemId]: {
        limit: 20,
        offset: 0,
        isPending: true,
        isResultsPending: false,
      },
    },
  };

  return {
    ...state,
    extensions: updatedExtensions,
  };
}

function setExtendSearchResultSuccess(
  state: SearchState, 
  {payload: {itemId, source, result}}: ExtendSearchResultSuccessAction, 
): SearchState {
  const {
    result: results, 
    extensions,
  } = state;
  const itemIndex = results?.findIndex((item) => item?.id === itemId);

  if (itemIndex === undefined || itemIndex === -1 || !results) return state;

  const item = results[itemIndex];

  const extendedItem = {
    ...item,
    sources: {
      ...item.sources,
      ...result,
    }
  } as SearchResult;

  const updatedExtensions = {
    ...extensions,
    [source]: {
      ...(extensions[source] || {}),
    }
  };

  const extensionsSubStates = updatedExtensions[source];

  if (extensionsSubStates) {
    delete extensionsSubStates[itemId];
  }

  return {
    ...state,
    result: [
      ...results.slice(0, itemIndex),
      extendedItem,
      ...results.slice(itemIndex + 1),
    ],
    extensions: updatedExtensions,
  };
}

function setExtendSearchResultFailure(  
  state: SearchState, 
  {payload: {itemId, source, error}}: ExtendSearchResultFailureAction, 
): SearchState {
  const {
    extensions,
  } = state;

  const updatedExtensions = {
    ...extensions,
    [source]: {
      ...(extensions[source] || {}),
      [itemId]: {
        ...(extensions[source]?.[itemId] || {}),
        error,
        isPending: false,
      }
    },
  };

  return {
    ...state,
    extensions: updatedExtensions,
  };
}

function setOptionsForExtend(
  state: SearchState, 
  {payload: {itemId, source, results}}: FetchOptionsForExtendSuccessAction, 
): SearchState {
  const {
    extensions,
  } = state;

  const updatedExtensions = {
    ...extensions,
    [source]: {
      ...(extensions[source] || {}),
      [itemId]: {
        ...(extensions[source]?.[itemId] || {}),
        results: [...(extensions[source]?.[itemId]?.results || []), ...results],
      }
    }
  }

  return {
    ...state,
    extensions: updatedExtensions,
  };
}

function setExtensionTotals(
  state: SearchState, 
  {payload: {itemId, source, totals}}: SetExtensionTotalsAction, 
): SearchState {
  const {
    extensions,
  } = state;

  const updatedExtensions = {
    ...extensions,
    [source]: {
      ...(extensions[source] || {}),
      [itemId]: {
        ...(extensions[source]?.[itemId] || {}),
        totals,
      }
    }
  }

  return {
    ...state,
    extensions: updatedExtensions,
  };
}

function setExtensionOffset(
  state: SearchState, 
  {payload: {itemId, source, offset}}: SetExtensionOffsetAction, 
): SearchState {
  const {
    extensions,
  } = state;

  const updatedExtensions = {
    ...extensions,
    [source]: {
      ...(extensions[source] || {}),
      [itemId]: {
        ...(extensions[source]?.[itemId] || {}),
        offset,
      }
    }
  }

  return {
    ...state,
    extensions: updatedExtensions,
  };
}