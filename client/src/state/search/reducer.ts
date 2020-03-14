import {SearchResult, SearchOptions, SearchSource} from './types';
import {
  SearchAction,
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
} from './consts';

export interface SearchState {
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
    default:
      return state;
  }
}