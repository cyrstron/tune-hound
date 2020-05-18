import {SpotifyService} from '@app/state/spotify/services/spotify-service';
import {selectCurrentTrack} from '@app/state/player/selectors';
import {select, put} from 'redux-saga/effects';
import {PlayerTrack} from '@app/state/player/types';
import {setSpotifyPlayerError} from '@app/state/spotify/actions';

export function* onCurrentTrackChange(
  spotifyService: SpotifyService,
  track: Spotify.Track | undefined,
): any {
  const currentTrack: PlayerTrack | undefined = yield select(selectCurrentTrack);

  if (
    currentTrack &&
    currentTrack.source === 'spotify' &&
    currentTrack.trackSource.id === track?.id
  ) return;

  try {
    yield spotifyService.player.pause();
  } catch (err) {
    const errorAction = setSpotifyPlayerError(err);

    yield put(errorAction);
  }
}
