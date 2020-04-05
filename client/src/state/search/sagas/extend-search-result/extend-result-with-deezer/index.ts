import {call} from 'redux-saga/effects';
import {getDeezerSourceItem} from './get-deezer-source-item';
import { SearchResult } from '@app/state/search/types';
import {fetchItemDetails} from './fetch-item-details';

export function* extendResultWithDeezer(item: SearchResult) {
  let {deezer} = item.sources;

  if (!deezer) {
    deezer = yield call(getDeezerSourceItem, item);
  }

  if (!deezer) {
    return deezer;
  }

  const extendedResult = yield call(fetchItemDetails, deezer);

  return extendedResult;
}