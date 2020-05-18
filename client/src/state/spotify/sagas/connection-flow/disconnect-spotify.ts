import {getContext, put} from 'redux-saga/effects';
import {SpotifyService} from '../../services/spotify-service';
import {SPOTIFY_SERVICE_CTX_KEY} from '@app/consts';
import {disconnectSpotify} from '../../actions';
import {resetSpotifyAuthState} from '../../services/helpers';
import {EventChannel} from 'redux-saga';

export function* disconnectSpotifySaga(channels: {
  [key: string]: EventChannel<any>;
}): any {
  const spotifyService: SpotifyService = yield getContext(SPOTIFY_SERVICE_CTX_KEY);

  spotifyService.disconnect();

  resetSpotifyAuthState();

  const disconnectAction = disconnectSpotify();

  Object.keys(channels).forEach((key) => {
    channels[key].close();
  });

  yield put(disconnectAction);
}
