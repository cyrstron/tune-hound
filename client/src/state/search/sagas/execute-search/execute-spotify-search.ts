import {put, call, select} from 'redux-saga/effects';
import { getContext } from "redux-saga/effects";
import { SPOTIFY_SERVICE_CTX_KEY } from "@app/consts";
import { updateSpotifyTokenSaga } from "@app/state/spotify/sagas/update-token";
import { executeSearchPending, executeSearchSuccess, executeSearchFailure } from '../../actions';
import { SpotifySearchOptions } from '@app/state/spotify/types';
import { SpotifyService } from '@app/state/spotify/services/spotify-service';
import { selectSpotifyAccessToken } from '@app/state/spotify';

export function* executeSpotifySearchSaga(options: SpotifySearchOptions, limit?: number, offset?: number) {
  const spotifySearch: SpotifyService = yield getContext(SPOTIFY_SERVICE_CTX_KEY);

  const pendingAction = executeSearchPending();

  yield put(pendingAction);

  yield call(updateSpotifyTokenSaga);

  const accessToken: string = yield select(selectSpotifyAccessToken);

  try {
    const {
      tracks, 
      albums, 
      playlists, 
      artists
    }: SpotifyApi.SearchResponse = yield spotifySearch.search({
      ...options,
      limit,
      offset,
    }, accessToken);

    const successAction = executeSearchSuccess(result);

    yield put(successAction);
  } catch (err) {
    const failureAction = executeSearchFailure(err);

    yield put(failureAction);
  }
};