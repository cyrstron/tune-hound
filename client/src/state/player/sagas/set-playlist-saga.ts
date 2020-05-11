import {takeEvery, put} from 'redux-saga/effects';
import { SET_PLAYLIST } from '../consts';
import { SetPlaylistAction, setCurrentTrack } from '../actions';

export function* watchSetPlaylist() {
  yield takeEvery(SET_PLAYLIST, setPlaylistSaga);
}

export function* setPlaylistSaga({payload: {tracks, index = 0}}: SetPlaylistAction) {
  const currentTrack = tracks[index];

  const action = setCurrentTrack(currentTrack, index, true);

  yield put(action);
}