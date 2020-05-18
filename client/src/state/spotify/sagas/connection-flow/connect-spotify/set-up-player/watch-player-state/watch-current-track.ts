import {takeEvery, getContext, put, select, call, all} from 'redux-saga/effects';
import {SET_CURRENT_TRACK} from '@app/state/player/consts';
import {SPOTIFY_SERVICE_CTX_KEY} from '@app/consts';
import {SetCurrentTrackAction} from '@app/state/player/actions';
import {SpotifyService} from '@app/state/spotify/services/spotify-service';
import {selectSpotifyCurrentTrack, selectSpotifyPlayerDeviceId} from '@app/state/spotify/selectors';
import {retrieveAccessToken} from '@app/state/spotify/sagas/retrieve-access-token';
import {setSpotifyPlayerError} from '@app/state/spotify/actions';

export function* setCurrentTrack({
  payload: {track, isAutoplay},
}: SetCurrentTrackAction): any {
  const spotifyService: SpotifyService = yield getContext(SPOTIFY_SERVICE_CTX_KEY);

  if (track.source !== 'spotify') return;

  const [
    currentTrack,
    deviceId,
  ]: [Spotify.Track | undefined, string] = yield all([
    select(selectSpotifyCurrentTrack),
    select(selectSpotifyPlayerDeviceId),
  ]);

  try {
    if (!currentTrack || currentTrack.id !== track.trackSource.id) {
      const accessToken: string = yield call(retrieveAccessToken);

      yield spotifyService.api.playTrackById(deviceId, track.trackSource.id, accessToken);
    } else if (isAutoplay) {
      yield spotifyService.player.seek(0);
      yield spotifyService.player.resume();
    } else {
      yield spotifyService.player.seek(0);
      yield spotifyService.player.pause();
    }
  } catch (err) {
    const errorAction = setSpotifyPlayerError(err);

    yield put(errorAction);
  }
}

export function* watchCurrentTrack(): any {
  yield takeEvery(SET_CURRENT_TRACK, setCurrentTrack);
}
