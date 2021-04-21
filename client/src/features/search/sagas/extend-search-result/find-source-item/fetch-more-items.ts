import {
  fetchOptionsForExtendFailure,
  fetchOptionsForExtendPending,
  fetchOptionsForExtendSuccess,
  setExtensionOffset,
  setExtensionTotals,
} from '@app/features/search/state';
import { getSearchOptions } from '@app/features/search/state/helpers';
import {
  selectExtensionItemsByIdAndSource,
  selectExtensionItemsLimitByIdAndSource,
  selectExtensionItemsOffsetByIdAndSource,
  selectExtensionItemsTotalsByIdAndSource,
} from '@app/features/search/state/selectors';
import { SearchResult, SearchSource, SourceItemShort } from '@app/features/search/state/types';
import { put, call, all, select } from 'redux-saga/effects';
import { fetchSearchItems } from './fetch-search-items';

export function* fetchMoreItems(searchResultItem: SearchResult, source: SearchSource): any {
  const searchOptions = getSearchOptions(searchResultItem, source);

  const [limit, offset, totals, extensionItems = []]: [
    number,
    number,
    Array<number | undefined>,
    SourceItemShort[],
  ] = yield all([
    select(selectExtensionItemsLimitByIdAndSource, searchResultItem.id, source),
    select(selectExtensionItemsOffsetByIdAndSource, searchResultItem.id, source),
    select(selectExtensionItemsTotalsByIdAndSource, searchResultItem.id, source),
    select(selectExtensionItemsByIdAndSource, searchResultItem.id, source),
  ]);

  const fullTotal = totals[searchOptions.length - 1];

  if (fullTotal !== undefined && offset >= fullTotal) return;

  const pendingAction = fetchOptionsForExtendPending(searchResultItem.id, source);

  yield put(pendingAction);

  try {
    const results: SourceItemShort[] = [];
    const currentTotals: Array<number | undefined> = [...totals];

    let currentOffset = offset;
    let fullTotal = totals[searchOptions.length - 1];

    let queryIndex: number = searchOptions.reduceRight<number>((queryIndex, _query, index) => {
      const total = totals[index];

      return total === undefined || total < offset ? index : queryIndex;
    }, 0);

    let total = totals[queryIndex];
    let prevTotal = totals[queryIndex - 1] || 0;
    let requestLimit = total !== undefined ? Math.min(total - offset, limit) : limit;
    let requestOffset = total !== undefined ? offset - prevTotal : 0;

    while (results.length < limit && (fullTotal === undefined || fullTotal > currentOffset)) {
      const response: {
        total: number;
        results: SourceItemShort[];
      } = yield call(
        fetchSearchItems,
        source,
        searchOptions[queryIndex],
        requestLimit,
        requestOffset,
      );

      const { total: totalItems } = response;
      let { results: items } = response;

      currentTotals[queryIndex] = totalItems + prevTotal;
      currentOffset += items.length;

      if (queryIndex > 0) {
        items = items.filter(
          ({ id }) =>
            !extensionItems.some(item => item.id === id) && !results.some(item => item.id === id),
        );
      }

      results.push(...items);

      fullTotal = currentTotals[searchOptions.length - 1];

      queryIndex = currentOffset - prevTotal < totalItems ? queryIndex : queryIndex + 1;

      total = currentTotals[queryIndex];
      prevTotal = currentTotals[queryIndex - 1] || 0;

      requestLimit =
        total !== undefined
          ? Math.min(currentOffset - offset, total - currentOffset)
          : limit - (currentOffset - offset);
      requestOffset = total !== undefined ? currentOffset - prevTotal : 0;
    }

    const setOffsetAction = setExtensionOffset(searchResultItem.id, source, currentOffset);
    const setTotalsAction = setExtensionTotals(searchResultItem.id, source, currentTotals);
    const successAction = fetchOptionsForExtendSuccess(searchResultItem.id, source, results);

    yield all([put(successAction), put(setOffsetAction), put(setTotalsAction)]);
  } catch (err) {
    const failureAction = fetchOptionsForExtendFailure(searchResultItem.id, source, err);

    yield put(failureAction);
  }
}
