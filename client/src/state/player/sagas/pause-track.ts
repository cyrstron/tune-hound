import { takeEvery, getContext, all, call, select, take } from "redux-saga/effects";
import {PAUSE} from '../consts';
import { PlayTrackAction } from "../actions";
import { SPOTIFY_SERVICE_CTX_KEY, DEEZER_SERVICE_CTX_KEY } from "@app/consts";
import { retrieveAccessToken } from "@app/state/spotify/sagas/retrieve-access-token";
import { selectSpotifyPlayerDeviceId } from "@app/state/spotify";
import { SpotifyService } from "@app/state/spotify/services/spotify-service";
import { DeezerService, SetPlayerBufferingAction } from "@app/state/deezer";
import { SET_PLAYER_BUFFERING } from "@app/state/deezer/consts";

export function* playTrackFlow() {
  yield takeEvery(PAUSE, pauseTrack);
}

export function* pauseTrack() {
  const playingTrack = yield select();

}