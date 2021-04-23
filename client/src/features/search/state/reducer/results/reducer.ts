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
import { MediaSource, MediaSourceDict } from '@app/types/media';

export interface SearchResultState {
  readonly result?: SearchResult;
  readonly searchOptions?: SearchOptions[];
  readonly limits?: MediaSourceDict<number>;
  readonly offsets?: MediaSourceDict<number>;
  readonly totals?: MediaSourceDict<number[]>;
  readonly errors?: MediaSourceDict<Error>;
  readonly pendingSources?: MediaSource[];
  readonly fetchPendings?: MediaSource[];
  readonly subResults?: MediaSourceDict<SourceItemShort[]>;
}

const initialSearchResultState: SearchResultState = {};

export const searchResultReducer = produce((stateDraft, action: AppAction) => {
  switch (action.type) {
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
  }
}, initialSearchResultState);

function setExtendSearchResultPending(
  stateDraft: WritableDraft<SearchResultState>,
  { payload: { itemId, source } }: ExtendSearchResultPendingAction,
) {
  const pendingSources = stateDraft.pendingSources ?? [];

  pendingSources.push(source as WritableDraft<MediaSource>);

  stateDraft.pendingSources = pendingSources;

  stateDraft.fetchPendings = stateDraft.fetchPendings?.filter(
    pendingSource => pendingSource !== source,
  );

  stateDraft.offsets = {
    ...(stateDraft.offsets ?? {}),
    [source]: 0,
  };

  stateDraft.limits = {
    ...(stateDraft.offsets ?? {}),
    [source]: 20,
  };
}

function setExtendSearchResultSuccess(
  stateDraft: WritableDraft<SearchResultState>,
  { payload: { itemId, source, result } }: ExtendSearchResultSuccessAction,
) {
  const { result: results, extensions } = stateDraft;
  const item = results?.find(item => item?.id === itemId);

  if (!item) return;

  item.sources[source] = result as any;
  delete extensions[source]?.[itemId];
}

function setExtendSearchResultFailure(
  stateDraft: WritableDraft<SearchResultState>,
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
  stateDraft: WritableDraft<SearchResultState>,
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
  stateDraft: WritableDraft<SearchResultState>,
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
  stateDraft: WritableDraft<SearchResultState>,
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
