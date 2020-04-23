import { takeEvery, getContext, all, call, select, take } from "redux-saga/effects";
import {PLAY_TRACK} from '../consts';
import { PlayTrackAction } from "../actions";
import { SPOTIFY_SERVICE_CTX_KEY, DEEZER_SERVICE_CTX_KEY } from "@app/consts";
import { retrieveAccessToken } from "@app/state/spotify/sagas/retrieve-access-token";
import { selectSpotifyPlayerDeviceId } from "@app/state/spotify";
import { SpotifyService } from "@app/state/spotify/services/spotify-service";
import { DeezerService, SetPlayerBufferingAction } from "@app/state/deezer";
import { SET_PLAYER_BUFFERING } from "@app/state/deezer/consts";

export function* playTrackFlow() {
  yield takeEvery(PLAY_TRACK, playTrack);
}

export function* playTrack({payload: {track}}: PlayTrackAction) {
  if (track.source === 'spotify') {
    const spotifyService: SpotifyService = yield getContext(SPOTIFY_SERVICE_CTX_KEY);

    const [deviceId, accessToken]: [string, string] = yield all([
      select(selectSpotifyPlayerDeviceId),
      call(retrieveAccessToken),
    ]);

    yield spotifyService.api.playTrackById(deviceId, track.trackSource.id, accessToken)
  } else if (track.source === 'deezer') {
    const deezerService: DeezerService = yield getContext(DEEZER_SERVICE_CTX_KEY);

    yield deezerService.player.playTracks([track.trackSource.id]);

    let buffered: number | undefined;

    while(buffered === undefined || buffered !== 100) {
      const {payload}: SetPlayerBufferingAction = yield take(SET_PLAYER_BUFFERING);

      buffered = payload.buffered;
    }

    deezerService.player.play();

    // const [deviceId, accessToken]: [string, string] = yield all([
    //   select(selectSpotifyPlayerDeviceId),
    //   call(retrieveAccessToken),
    // ]);

    // yield deezerService.playTrackById(deviceId, track.trackSource.id, accessToken)
  }

}