import { takeEvery, select, put, all } from 'redux-saga/effects';
import { PLAY_PREV } from '../consts';
import { selectPlaylist, selectPrevIndex, selectPlayerHistory } from '../selectors';
import { PlayerTrack } from '../types';
import { setCurrentTrack, setPlayerHistory } from '../actions';

export function* playPrevSaga(): any {
  const prevIndex: number | undefined = yield select(selectPrevIndex);

  if (prevIndex === undefined) return;

  const [tracks, history]: [PlayerTrack[], number[]] = yield all([
    select(selectPlaylist),
    select(selectPlayerHistory),
  ]);

  const historyUpdateAction = setPlayerHistory(history.slice(0, -2));

  yield put(historyUpdateAction);

  const action = setCurrentTrack(tracks[prevIndex], prevIndex, true);

  yield put(action);
}

export function* watchPlayPrev(): any {
  yield takeEvery(PLAY_PREV, playPrevSaga);
}
