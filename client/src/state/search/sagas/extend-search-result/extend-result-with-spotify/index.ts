import {fork, call} from 'redux-saga/effects';
import {getSpotifySourceItem} from './get-spotify-source-item';
import { SearchResult } from '@app/state/search/types';
import {fetchItemDetails} from './fetch-item-details';

export function* extendResultWithSpotify(item: SearchResult) {
  let {deezer} = item.sources;

  if (!deezer) {
    deezer = yield fork(getSpotifySourceItem, item);
  }

  if (!deezer) {
    return null;
  }

  const extendedResult = yield call(fetchItemDetails, deezer);

  return extendedResult;
}