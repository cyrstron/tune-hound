import {throttle, getContext, put} from 'redux-saga/effects';
import {SetVolumeAction} from '@app/state/player/actions';
import {SET_VOLUME} from '@app/state/player/consts';
import {SPOTIFY_SERVICE_CTX_KEY} from '@app/consts';
import {SpotifyService} from '@app/state/spotify/services/spotify-service';
import {setSpotifyPlayerError} from '@app/state/spotify/actions';

export function* updatePlayerVolume({payload: {volume}}: SetVolumeAction): any {
  const spotifyService: SpotifyService = yield getContext(SPOTIFY_SERVICE_CTX_KEY);

  try {
    yield spotifyService.player.setVolume(volume / 100);
  } catch (err) {
    const errorAction = setSpotifyPlayerError(err);

    yield put(errorAction);
  }
}

export function* watchPlayerVolume(): any {
  yield throttle(500, SET_VOLUME, updatePlayerVolume);
}
