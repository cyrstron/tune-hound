import {
  PlaySearchResultAction,
  extendSearchResult,
  ExtendSearchResultSuccessAction,
  ExtendSearchResultFailureAction,
} from '../../actions';
import { takeEvery, select, call, put, take, race } from 'redux-saga/effects';
import {
  PLAY_SEARCH_RESULT,
  EXTEND_SEARCH_RESULT_SUCCESS,
  EXTEND_SEARCH_RESULT_FAILURE,
} from '../../consts';
import { createSearchResultSelector } from '../../selectors';
import { pickDefaultSource } from './pick-default-source';
import { SearchResult, SearchSource } from '../../types';
import { playSearchedTrackSaga } from './play-searched-track';
import { playSearchedAlbumSaga } from './play-search-album';
import { playSearchedArtistSaga } from './play-searched-artist';
import { playSearchedPlaylistSaga } from './play-searched-playlist';
import { selectCanDeezerPlay } from '@app/state/deezer';
import { selectCanSpotifyPlay } from '@app/state/spotify';

export function* playSearchResultSaga({
  payload: { itemId, source, index },
}: PlaySearchResultAction): any {
  let searchItem: SearchResult = yield select(createSearchResultSelector(itemId));

  const playSource: SearchSource = source || (yield call(pickDefaultSource, searchItem));

  if (!playSource || !searchItem.sources[playSource]) throw new Error('Play source is not defined');

  let canSourcePlay = false;

  if (playSource === 'deezer') {
    canSourcePlay = yield select(selectCanDeezerPlay);
  } else if (playSource === 'spotify') {
    canSourcePlay = yield select(selectCanSpotifyPlay);
  }

  const sourceObject = searchItem.sources[playSource]!;

  if (!sourceObject.isFull) {
    const action = extendSearchResult(itemId, playSource);

    yield put(action);

    let isExtended: boolean | undefined;

    while (isExtended === undefined) {
      const {
        success,
        error,
      }: {
        success?: ExtendSearchResultSuccessAction;
        error?: ExtendSearchResultFailureAction;
      } = yield race({
        success: take(EXTEND_SEARCH_RESULT_SUCCESS),
        error: take(EXTEND_SEARCH_RESULT_FAILURE),
      });

      const action = success || error;

      if (!action) continue;

      const { itemId, source } = action.payload;

      if (itemId !== searchItem.id || source !== source) continue;

      isExtended = !!success;
    }

    if (!isExtended) return;

    searchItem = yield select(createSearchResultSelector(itemId));
  }

  if (searchItem.type === 'track') {
    yield call(playSearchedTrackSaga, searchItem, playSource, canSourcePlay);
  } else if (searchItem.type === 'album') {
    yield call(playSearchedAlbumSaga, searchItem, playSource, index, canSourcePlay);
  } else if (searchItem.type === 'artist') {
    yield call(playSearchedArtistSaga, searchItem, playSource, index, canSourcePlay);
  } else if (searchItem.type === 'playlist') {
    yield call(playSearchedPlaylistSaga, searchItem, playSource, index, canSourcePlay);
  }
}

export function* watchPlaySearchResult(): any {
  yield takeEvery(PLAY_SEARCH_RESULT, playSearchResultSaga);
}
