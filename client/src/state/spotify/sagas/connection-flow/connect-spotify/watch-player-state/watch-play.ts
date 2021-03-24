import { takeEvery, getContext, select, call, all, put } from 'redux-saga/effects';
import { PLAY } from '@app/state/player/consts';
import { SPOTIFY_SERVICE_CTX_KEY } from '@app/consts';
import { selectCurrentTrack } from '@app/state/player/selectors';
import { PlayerTrack } from '@app/state/player/types';
import {
  selectSpotifyCurrentTrack,
  selectSpotifyPlayerDeviceId,
} from '@app/state/spotify/selectors';
import { retrieveAccessToken } from '@app/state/spotify/sagas/retrieve-access-token';
import { SpotifyService } from '@app/state/spotify/services/spotify-service';
import { setSpotifyPlayerError } from '@app/state/spotify/actions';

export function* watchPlay(): any {
  yield takeEvery(PLAY, updatePlay);
}

export function* updatePlay(): any {
  const spotifyService: SpotifyService = yield getContext(SPOTIFY_SERVICE_CTX_KEY);

  const currentTrack: PlayerTrack | undefined = yield select(selectCurrentTrack);

  if (currentTrack?.source !== 'spotify') return;

  const [playingTrack, deviceId]: [Spotify.Track | undefined, string] = yield all([
    select(selectSpotifyCurrentTrack),
    select(selectSpotifyPlayerDeviceId),
  ]);

  try {
    if (!playingTrack || playingTrack.id !== currentTrack.trackSource.id) {
      const accessToken: string = yield call(retrieveAccessToken);

      yield spotifyService.api.playTrackById(deviceId, currentTrack.trackSource.id, accessToken);
    } else {
      yield spotifyService.player.resume();
    }
  } catch (err) {
    const errorAction = setSpotifyPlayerError(err);

    yield put(errorAction);
  }
}
