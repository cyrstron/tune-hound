import { AppSelector, AppState } from '..';
import {
  SearchSource,
  DeezerSourceItemShort,
  SpotifySourceItemShort,
  SourceItemShort,
} from './types';
import { SearchState } from './reducer';
import { getSearchOptions } from './helpers';
import { createSelector } from 'reselect';
import { memoize } from '@app/utils/memoize/memoize';
import { createParamsSelector } from '@app/utils/create-params-selector';

export const selectSearchState = (state: AppState): SearchState => state.search;

export const selectSearchResult = createSelector([selectSearchState], search => search.result);

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
  [selectSearchResult, (_state: any, id?: string) => id],
  (searchResult, id) => searchResult?.find(item => item.id === id),
  { cacheSize: 1000 },
);

export const createSearchResultSelector = memoize((id: string) =>
  createSelector([selectSearchResult], searchResult => searchResult?.find(item => item.id === id)),
);

export const selectResultsPage = createSelector(
  [selectSearchResult, selectPageIndex, selectPageSize],
  (searchResult, pageIndex, pageSize) =>
    searchResult?.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize),
);

export const selectSearchExtentions = createSelector(
  [selectSearchState],
  search => search.extensions,
);

export const createExtensionSubStateSelector = memoize((id: string, source?: SearchSource) =>
  createSelector([selectSearchExtentions], extentions => source && extentions[source]?.[id]),
);

export type GetItemsForExtensionByIdAndSourceOverload = {
  (id: string, source: SearchSource.DEEZER): AppSelector<DeezerSourceItemShort[] | undefined>;
  (id: string, source: SearchSource.SPOTIFY): AppSelector<SpotifySourceItemShort[] | undefined>;
  (id: string, source: SearchSource): AppSelector<SourceItemShort[] | undefined>;
};

export const createItemsForExtensionSelector = memoize((id: string, source: SearchSource) =>
  createSelector([createExtensionSubStateSelector(id, source)], subState => subState?.results),
) as GetItemsForExtensionByIdAndSourceOverload;

export const createExtensionPendingSelector = memoize((id: string, source: SearchSource) =>
  createSelector([createExtensionSubStateSelector(id, source)], subState => !!subState?.isPending),
);

export const createOneOfExtensionsPendingSelector = memoize((id: string) =>
  createSelector(
    [
      createExtensionPendingSelector(id, SearchSource.DEEZER),
      createExtensionPendingSelector(id, SearchSource.SPOTIFY),
    ],
    (isDeezerPending, isSpotifyPending) => isDeezerPending || isSpotifyPending,
  ),
);

export const createAllItemsForExtensionSelector = memoize((id: string) =>
  createSelector(
    [
      createItemsForExtensionSelector(id, SearchSource.DEEZER),
      createItemsForExtensionSelector(id, SearchSource.SPOTIFY),
    ],
    (deezer, spotify) => ({
      deezer,
      spotify,
    }),
  ),
);

export const createItemsForExtensionOffsetSelector = memoize((id: string, source?: SearchSource) =>
  createSelector([createExtensionSubStateSelector(id, source)], substate => substate?.offset || 0),
);

export const createItemsForExtensionTotalsSelector = memoize((id: string, source?: SearchSource) =>
  createSelector([createExtensionSubStateSelector(id, source)], subState => subState?.totals ?? []),
);

export const createSearchOptionsSelector = memoize((id: string, source?: SearchSource) =>
  createSelector([createSearchResultSelector(id)], searchResult => {
    if (!source) return undefined;

    return searchResult && getSearchOptions(searchResult, source);
  }),
);

export const createExtensionHasItemsToFetchSelector = memoize((id: string, source?: SearchSource) =>
  createSelector(
    [
      createSearchOptionsSelector(id, source),
      createItemsForExtensionTotalsSelector(id, source),
      createItemsForExtensionOffsetSelector(id, source),
    ],
    (searchOptions, totals, offset) => {
      if (!searchOptions) return false;

      const fullTotal = totals?.[searchOptions.length - 1];

      return fullTotal !== undefined && offset !== undefined && fullTotal > offset;
    },
  ),
);

export const createItemsForExtensionLimitSelector = memoize((id: string, source?: SearchSource) =>
  createSelector(
    [createExtensionSubStateSelector(id, source)],
    substate => (source && substate?.limit) || 20,
  ),
);
