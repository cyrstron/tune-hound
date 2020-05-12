import {takeEvery, call, put} from 'redux-saga/effects';

import { PlayBySourceIdAction, setPlaylist, setIsPlayerPending, setPlayerError } from "../../actions";
import { PLAY_BY_SOURCE_ID } from "../../consts";
import { PlayerTrack } from '../../types';
import { getPlaylistByTrackId } from './get-playlist-by-track-id';
import { getPlaylistByAlbumId } from './get-playlist-by-album-id';
import { getPlaylistById } from './get-playlist-by-id';

export function* watchPlayBySourceId() {
  yield takeEvery(PLAY_BY_SOURCE_ID, playBySourceIdSaga);
}

export function* playBySourceIdSaga({payload: {source, id, type}}: PlayBySourceIdAction) {

  const pendingAction = setIsPlayerPending(true);

  yield put(pendingAction);

  let tracks: PlayerTrack[] = [];

  try {
    switch (type) {
      case 'track':
        tracks = yield call(getPlaylistByTrackId, id, source);
        break;
      case 'album':
        tracks = yield call(getPlaylistByAlbumId, id, source);
        break;
      case 'playlist':
        tracks = yield call(getPlaylistById, id, source);
        break;
    }
  
    const action = setPlaylist(`${id}`, type, tracks, id);
  
    yield put(action);

  } catch (err) {
    const failAction = setPlayerError(err);

    yield put(failAction);
  }

}