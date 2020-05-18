import {call, spawn} from 'redux-saga/effects';
import {applyPlayerState} from './apply-player-state';
import {watchPlayerState} from './watch-player-state';
import {SpotifyService} from '@app/state/spotify/services/spotify-service';
import {listenSpotifyEvents} from './listen-spotify-events';
import {EventChannel} from 'redux-saga';

export function* setUpSpotifyPlayer(spotifyService: SpotifyService): any {
  yield call(applyPlayerState, spotifyService);

  const channels: {[key: string]: EventChannel<any>} = yield call(
    listenSpotifyEvents,
    spotifyService,
  );

  yield spotifyService.connect();

  yield spawn(watchPlayerState);

  return channels;
}
