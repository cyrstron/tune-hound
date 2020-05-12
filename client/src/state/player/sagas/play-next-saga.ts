import {takeEvery, all, select, put, delay} from 'redux-saga/effects';
import { PLAY_NEXT } from '../consts';
import { selectPlaylist, selectPlayedIndexes, selectNextIndex, selectIsPlaying, selectIsPlayerPending } from '../selectors';
import { PlayerTrack } from '../types';
import { resetPlayedIndexes, setCurrentTrack, setIsPlayerPending} from '../actions';

export function* watchPlayNext() {
  yield takeEvery(PLAY_NEXT, playNextSaga);
}

export function* playNextSaga() {
  const [
    playedIndexes,
    tracks,
  ]: [
    number[],
    PlayerTrack[],
  ] = yield all([
    select(selectPlayedIndexes),
    select(selectPlaylist),
  ]);

  if (tracks.length === playedIndexes.length) {
    const action = resetPlayedIndexes();

    yield put(action);
  }

  const nextIndex: number | undefined = yield select(selectNextIndex);

  const isAutoplayed = nextIndex !== undefined;
  const index = nextIndex ?? 0;
  const track = tracks[index];

  const action = setCurrentTrack(track, index, isAutoplayed);

  yield put(action);
}
