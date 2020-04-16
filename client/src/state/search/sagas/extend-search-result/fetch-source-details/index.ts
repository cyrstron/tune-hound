import {call} from 'redux-saga/effects';
import { SearchSource, SearchItem, DeezerSearchItem, SpotifySearchItem } from "@app/state/search/types";
import {fetchDeezerDetails} from './fetch-deezer-details';
import {fetchSpotifyDetails} from './fetch-spotify-details';

export function* fetchSourceDetails(searchItem: SearchItem, source: SearchSource) {
  let result: SearchItem = searchItem;

  if (source === 'deezer') {
    result = yield call(fetchDeezerDetails, result as DeezerSearchItem);
  } else if (source === 'spotify') {
    result = yield call(fetchSpotifyDetails, result as SpotifySearchItem);
  }

  return result;
}