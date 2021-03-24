import { AppState } from '..';
import {
  SearchSource,
  SourceItem,
  DeezerSourceItemShort,
  SpotifySourceItemShort,
  SearchResult,
  SearchOptions,
} from './types';
import { ExtensionSubState } from './reducer';
import { getSearchOptions } from './helpers';

export const selectSearchResult = (state: AppState): SearchResult[] | undefined =>
  state.search.result;

export const selectPageIndex = (state: AppState): number => state.search.pageIndex;

export const selectPageSize = (state: AppState): number => state.search.pageSize;

export const selectSearchQuery = (state: AppState): SearchOptions | undefined =>
  state.search.searchQuery;

export const selectSearchSource = (state: AppState): SearchSource | undefined =>
  state.search.searchSource;

export const selectTotalItems = (state: AppState): number | undefined => state.search.total;

export const selectIsSearchPending = (state: AppState): boolean => state.search.isPending;

export const selectSearchError = (state: AppState): Error | undefined => state.search.error;

export const selectSearchResultById = (state: AppState, id: string): SearchResult | undefined =>
  selectSearchResult(state)?.find(item => !!item && item.id === id);

export const selectResultsPage = (state: AppState): SearchResult[] | undefined => {
  const result = selectSearchResult(state);

  if (!result) return undefined;

  const pageIndex = selectPageIndex(state);
  const pageSize = selectPageSize(state);

  return result.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);
};

export const selectTotalPages = (state: AppState): number | undefined => {
  const totalItems = selectTotalItems(state);
  const pageSize = selectPageSize(state);

  return totalItems === undefined ? undefined : Math.ceil(totalItems / pageSize);
};

export function selectExtensionSubState(
  state: AppState,
  id: string,
  source: SearchSource,
): ExtensionSubState | undefined {
  return state.search.extensions[source]?.[id];
}

export function selectItemsForExtension(
  state: AppState,
  id: string,
  source: SearchSource,
): SourceItem[] | undefined {
  return selectExtensionSubState(state, id, source)?.results;
}

export function selectExtensionPending(state: AppState, id: string, source: SearchSource): boolean {
  return !!selectExtensionSubState(state, id, source)?.isPending;
}

export function selectOneOfExtensionsPending(state: AppState, id: string): boolean {
  return (
    selectExtensionPending(state, id, 'deezer') || selectExtensionPending(state, id, 'spotify')
  );
}

export const selectItemsForExtensionById = (
  state: AppState,
  id: string,
): {
  deezer?: DeezerSourceItemShort[];
  spotify?: SpotifySourceItemShort[];
} => {
  return {
    deezer: selectItemsForExtension(state, id, 'deezer') as DeezerSourceItemShort[] | undefined,
    spotify: selectItemsForExtension(state, id, 'spotify') as SpotifySourceItemShort[] | undefined,
  };
};

export const selectItemsForExtensionOffsetById = (
  state: AppState,
  id: string,
  source: SearchSource,
): number => selectExtensionSubState(state, id, source)?.offset || 0;

export const selectItemsForExtensionTotalsById = (
  state: AppState,
  id: string,
  source: SearchSource,
): Array<number | undefined> => selectExtensionSubState(state, id, source)?.totals || [];

export const selectExtensionHasMoreItemsToFetch = (
  state: AppState,
  id: string,
  source: SearchSource,
): boolean => {
  const item = selectSearchResultById(state, id);

  if (!item) return false;

  const searchOptions = getSearchOptions(item, source);

  const fullTotal = selectItemsForExtensionTotalsById(state, id, source)?.[
    searchOptions.length - 1
  ];
  const offset = selectItemsForExtensionOffsetById(state, id, source);

  return fullTotal !== undefined && offset !== undefined && fullTotal > offset;
};

export const selectItemsForExtensionLimitById = (
  state: AppState,
  id: string,
  source: SearchSource,
): number => selectExtensionSubState(state, id, source)?.limit || 20;
