import {SearchResult, SearchOptions, SearchSource, SearchItem} from './types';
import {
  SearchAction, 
  ExtendSearchResultSuccessAction, 
  ExtendSearchResultPendingAction, 
  ExtendSearchResultFailureAction,
  SetOptionsForExtendAction,
  PickOptionForExtendAction,
  ResetOptionsForExtendAction,
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
  SET_OPTIONS_FOR_EXTEND,
  PICK_OPTION_FOR_EXTEND,
  RESET_OPTIONS_FOR_EXTEND,
} from './consts';

export interface SearchState {
  extendPendings: {
    [key in SearchSource]?: {
      [key in string]?: true;
    };
  };
  extendErrors: {
    [key in SearchSource]?: {
      [key in string]?: Error;
    };
  };
  itemsForExtention: {
    [key in SearchSource]?: {
      [key in string]?: SearchItem[];
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
  extendPendings: {},
  extendErrors: {},
  itemsForExtention: {},
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
        extendPendings: {},
        extendErrors: {},
        itemsForExtention: {},
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
    case SET_OPTIONS_FOR_EXTEND:
      return setOptionsForExtend(state, action);
    case PICK_OPTION_FOR_EXTEND:
      return setPickOptionForExtend(state, action);
    case RESET_OPTIONS_FOR_EXTEND:
      return setPickOptionForExtend(state, action);
    default:
      return state;
  }
}

function setExtendSearchResultPending(
  state: SearchState, 
  {payload: {itemId, source}}: ExtendSearchResultPendingAction, 
): SearchState {
  const {extendPendings, extendErrors} = state;

  const updatedPendings = {
    ...extendPendings,
    [source]: {
      ...extendPendings[source],
      [itemId]: true,
    },
  };

  const updatedErrors = {
    ...extendErrors,
    [source]: {
      ...extendErrors[source],
    },
  };

  const errors = updatedErrors[source];

  if (errors) {
    delete errors[itemId];
  };

  return {
    ...state,
    extendPendings: updatedPendings,
    extendErrors: updatedErrors,
  };
}

function setExtendSearchResultSuccess(
  state: SearchState, 
  {payload: {itemId, source, result}}: ExtendSearchResultSuccessAction, 
): SearchState {
  const {result: results, extendPendings, itemsForExtention} = state;
  const itemIndex = results?.findIndex(({id}) => id === itemId);

  if (itemIndex === undefined || itemIndex === -1 || !results) return state;

  const item = results[itemIndex];
  const extendedItem = {
    ...item,
    sources: {
      ...item.sources,
      ...result,
    }
  } as SearchResult;

  const updatedPendings = {
    ...extendPendings,
    [source]: {
      ...extendPendings[source],
    },
  };

  const pendings = updatedPendings[source];

  if (pendings) {
    delete pendings[itemId];
  };

  return {
    ...state,
    result: [
      ...results.slice(0, itemIndex),
      extendedItem,
      ...results.slice(itemIndex + 1),
    ],
    extendPendings: updatedPendings,
  };
}

function setExtendSearchResultFailure(  
  state: SearchState, 
  {payload: {itemId, source, error}}: ExtendSearchResultFailureAction, 
): SearchState {
  const {extendPendings, extendErrors} = state;

  const updatedErrors = {
    ...extendErrors,
    [source]: {
      ...(extendErrors[source] || {}),
      [itemId]: error,
    },
  };

  const updatedPendings = {
    ...extendPendings,
    [source]: {
      ...extendPendings[source],
    },
  };

  const pendings = extendPendings[source];

  if (pendings) {
    delete pendings[itemId];
  };

  return {
    ...state,
    extendPendings: updatedPendings,
    extendErrors: updatedErrors,
  };
}

function setOptionsForExtend(
  state: SearchState, 
  {payload: {itemId, source, items}}: SetOptionsForExtendAction, 
): SearchState {
  const {itemsForExtention} = state;

  const newItemsForExtention = {
    ...itemsForExtention,
    [source]: {
      ...itemsForExtention[source],
      [itemId]: items,
    },
  };

  return {
    ...state,
    itemsForExtention: newItemsForExtention,
  };
}

function setPickOptionForExtend(
  state: SearchState, 
  {payload: {itemId, source}}: PickOptionForExtendAction | ResetOptionsForExtendAction, 
): SearchState {
  const {itemsForExtention} = state;

  const newItemsForExtention = {
    ...itemsForExtention,
    [source]: {
      ...itemsForExtention[source],
    },
  };

  const items = newItemsForExtention[source];

  if (items) {
    delete items[itemId];
  };

  return {
    ...state,
    itemsForExtention: newItemsForExtention,
  };
}