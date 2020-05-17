import { watchInitAudio } from "./init-saga";
import {spawn} from 'redux-saga/effects';

export function* audioSaga() {
  yield spawn(watchInitAudio);
}