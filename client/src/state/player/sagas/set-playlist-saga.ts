import { takeEvery, put } from 'redux-saga/effects';
import { SET_PLAYLIST } from '../consts';
import { SetPlaylistAction, setCurrentTrack } from '../actions';

export function* setPlaylistSaga({ payload: { tracks, index = 0 } }: SetPlaylistAction): any {
  const currentTrack = tracks[index];

  const action = setCurrentTrack(currentTrack, index, true);

  yield put(action);
}

export function* watchSetPlaylist(): any {
  yield takeEvery(SET_PLAYLIST, setPlaylistSaga);
}
