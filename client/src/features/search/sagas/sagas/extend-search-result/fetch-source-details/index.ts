import { call } from 'redux-saga/effects';
import {
  SearchSource,
  SourceItemShort,
  DeezerSourceItemShort,
  SpotifySourceItemShort,
  SourceItem,
} from '@app/state/search/types';
import { fetchDeezerDetails } from './fetch-deezer-details';
import { fetchSpotifyDetails } from './fetch-spotify-details';

export function* fetchSourceDetails(searchItem: SourceItemShort, source: SearchSource): any {
  let result: SourceItem = searchItem;

  if (source === 'deezer') {
    result = yield call(fetchDeezerDetails, result as DeezerSourceItemShort);
  } else if (source === 'spotify') {
    result = yield call(fetchSpotifyDetails, result as SpotifySourceItemShort);
  }

  return result;
}
