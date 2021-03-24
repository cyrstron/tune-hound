import { SpotifyService } from '@app/state/spotify/services/spotify-service';
import { all, select, put } from 'redux-saga/effects';
import { PlayerTrack } from '@app/state/player/types';
import { selectCurrentTrack, selectIsPlaying } from '@app/state/player/selectors';
import { selectSpotifyCurrentTrack } from '@app/state/spotify/selectors';
import { setIsPlaying } from '@app/state/player/actions';
import { setSpotifyPlayerError } from '@app/state/spotify/actions';

export function* onPlayChange(spotifyService: SpotifyService, isPlaying: boolean): any {
  const [currentTrack, isPlayerPlaying, playingTrack]: [
    PlayerTrack | undefined,
    boolean,
    Spotify.Track | undefined,
  ] = yield all([
    select(selectCurrentTrack),
    select(selectIsPlaying),
    select(selectSpotifyCurrentTrack),
  ]);

  const isCurrentTrackSet =
    currentTrack?.source === 'spotify' &&
    playingTrack &&
    playingTrack.id === currentTrack.trackSource.id;

  if (isCurrentTrackSet && isPlaying !== isPlayerPlaying) {
    const pauseAction = setIsPlaying(isPlaying);

    yield put(pauseAction);
  } else if (isPlaying && !isCurrentTrackSet && !isPlayerPlaying) {
    try {
      yield spotifyService.player.pause();
    } catch (err) {
      const errorAction = setSpotifyPlayerError(err);

      yield put(errorAction);
    }
  }
}
