import {throttle, getContext, put, select, all} from 'redux-saga/effects';
import {SetVolumeAction} from '@app/state/player/actions';
import {SET_VOLUME} from '@app/state/player/consts';
import {SPOTIFY_SERVICE_CTX_KEY} from '@app/consts';
import {SpotifyService} from '@app/state/spotify/services/spotify-service';
import {setSpotifyPlayerError} from '@app/state/spotify/actions';
import { selectIsMuted, selectVolume } from '@app/state/player/selectors';

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
  const spotifyService: SpotifyService = yield getContext(SPOTIFY_SERVICE_CTX_KEY);

  const [isMuted, volume]: [
    boolean,
    number,
  ] = yield all([
    select(selectIsMuted),
    select(selectVolume),
  ]);

  try {
    if (!isMuted) {
      yield spotifyService.player.setVolume(volume / 100);
    }
    
    yield throttle(500, SET_VOLUME, updatePlayerVolume);
  } catch (err) {
    const errorAction = setSpotifyPlayerError(err);

    yield put(errorAction);
  }
}
