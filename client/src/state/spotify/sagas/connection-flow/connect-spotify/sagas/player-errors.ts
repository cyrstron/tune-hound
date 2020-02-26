import {eventChannel, EventChannel, END} from 'redux-saga';
import {take} from 'redux-saga/effects';
import { SpotifyService } from '../../../../services/spotify-service';

export function createPlayerErrorsChannel(
  spotifyService: SpotifyService
): EventChannel<Spotify.Error> {
  const {player} = spotifyService;

  if (!player) {
    throw new Error('Spotify player wasn\'t mounted');
  };

  return eventChannel<Spotify.Error>(emitter => {
    player.addListener('initialization_error', emitter);
    player.addListener('authentication_error', emitter);
    player.addListener('account_error', emitter);
    player.addListener('playback_error', emitter);
      
    return () => {
      player.removeListener('initialization_error', emitter);
      player.removeListener('authentication_error', emitter);
      player.removeListener('account_error', emitter);
      player.removeListener('playback_error', emitter);
    };
  });
}

export function* watchPlayerErrors(channel: EventChannel<Spotify.Error>) {
  while (true) {
    const error: Spotify.Error | END = yield take(channel);

    if (
      typeof error === 'object' && 
      'type' in error && 
      error.type === END.type
    ) {
      return;
    }

    console.log(error);
  }
}