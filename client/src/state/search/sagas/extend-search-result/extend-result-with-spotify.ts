import {getContext} from 'redux-saga/effects';
import { SearchResult } from "../../types";
import { SpotifyService } from "@app/state/spotify/services/spotify-service";
import { SPOTIFY_SERVICE_CTX_KEY } from '@app/consts';

export function* extendResultWithSpotify(item: SearchResult) {
  const spotifyService: SpotifyService = yield getContext(SPOTIFY_SERVICE_CTX_KEY);

  return null;
}