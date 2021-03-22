import {takeEvery, getContext, select, put} from 'redux-saga/effects';
import {SetIsMutedAction} from '@app/state/player/actions';
import {SET_IS_MUTED} from '@app/state/player/consts';
import {SPOTIFY_SERVICE_CTX_KEY} from '@app/consts';
import {SpotifyService} from '@app/state/spotify/services/spotify-service';
import {selectIsMuted, selectVolume} from '@app/state/player/selectors';
import {setSpotifyPlayerError} from '@app/state/spotify/actions';

export function* updatePlayerMute({payload: {isMuted}}: SetIsMutedAction): any {
  const spotifyService: SpotifyService = yield getContext(SPOTIFY_SERVICE_CTX_KEY);

  try {
    if (isMuted) {
      yield spotifyService.player.setVolume(0);
    } else {
      const volume = yield select(selectVolume);

      yield spotifyService.player.setVolume(volume);
    }
  } catch (err) {
    const errorAction = setSpotifyPlayerError(err);

    yield put(errorAction);
  }
}

export function* watchPlayerMute(): any {
  
  const spotifyService: SpotifyService = yield getContext(SPOTIFY_SERVICE_CTX_KEY);

  const isMuted = yield select(selectIsMuted);

  try {
    if (isMuted) {
      yield spotifyService.player.setVolume(0);
    }
    
    yield takeEvery(SET_IS_MUTED, updatePlayerMute);
  } catch (err) {
    const errorAction = setSpotifyPlayerError(err);

    yield put(errorAction);
  }
}
