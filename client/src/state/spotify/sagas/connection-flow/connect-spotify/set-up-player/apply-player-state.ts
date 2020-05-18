import {all, select, put} from 'redux-saga/effects';
import {selectIsMuted, selectVolume} from '@app/state/player/selectors';
import {SpotifyService} from '@app/state/spotify/services/spotify-service';
import {setSpotifyPlayerError} from '@app/state/spotify/actions';

export function* applyPlayerState(audioService: SpotifyService): any {
  const [isMuted, volume]: [
    boolean,
    number,
  ] = yield all([
    select(selectIsMuted),
    select(selectVolume),
  ]);

  try {
    if (isMuted) {
      yield audioService.player.setVolume(0);
    } else {
      yield audioService.player.setVolume(volume / 100);
    }
  } catch (err) {
    const errorAction = setSpotifyPlayerError(err);

    yield put(errorAction);
  }
}
