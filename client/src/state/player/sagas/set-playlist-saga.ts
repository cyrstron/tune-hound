import {takeEvery, put} from 'redux-saga/effects';
import { SET_PLAYLIST, PLAY_TRACK } from '../consts';
import { SetPlaylistAction, setCurrentTrack } from '../actions';

export function* watchSetPlaylist() {
  yield takeEvery(SET_PLAYLIST, setPlaylistSaga);
}

export function* setPlaylistSaga({payload: {tracks}}: SetPlaylistAction) {
  const currentIndex = 0;
  const currentTrack = tracks[currentIndex];

  const action = setCurrentTrack(currentTrack, currentIndex, true);

  yield put(action);
}