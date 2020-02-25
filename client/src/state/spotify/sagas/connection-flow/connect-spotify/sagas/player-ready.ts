import {eventChannel, EventChannel, END} from 'redux-saga';
import {take, put} from 'redux-saga/effects';
import { SpotifyService } from '../../../../services/spotify-service';
import { setSpotifyPlayerReady } from '@app/state/spotify/actions';

export function createPlayerReadyChannel(
  spotifyService: SpotifyService
): EventChannel<{
  instance: Spotify.WebPlaybackInstance;
  isReady: boolean;
}> {
  const {player} = spotifyService;

  if (!player) {
    throw new Error('Spotify player wasn\'t mounted')
  };

  return eventChannel<{
    instance: Spotify.WebPlaybackInstance;
    isReady: boolean;
  }>(emitter => {
    const onReady = (instance: Spotify.WebPlaybackInstance) => {
      emitter({
        instance,
        isReady: true,
      });
    };
    const onNotReady = (instance: Spotify.WebPlaybackInstance) => {
      emitter({
        instance,
        isReady: false,
      });
    };

    player.addListener('ready', onReady);
    player.addListener('not_ready', onNotReady);
      
    return () => {
      player.removeListener('ready', onReady);
      player.removeListener('not_ready', onNotReady);
    };
  });
}

export function* watchPlayerReady(
  channel: EventChannel<{
    instance: Spotify.WebPlaybackInstance;
    isReady: boolean;
  }>
) {
  while (true) {
    const readyEvent: {
      instance: Spotify.WebPlaybackInstance;
      isReady: boolean;
    } | END = yield take(channel);

    if (
      typeof readyEvent === 'object' && 
      'type' in readyEvent
    ) {
      return;
    }

    const {instance, isReady} = readyEvent;

    const readyAction = setSpotifyPlayerReady(instance, isReady);
    
    yield put(readyAction);
  }
}