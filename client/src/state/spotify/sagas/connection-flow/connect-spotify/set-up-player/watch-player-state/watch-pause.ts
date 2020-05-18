import {takeEvery, getContext, select, put} from 'redux-saga/effects';
import {PAUSE} from '@app/state/player/consts';
import {SPOTIFY_SERVICE_CTX_KEY} from '@app/consts';
import {selectPlayingSource} from '@app/state/player/selectors';
import {SpotifyService} from '@app/state/spotify/services/spotify-service';
import {setSpotifyPlayerError} from '@app/state/spotify/actions';

export function* updatePause(): any {
  const spotifyService: SpotifyService = yield getContext(SPOTIFY_SERVICE_CTX_KEY);

  const playingSource = yield select(selectPlayingSource);

  if (playingSource !== 'spotify') return;


  try {
    yield spotifyService.player.pause();
  } catch (err) {
    const errorAction = setSpotifyPlayerError(err);

    yield put(errorAction);
  }
}

export function* watchPause(): any {
  yield takeEvery(PAUSE, updatePause);
}
