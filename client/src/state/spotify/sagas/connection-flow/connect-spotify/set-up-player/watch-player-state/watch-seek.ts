import {takeEvery, getContext, select, put} from 'redux-saga/effects';
import {SEEK} from '@app/state/player/consts';
import {SPOTIFY_SERVICE_CTX_KEY} from '@app/consts';
import {selectCurrentTrack} from '@app/state/player/selectors';
import {SeekAction} from '@app/state/player/actions';
import {SpotifyService} from '@app/state/spotify/services/spotify-service';
import {setSpotifyPlayerError} from '@app/state/spotify/actions';

export function* executeSeek({payload: {position}}: SeekAction): any {
  const spotifyService: SpotifyService = yield getContext(SPOTIFY_SERVICE_CTX_KEY);

  const currentTrack = yield select(selectCurrentTrack);

  if (currentTrack?.source !== 'spotify') return;

  try {
    yield spotifyService.player.seek(position * currentTrack.duration * 10);
  } catch (err) {
    const errorAction = setSpotifyPlayerError(err);

    yield put(errorAction);
  }
}

export function* watchSeek(): any {
  yield takeEvery(SEEK, executeSeek);
}

