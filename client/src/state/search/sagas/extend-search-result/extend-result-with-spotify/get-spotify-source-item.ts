import {call } from 'redux-saga/effects';
import {searchSimilarWithSpotify} from './search-similar-with-spotify';
import { SearchResult, SpotifySearchItem } from '@app/state/search/types';
import { waitForItemPicked } from '../wait-for-item-picked';

export function* getSpotifySourceItem(item: SearchResult) {
  const results: SpotifySearchItem[] = yield call(searchSimilarWithSpotify, item);

  if (results.length === 0) {
    return null;
  }
  
  if (results.length === 1) {
    return results[0];
  }

  const picked = yield call(waitForItemPicked, item.id, 'spotify', results);

  return picked;
}