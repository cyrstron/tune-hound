import {SearchResult, SearchOptions} from './types';
import {
  SearchAction, 
  ExecuteSearchSuccessAction, 
  ExecuteSearchFailureAction
} from './actions';
import { EXECUTE_SEARCH_PENDING, EXECUTE_SEARCH_SUCCESS, EXECUTE_SEARCH_FAILURE, RESET_SEARCH_RESULT } from './consts';

export interface SearchState {
  searchQuery?: SearchOptions;
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
    case EXECUTE_SEARCH_PENDING:
      return {
        ...state,
        isPending: true,
        error: undefined,
        total: undefined,
        result: undefined,
      };
    case EXECUTE_SEARCH_SUCCESS:
      return {
        ...state,
        isPending: false,
        pageIndex: 0,
        result: (action as ExecuteSearchSuccessAction).payload.data,
        total: (action as ExecuteSearchSuccessAction).payload.total,
      };
    case EXECUTE_SEARCH_FAILURE:
      return {
        ...state,
        isPending: false,
        error: (action as ExecuteSearchFailureAction).payload.error,
      };
    case RESET_SEARCH_RESULT:
      return {
        ...initialSearchState
      };
    default:
      return state;
  }
}