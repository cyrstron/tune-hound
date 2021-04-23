import { SearchResult, SearchOptions, SearchSource, SourceItemShort } from '../../types';
import {
  ExtendSearchResultSuccessAction,
  ExtendSearchResultPendingAction,
  ExtendSearchResultFailureAction,
  SetExtensionTotalsAction,
  FetchOptionsForExtendSuccessAction,
  SetExtensionOffsetAction,
} from '../../actions';
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
} from '../../consts';
import { AppAction } from '@app/state/actions';
import produce from 'immer';
import { WritableDraft } from 'immer/dist/internal';

export type ExtensionSubState = {
  readonly searchOptions?: SearchOptions[];
  readonly limit?: number;
  readonly offset?: number;
  readonly totals?: Array<number | undefined>;
  readonly error?: Error;
  readonly isPending?: boolean;
  readonly isFetchPending?: boolean;
  readonly results?: SourceItemShort[];
};

export interface SearchQueryState {
  readonly extensions: {
    readonly [key in SearchSource]?: {
      readonly [key: string]: ExtensionSubState | undefined;
    };
  };
  readonly searchQuery?: SearchOptions;
  readonly searchSource?: SearchSource;
  readonly result?: SearchResult[];
  readonly total?: number;
  readonly pageIndex: number;
  readonly pageSize: number;
  readonly error?: Error;
  readonly isPending: boolean;
}

const initialSearchState: SearchQueryState = {
  extensions: {},
  isPending: false,
  pageIndex: 0,
  pageSize: 20,
  result: undefined,
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
      action.payload.data.forEach((item, index) => {
        if (!stateDraft.result) stateDraft.result = [];

        stateDraft.result[stateDraft.pageIndex * stateDraft.pageSize + index] = item;
      });
      break;
    case EXECUTE_SEARCH_FAILURE:
      stateDraft.isPending = false;
      stateDraft.error = action.payload.error;
      break;
    case RESET_SEARCH_RESULTS:
      stateDraft.extensions = {};
      stateDraft.result = undefined;
      stateDraft.total = undefined;
      break;
    case SET_SEARCH_PAGE_INDEX:
      stateDraft.pageIndex = action.payload.pageIndex;
      break;
    case SET_SEARCH_PAGE_SIZE:
      stateDraft.pageSize = action.payload.pageSize;
      break;
    case EXTEND_SEARCH_RESULT_PENDING:
      return setExtendSearchResultPending(stateDraft, action);
    case EXTEND_SEARCH_RESULT_SUCCESS:
      return setExtendSearchResultSuccess(stateDraft, action);
    case EXTEND_SEARCH_RESULT_FAILURE:
      return setExtendSearchResultFailure(stateDraft, action);
    case FETCH_OPTIONS_FOR_EXTEND_SUCCESS:
      return setOptionsForExtend(stateDraft, action);
    case SET_EXTENSION_TOTALS:
      return setExtensionTotals(stateDraft, action);
    case SET_EXTENSION_OFFSET:
      return setExtensionOffset(stateDraft, action);
    case RESET_SEARCH:
      return initialSearchState;
  }
}, initialSearchState);

function setExtendSearchResultPending(
  stateDraft: WritableDraft<SearchQueryState>,
  { payload: { itemId, source } }: ExtendSearchResultPendingAction,
) {
  const itemsMap = stateDraft.extensions[source] ?? {};

  if (!stateDraft.extensions[source]) {
    stateDraft.extensions[source] = itemsMap;
  }

  itemsMap[itemId] = {
    limit: 20,
    offset: 0,
    isPending: true,
    isFetchPending: false,
  };
}

function setExtendSearchResultSuccess(
  stateDraft: WritableDraft<SearchQueryState>,
  { payload: { itemId, source, result } }: ExtendSearchResultSuccessAction,
) {
  const { result: results, extensions } = stateDraft;
  const item = results?.find(item => item?.id === itemId);

  if (!item) return;

  item.sources[source] = result as any;
  delete extensions[source]?.[itemId];
}

function setExtendSearchResultFailure(
  stateDraft: WritableDraft<SearchQueryState>,
  { payload: { itemId, source, error } }: ExtendSearchResultFailureAction,
) {
  const sourcesMap = stateDraft.extensions[source] ?? {};

  if (!stateDraft.extensions[source]) {
    stateDraft.extensions[source] = sourcesMap;
  }

  const item = sourcesMap[itemId] ?? {};

  if (!sourcesMap[itemId]) {
    sourcesMap[itemId] = item;
  }

  item.error = error;
  item.isPending = false;
}

function setOptionsForExtend(
  stateDraft: WritableDraft<SearchQueryState>,
  { payload: { itemId, source, results } }: FetchOptionsForExtendSuccessAction,
) {
  const sourcesMap = stateDraft.extensions[source] ?? {};

  if (!stateDraft.extensions[source]) {
    stateDraft.extensions[source] = sourcesMap;
  }

  const item = sourcesMap[itemId] ?? {};

  if (!sourcesMap[itemId]) {
    sourcesMap[itemId] = item;
  }

  const currentResults = item.results ?? [];

  if (!item.results) {
    item.results = currentResults;
  }

  currentResults.push(...results);
}

function setExtensionTotals(
  stateDraft: WritableDraft<SearchQueryState>,
  { payload: { itemId, source, totals } }: SetExtensionTotalsAction,
) {
  const sourcesMap = stateDraft.extensions[source] ?? {};

  if (!stateDraft.extensions[source]) {
    stateDraft.extensions[source] = sourcesMap;
  }

  const item = sourcesMap[itemId] ?? {};

  if (!sourcesMap[itemId]) {
    sourcesMap[itemId] = item;
  }

  item.totals = totals;
}

function setExtensionOffset(
  stateDraft: WritableDraft<SearchQueryState>,
  { payload: { itemId, source, offset } }: SetExtensionOffsetAction,
) {
  const sourcesMap = stateDraft.extensions[source] ?? {};

  if (!stateDraft.extensions[source]) {
    stateDraft.extensions[source] = sourcesMap;
  }

  const item = sourcesMap[itemId] ?? {};

  if (!sourcesMap[itemId]) {
    sourcesMap[itemId] = item;
  }

  item.offset = offset;
}
