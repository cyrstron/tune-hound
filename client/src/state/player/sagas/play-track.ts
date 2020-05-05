import { takeEvery, getContext, all, call, select, put } from "redux-saga/effects";
import {PLAY_TRACK} from '../consts';
import { PlayTrackAction, setPlaylist } from "../actions";
// import { SPOTIFY_SERVICE_CTX_KEY, DEEZER_SERVICE_CTX_KEY } from "@app/consts";
// import { retrieveAccessToken } from "@app/state/spotify/sagas/retrieve-access-token";
// import { selectSpotifyPlayerDeviceId } from "@app/state/spotify";
// import { SpotifyService } from "@app/state/spotify/services/spotify-service";
// import { DeezerService } from "@app/state/deezer";

export function* playTrackFlow() {
  yield takeEvery(PLAY_TRACK, playTrack);
}

export function* playTrack({payload: {track}}: PlayTrackAction) {
  const action = setPlaylist([track]);

  yield put(action);

  // if (track.source === 'spotify') {
  //   const spotifyService: SpotifyService = yield getContext(SPOTIFY_SERVICE_CTX_KEY);

  //   const [deviceId, accessToken]: [string, string] = yield all([
  //     select(selectSpotifyPlayerDeviceId),
  //     call(retrieveAccessToken),
  //   ]);

  //   yield spotifyService.api.playTrackById(deviceId, track.trackSource.id, accessToken)
  // } else if (track.source === 'deezer') {
  //   const deezerService: DeezerService = yield getContext(DEEZER_SERVICE_CTX_KEY);

  //   yield deezerService.player.playTracks([track.trackSource.id], true);    
  // }
}