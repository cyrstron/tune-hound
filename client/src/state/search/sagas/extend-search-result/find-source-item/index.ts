import { take, call, race, select, all } from 'redux-saga/effects';
import { SearchResult, SearchSource, SourceItemShort } from '@app/state/search/types';
import { fetchMoreItems } from './fetch-more-items';
import {
  PICK_OPTION_FOR_EXTEND,
  RESET_OPTIONS_FOR_EXTEND,
  FETCH_NEXT_OPTIONS_FOR_EXTEND,
} from '@app/state/search/consts';
import {
  PickOptionForExtendAction,
  ResetOptionsForExtendAction,
  FetchNextOptionsForExtendAction,
} from '@app/state/search/actions';
import {
  selectExtensionHasMoreItemsToFetch,
  selectItemsForExtension,
} from '@app/state/search/selectors';

export function* findSourceItem(searchResultItem: SearchResult, source: SearchSource): any {
  yield call(fetchMoreItems, searchResultItem, source);

  const [results, hasLadMore]: [SourceItemShort[], boolean] = yield all([
    select(selectItemsForExtension, searchResultItem.id, source),
    select(selectExtensionHasMoreItemsToFetch, searchResultItem.id, source),
  ]);

  if (!hasLadMore && results.length === 0) {
    return null;
  } else if (!hasLadMore && results.length === 1) {
    return results[0];
  }

  let picked: SourceItemShort | null | undefined;

  while (picked === undefined) {
    const {
      pick,
      reset,
      fetchMore,
    }: {
      pick?: PickOptionForExtendAction;
      reset?: ResetOptionsForExtendAction;
      fetchMore?: FetchNextOptionsForExtendAction;
    } = yield race({
      pick: take(PICK_OPTION_FOR_EXTEND),
      reset: take(RESET_OPTIONS_FOR_EXTEND),
      fetchMore: take(FETCH_NEXT_OPTIONS_FOR_EXTEND),
    });

    const action = pick || reset || fetchMore;

    if (!action) continue;

    const { itemId, source } = action.payload;

    if (itemId !== searchResultItem.id || source !== source) continue;

    if (action.type === FETCH_NEXT_OPTIONS_FOR_EXTEND) {
      yield call(fetchMoreItems, searchResultItem, source);
    }
    if (action.type === PICK_OPTION_FOR_EXTEND) {
      picked = action.payload.pickedItem;
    }
    if (action.type === RESET_OPTIONS_FOR_EXTEND) break;
  }

  return picked;
}
