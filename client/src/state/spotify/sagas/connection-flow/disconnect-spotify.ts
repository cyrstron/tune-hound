import {getContext, put} from 'redux-saga/effects';
import { SpotifyService } from '../../services/spotify-service';
import { SPOTIFY_SERVICE_CTX_KEY } from '@app/consts';
import { disconnectSpotify } from '../../actions';
import {resetSpotifyAuthState} from '../../services/helpers';

export function* disconnectSpotifySaga() {  
  const spotifyService: SpotifyService = yield getContext(SPOTIFY_SERVICE_CTX_KEY);

  spotifyService.disconnect();
  
  resetSpotifyAuthState();

  const disconnectAction = disconnectSpotify();

  yield put(disconnectAction);
}
