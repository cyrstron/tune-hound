import {call, put, take} from 'redux-saga/effects';
import {searchSimilarWithDeezer} from './search-similar-with-deezer';
import { SearchResult, SearchItem } from '@app/state/search/types';
import { setOptionsForExtend, PickOptionForExtendAction } from '@app/state/search/actions';
import { PICK_OPTION_FOR_EXTEND } from '@app/state/search/consts';

export function* getDeezerSourceItem(item: SearchResult) {
  const results = yield call(searchSimilarWithDeezer, item);
  
  if (results.length === 1) {
    return results[0];
  }

  yield put(setOptionsForExtend(item.id, 'deezer', results));

  let result: SearchItem | null | undefined;

  while(result === undefined) {
    const {
      payload: {itemId, pickedItem, source}
    }: PickOptionForExtendAction = yield take(PICK_OPTION_FOR_EXTEND);

    if (itemId === item.id && source === 'deezer') {
      result = pickedItem;
    }
  }

  return result;
}