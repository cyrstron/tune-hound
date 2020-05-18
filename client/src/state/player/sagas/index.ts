import {spawn} from 'redux-saga/effects';
import {watchPlayNext} from './play-next-saga';
import {watchSetPlaylist} from './set-playlist-saga';
import {watchPlayPrev} from './play-prev-saga';
import {watchPlayBySourceId} from './play-by-source-id';

export function* playerSaga(): any {
  yield spawn(watchPlayNext);
  yield spawn(watchPlayPrev);
  yield spawn(watchSetPlaylist);
  yield spawn(watchPlayBySourceId);
}
