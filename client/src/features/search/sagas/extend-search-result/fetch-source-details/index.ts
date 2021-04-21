import {
  DeezerSourceItemShort,
  SearchSource,
  SourceItem,
  SourceItemShort,
  SpotifySourceItemShort,
} from '@app/features/search/state/types';
import { call } from 'redux-saga/effects';
import { fetchDeezerDetails } from './fetch-deezer-details';
import { fetchSpotifyDetails } from './fetch-spotify-details';

export function* fetchSourceDetails(searchItem: SourceItemShort, source: SearchSource): any {
  let result: SourceItem = searchItem;

  if (source === SearchSource.DEEZER) {
    result = yield call(fetchDeezerDetails, result as DeezerSourceItemShort);
  } else if (source === SearchSource.SPOTIFY) {
    result = yield call(fetchSpotifyDetails, result as SpotifySourceItemShort);
  }

  return result;
}
