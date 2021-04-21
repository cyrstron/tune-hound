import { AppState } from '../../../state';
import {
  SearchSource,
  DeezerSourceItemShort,
  SpotifySourceItemShort,
  SourceItemShort,
} from './types';
import { SearchState } from './reducer';
import { getSearchOptions } from './helpers';
import { createSelector } from 'reselect';
import { createParamsSelector } from '@app/state/selectors/utils/create-params-selector';
import { getFirstParam, getSecondParam } from '@app/state/selectors/utils/get-nth-agrument';
import partialRight from 'lodash/partialRight';

export const selectSearchState = (state: AppState): SearchState => state.search;

export const selectSearchResults = createSelector([selectSearchState], search => search.result);

export const selectPageIndex = createSelector([selectSearchState], search => search.pageIndex);

export const selectPageSize = createSelector([selectSearchState], search => search.pageSize);

export const selectSearchQuery = createSelector([selectSearchState], search => search.searchQuery);

export const selectSearchSource = createSelector(
  [selectSearchState],
  search => search.searchSource,
);

export const selectTotalItems = createSelector([selectSearchState], search => search.total);

export const selectTotalPages = createSelector(
  [selectTotalItems, selectPageSize],
  (itemsNumber, pageSize) =>
    itemsNumber !== undefined ? Math.ceil(itemsNumber / pageSize) : undefined,
);

export const selectIsSearchPending = createSelector(
  [selectSearchState],
  search => search.isPending,
);

export const selectSearchError = createSelector([selectSearchState], search => search.error);

export const selectSearchResultById = createParamsSelector(
  [selectSearchResults, getFirstParam<string>()],
  (searchResult, id) => searchResult?.find(item => item.id === id),
);

export const selectResultsPage = createSelector(
  [selectSearchResults, selectPageIndex, selectPageSize],
  (searchResult, pageIndex, pageSize) =>
    searchResult?.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize),
);

export const selectSearchExtensions = createSelector(
  [selectSearchState],
  search => search.extensions,
);

export const selectExtensionSubStateByIdAndSource = createParamsSelector(
  [selectSearchExtensions, getFirstParam<string>(), getSecondParam<SearchSource>()],
  (extensions, id, source) => source && extensions[source]?.[id],
);

export type GetItemsForExtensionByIdAndSourceOverload = {
  (state: AppState, id: string, source: SearchSource.DEEZER): DeezerSourceItemShort[] | undefined;
  (state: AppState, id: string, source: SearchSource.SPOTIFY): SpotifySourceItemShort[] | undefined;
  (state: AppState, id: string, source: SearchSource): SourceItemShort[] | undefined;
};

export const selectExtensionItemsByIdAndSource = createSelector(
  [selectExtensionSubStateByIdAndSource],
  subState => subState?.results,
) as GetItemsForExtensionByIdAndSourceOverload;

export const selectExtensionPendingByIdAndSource = createSelector(
  [selectExtensionSubStateByIdAndSource],
  subState => !!subState?.isPending,
);

export const selectSomeExtensionPendingById = createSelector(
  [
    partialRight(selectExtensionPendingByIdAndSource, SearchSource.DEEZER) as (
      state: AppState,
      id: string,
    ) => boolean,
    partialRight(selectExtensionPendingByIdAndSource, SearchSource.SPOTIFY) as (
      state: AppState,
      id: string,
    ) => boolean,
  ],
  (isDeezerPending, isSpotifyPending) => isDeezerPending || isSpotifyPending,
);

export const selectAllExtensionItemsById = createParamsSelector(
  [
    partialRight(selectExtensionItemsByIdAndSource, SearchSource.DEEZER) as (
      state: AppState,
      id: string,
    ) => DeezerSourceItemShort[] | undefined,
    partialRight(selectExtensionItemsByIdAndSource, SearchSource.SPOTIFY) as (
      state: AppState,
      id: string,
    ) => SpotifySourceItemShort[] | undefined,
  ],
  (deezer, spotify) => ({
    deezer,
    spotify,
  }),
);

export const selectExtensionItemsOffsetByIdAndSource = createSelector(
  [selectExtensionSubStateByIdAndSource],
  subState => subState?.offset || 0,
);

export const selectExtensionItemsTotalsByIdAndSource = createSelector(
  [selectExtensionSubStateByIdAndSource],
  subState => subState?.totals ?? [],
);

export const selectSearchOptionsByIdAndSource = createParamsSelector(
  [selectSearchResultById, getSecondParam<SearchSource>()],
  (searchResult, source) => {
    return searchResult && getSearchOptions(searchResult, source);
  },
);

export const selectExtensionCanFetchByIdAndSource = createSelector(
  [
    selectSearchOptionsByIdAndSource,
    selectExtensionItemsTotalsByIdAndSource,
    selectExtensionItemsOffsetByIdAndSource,
  ],
  (searchOptions, totals, offset) => {
    if (!searchOptions) return false;

    const fullTotal = totals?.[searchOptions.length - 1];

    return fullTotal !== undefined && offset !== undefined && fullTotal > offset;
  },
);

export const selectExtensionItemsLimitByIdAndSource = createSelector(
  [selectExtensionSubStateByIdAndSource],
  subState => subState?.limit || 20,
);
