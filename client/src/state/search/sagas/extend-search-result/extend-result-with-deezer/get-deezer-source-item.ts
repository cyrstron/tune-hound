import {call, put } from 'redux-saga/effects';
import {searchSimilarWithDeezer} from './search-similar-with-deezer';
import { SearchResult } from '@app/state/search/types';
import { setOptionsForExtend } from '@app/state/search/actions';
import { waitForItemPicked } from '../wait-for-item-picked';

export function* getDeezerSourceItem(item: SearchResult) {
  const results = yield call(searchSimilarWithDeezer, item);

  if (results.length === 0) {
    return null;
  }
  
  if (results.length === 1) {
    return results[0];
  }

  yield put(setOptionsForExtend(item.id, 'deezer', results));

  const picked = yield call(waitForItemPicked, item.id, 'deezer');

  return picked
}