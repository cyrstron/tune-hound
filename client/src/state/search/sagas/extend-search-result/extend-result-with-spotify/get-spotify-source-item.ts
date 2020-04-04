import {call, put, take} from 'redux-saga/effects';
import {searchSimilarWithSpotify} from './search-similar-with-spotify';
import { SearchResult, SearchItem } from '@app/state/search/types';
import { setOptionsForExtend, PickOptionForExtendAction } from '@app/state/search/actions';
import { PICK_OPTION_FOR_EXTEND } from '@app/state/search/consts';

export function* getSpotifySourceItem(item: SearchResult) {
  const {tracks, albums, artists}: SpotifyApi.SearchResponse = yield call(searchSimilarWithSpotify, item);

  const results = tracks?.items || albums?.items || artists?.items;

  if (!results) {
    return null;
  }
  
  if (results.length === 1) {
    return results[0];
  }

  yield put(setOptionsForExtend(item.id, 'spotify', results));

  let result: SearchItem | null | undefined;

  while(result === undefined) {
    const {
      payload: {itemId, pickedItem, source}
    }: PickOptionForExtendAction = yield take(PICK_OPTION_FOR_EXTEND);

    if (itemId === item.id && source === 'spotify') {
      result = pickedItem;
    }
  }

  return result;
}