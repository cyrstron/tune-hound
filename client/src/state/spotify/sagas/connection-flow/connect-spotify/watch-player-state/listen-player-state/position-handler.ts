import { SpotifyService } from '@app/state/spotify/services/spotify-service';
import { PlayerTrack } from '@app/state/player/types';
import { all, select, put } from 'redux-saga/effects';
import { selectCurrentTrack, selectIsPlaying } from '@app/state/player/selectors';
import { setPosition } from '@app/state/player/actions';
import { setSpotifyPlayerError } from '@app/state/spotify/actions';

export function* onPositionChange(
  spotifyService: SpotifyService,
  position: number | undefined,
): any {
  const [currentTrack, isPlayerPlaying]: [PlayerTrack | undefined, boolean] = yield all([
    select(selectCurrentTrack),
    select(selectIsPlaying),
  ]);

  if (currentTrack?.source === 'spotify' && isPlayerPlaying) {
    const action = setPosition(position ? (position / (currentTrack.duration * 1000)) * 100 : 0);

    yield put(action);
  } else {
    try {
      yield spotifyService.player.pause();
    } catch (err) {
      const errorAction = setSpotifyPlayerError(err);

      yield put(errorAction);
    }
  }
}
