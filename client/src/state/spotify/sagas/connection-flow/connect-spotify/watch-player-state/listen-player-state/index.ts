import { eventChannel, EventChannel, END } from 'redux-saga';
import { take, put, select, call, cancelled, getContext } from 'redux-saga/effects';
import { setSpotifyPlayerState } from '@app/state/spotify/actions';
import { SpotifyService } from '@app/state/spotify/services/spotify-service';
import { selectSpotifyPlaybackState } from '@app/state/spotify/selectors';
import throttle from 'lodash/throttle';
import { onCurrentTrackChange } from './current-track-handler';
import { onPlayChange } from './play-handler';
import { onPositionChange } from './position-handler';
import { onTrackEnd } from './track-end-handler';
import { SPOTIFY_SERVICE_CTX_KEY } from '@app/consts';

export function* watchPlayerStateChange(): any {
  const spotifyService: SpotifyService = yield getContext(SPOTIFY_SERVICE_CTX_KEY);

  const state = yield spotifyService.getState();

  const stateAction = setSpotifyPlayerState(state);

  yield put(stateAction);

  const channel = createPlayerStateChannel(spotifyService);

  while (true) {
    try {
      const state: Spotify.PlaybackState | null | END = yield take(channel);

      if (state && typeof state === 'object' && 'type' in state) {
        return;
      }

      const prevState: Spotify.PlaybackState | null = yield select(selectSpotifyPlaybackState);

      if (prevState?.paused !== state?.paused) {
        yield call(onPlayChange, spotifyService, !!state && !state.paused);
      }

      if (prevState?.position !== state?.position) {
        yield call(onPositionChange, spotifyService, state?.position);
      }

      if (
        prevState?.['track_window']['current_track'].id !==
        state?.['track_window']['current_track'].id
      ) {
        yield call(onCurrentTrackChange, spotifyService, state?.['track_window']['current_track']);
      }

      if (
        prevState?.['track_window']['previous_tracks'][0]?.id ===
          state?.['track_window']['current_track'].id &&
        prevState &&
        prevState.position < 200
      ) {
        yield call(onTrackEnd, spotifyService);
      }

      const stateAction = setSpotifyPlayerState(state);

      yield put(stateAction);
    } finally {
      if (yield cancelled()) {
        channel.close();
      }
    }
  }
}

export function createPlayerStateChannel(
  spotifyService: SpotifyService,
): EventChannel<Spotify.PlaybackState | null> {
  const { player } = spotifyService;

  if (!player) {
    throw new Error("Spotify player wasn't mounted");
  }

  return eventChannel<Spotify.PlaybackState | null>(emitter => {
    const onStateChange = throttle((state: Spotify.PlaybackState | null) => {
      emitter(state);
    }, 200);

    player.addListener('player_state_changed', onStateChange);

    return (): any => {
      player.removeListener('player_state_changed', onStateChange);
    };
  });
}
