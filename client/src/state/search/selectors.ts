import { AppState } from "..";

export const selectSearchResult = (state: AppState) => state.search.result;
export const selectPageIndex = (state: AppState) => state.search.pageIndex;
export const selectPageSize = (state: AppState) => state.search.pageSize;
export const selectSearchQuery = (state: AppState) => state.search.searchQuery;
export const selectSearchSource = (state: AppState) => state.search.searchSource;
export const selectTotalItems = (state: AppState) => state.search.total;
export const selectIsSearchPending = (state: AppState) => state.search.isPending;
export const selectSearchError = (state: AppState) => state.search.error;

export const selectSearchResultById = (state: AppState, id: string) => selectSearchResult(state)?.find(
  (item) => !!item && item.id === id
);

export const selectResultsPage = (state: AppState) => {
  const result = selectSearchResult(state);

  if (!result) return undefined;

  const pageIndex = selectPageIndex(state);
  const pageSize = selectPageSize(state);

  return result.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);
}

export const selectTotalPages = (state: AppState) => {
  const totalItems = selectTotalItems(state);
  const pageSize = selectPageSize(state);

  return totalItems === undefined ? 
    undefined :
    Math.ceil(totalItems / pageSize);
}