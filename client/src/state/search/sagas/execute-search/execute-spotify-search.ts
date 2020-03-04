import {put} from 'redux-saga/effects';
import { getContext } from "redux-saga/effects";
import { DEEZER_SERVICE_CTX_KEY, SPOTIFY_SERVICE_CTX_KEY } from "@app/consts";
import { DeezerService } from "@app/state/deezer";
import { executeSearchPending, executeSearchSuccess, executeSearchFailure } from '../../actions';
import { SpotifySearchOptions } from '@app/state/spotify/types';
import { SpotifyService } from '@app/state/spotify/services/spotify-service';

export function* executeSpotifySearchSaga(options: SpotifySearchOptions) {
  const spotifySearch: SpotifyService = yield getContext(SPOTIFY_SERVICE_CTX_KEY);

  const pendingAction = executeSearchPending();

  yield put(pendingAction);

  try {
    const result = yield spotifySearch.search(options);

    const successAction = executeSearchSuccess(result);

    yield put(successAction);
  } catch (err) {
    const failureAction = executeSearchFailure(err);

    yield put(failureAction);
  }
};