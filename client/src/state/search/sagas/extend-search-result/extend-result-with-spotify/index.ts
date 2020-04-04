import {fork, call} from 'redux-saga/effects';
import {getSpotifySourceItem} from './get-spotify-source-item';
import { SearchResult } from '@app/state/search/types';
import {fetchItemDetails} from './fetch-item-details';

export function* extendResultWithSpotify(item: SearchResult) {
  let {spotify} = item.sources;

  if (!spotify) {
    spotify = yield fork(getSpotifySourceItem, item);
  }

  if (!spotify) {
    return null;
  }

  const extendedResult = yield call(fetchItemDetails, spotify);

  return extendedResult;
}