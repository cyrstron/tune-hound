import {eventChannel, EventChannel, END} from 'redux-saga';
import {take, put} from 'redux-saga/effects';
import { SpotifyService } from '../../../../services/spotify-service';
import { setSpotifyPlayerState } from '@app/state/spotify/actions';

export function createPlayerStateChannel(
  spotifyService: SpotifyService
): EventChannel<Spotify.PlaybackState | null> {
  const {player} = spotifyService;

  if (!player) {
    throw new Error('Spotify player wasn\'t mounted')
  };

  return eventChannel<Spotify.PlaybackState | null>(emitter => {
    player.addListener('player_state_changed', emitter);
      
    return () => {
      player.removeListener('player_state_changed', emitter);
    };
  });
}

export function* watchPlayerStateChange(channel: EventChannel<Spotify.PlaybackState | null>) {
  while (true) {
    const state: Spotify.PlaybackState | null | END = yield take(channel);
    
    if (
      state &&
      typeof state === 'object' && 
      'type' in state
    ) {
      return;
    }

    const stateAction = setSpotifyPlayerState(state);

    yield put(stateAction);
  }
}
