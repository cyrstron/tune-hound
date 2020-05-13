import {takeEvery, call, put, all, select} from 'redux-saga/effects';

import { PlayBySourceIdAction, setPlaylist, setIsPlayerPending, setPlayerError, play } from "../../actions";
import { PLAY_BY_SOURCE_ID } from "../../consts";
import { PlayerTrack, PlaylistType, PlayerSource } from '../../types';
import { getPlaylistByTrackId } from './get-playlist-by-track-id';
import { getPlaylistByAlbumId } from './get-playlist-by-album-id';
import { getPlaylistById } from './get-playlist-by-id';
import { selectNativePlaylistId, selectIsPlaying, selectPlaylistType, selectPlayingSource } from '../../selectors';

export function* watchPlayBySourceId() {
  yield takeEvery(PLAY_BY_SOURCE_ID, playBySourceIdSaga);
}

export function* playBySourceIdSaga({payload: {source, id, type}}: PlayBySourceIdAction) {
  const [playingId, isPlaying, playingType, playingSource]: [
    number | string, 
    boolean, 
    PlaylistType,
    PlayerSource,
  ] = yield all([
    select(selectNativePlaylistId),
    select(selectIsPlaying),
    select(selectPlaylistType),
    select(selectPlayingSource),
  ]);

  if (!isPlaying && playingType === type && playingId === id && (playingSource === source || playingSource === 'url')) {
    const playAction = play();

    yield put(playAction);

    return;
  }

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