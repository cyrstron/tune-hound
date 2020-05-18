import {takeEvery, all, select, put} from 'redux-saga/effects';
import {PLAY_NEXT} from '../consts';
import {selectPlaylist, selectPlayedIndexes, selectNextIndex} from '../selectors';
import {PlayerTrack} from '../types';
import {resetPlayedIndexes, setCurrentTrack} from '../actions';

export function* playNextSaga(): any {
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

export function* watchPlayNext(): any {
  yield takeEvery(PLAY_NEXT, playNextSaga);
}
