import {getContext, takeEvery, call, spawn, put} from 'redux-saga/effects';
import { AudioService } from '../../services/audio-service';
import { SPOTIFY_SERVICE_CTX_KEY } from '@app/consts';
import { listenAudioEvents } from './listen-service-events';
import { applyPlayerState } from './apply-player-state';
import { watchPlayerState } from './watch-player-state';
import { INIT_APP } from '@app/state/consts';
import { setAudioMounted } from '../../actions';
import { SpotifyService } from '@app/state/spotify/services/spotify-service';
import { listenSpotifyEvents } from './listen-spotify-events';

export function* initSpotifyPlayer() {
  const spotifyService: SpotifyService = yield getContext(SPOTIFY_SERVICE_CTX_KEY);

  yield call(applyPlayerState, spotifyService);

  yield call(listenSpotifyEvents, spotifyService);

  yield spotifyService.connect();

  yield spawn(watchPlayerState);
}
