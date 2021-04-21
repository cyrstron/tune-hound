import {
  FetchNextOptionsForExtendAction,
  PickOptionForExtendAction,
  ResetOptionsForExtendAction,
} from '@app/features/search/state';
import {
  FETCH_NEXT_OPTIONS_FOR_EXTEND,
  PICK_OPTION_FOR_EXTEND,
  RESET_OPTIONS_FOR_EXTEND,
} from '@app/features/search/state/consts';
import {
  selectExtensionCanFetchByIdAndSource,
  selectExtensionItemsByIdAndSource,
} from '@app/features/search/state/selectors';
import { SearchResult, SearchSource, SourceItemShort } from '@app/features/search/state/types';
import { take, call, race, select, all } from 'redux-saga/effects';
import { fetchMoreItems } from './fetch-more-items';

export function* findSourceItem(searchResultItem: SearchResult, source: SearchSource): any {
  yield call(fetchMoreItems, searchResultItem, source);

  const [results, hasLadMore]: [SourceItemShort[], boolean] = yield all([
    select(selectExtensionItemsByIdAndSource, searchResultItem.id, source),
    select(selectExtensionCanFetchByIdAndSource, searchResultItem.id, source),
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
