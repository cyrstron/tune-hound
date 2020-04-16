import { SpotifyService } from "@app/state/spotify/services/spotify-service";
import { SPOTIFY_SERVICE_CTX_KEY } from "@app/consts";
import {call, getContext} from 'redux-saga/effects'
import { retrieveAccessToken } from "@app/state/spotify/sagas/retrieve-access-token";

export function* fetchArtistDetails(artist: SpotifyApi.ArtistObjectSimplified) {
  const spotifyService: SpotifyService = yield getContext(SPOTIFY_SERVICE_CTX_KEY);

  const accessToken: string = yield call(retrieveAccessToken);

  const fullArtist: SpotifyApi.ArtistObjectFull = yield spotifyService.api.getArtist(artist.id, accessToken)

  return {
    ...fullArtist,
    isFull: true,
  };
}