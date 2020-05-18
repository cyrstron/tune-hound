import {watchInitAudio} from './init-saga';
import {spawn} from 'redux-saga/effects';

export function* audioSaga(): any {
  yield spawn(watchInitAudio);
}
