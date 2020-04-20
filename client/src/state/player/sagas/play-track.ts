import { takeEvery } from "redux-saga/effects";
import {PLAY_TRACK} from '../consts';
import { PlayTrackAction } from "../actions";

export function* playTrackFlow() {
  takeEvery(PLAY_TRACK, playTrack);
}

export function* playTrack({payload: {track}}: PlayTrackAction) {

}