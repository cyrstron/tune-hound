import {SpotifyService} from '@app/state/spotify/services/spotify-service';
import {select, put} from 'redux-saga/effects';
import {selectPlayingSource} from '@app/state/player/selectors';
import {setSpotifyPlayerError} from '@app/state/spotify/actions';
import {playNext} from '@app/state/player/actions';

export function* onTrackEnd(spotifyService: SpotifyService): any {
  const playingSource = yield select(selectPlayingSource);

  if (playingSource !== 'spotify') return;

  try {
    yield spotifyService.player.pause();
  } catch (err) {
    const errorAction = setSpotifyPlayerError(err);

    yield put(errorAction);
  }

  const nextAction = playNext();

  yield put(nextAction);
}
