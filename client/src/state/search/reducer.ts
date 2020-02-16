import {SearchSource, SearchResult} from './types';
import {
  SearchAction, 
  ExecuteSearchSuccessAction, 
  ExecuteSearchFailureAction
} from './actions';
import { EXECUTE_SEARCH_PENDING, EXECUTE_SEARCH_SUCCESS, EXECUTE_SEARCH_FAILURE, RESET_SEARCH_RESULT } from './consts';

export interface SearchState {
  source?: SearchSource;
  result?: SearchResult[];
  error?: Error;
  isPending: boolean;
}

const initialSearchState: SearchState = {
  isPending: false,
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
        result: undefined,
      };
    case EXECUTE_SEARCH_SUCCESS:
      return {
        ...state,
        isPending: false,
        result: (action as ExecuteSearchSuccessAction).payload.data,
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