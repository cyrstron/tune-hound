import { SpotifyService } from "@app/state/spotify/services/spotify-service";
import { getContext, call } from "redux-saga/effects";
import { SPOTIFY_SERVICE_CTX_KEY } from "@app/consts";
import { retrieveAccessToken } from "@app/state/spotify/sagas/retrieve-access-token";

export function* fetchAlbumDetails(album: SpotifyApi.AlbumObjectSimplified) {
  const spotifyService: SpotifyService = yield getContext(SPOTIFY_SERVICE_CTX_KEY);

  const accessToken: string = yield call(retrieveAccessToken);

  const fullAlbum: SpotifyApi.AlbumObjectFull = yield spotifyService.api.getAlbum(album.id, accessToken)

  return {
    ...fullAlbum,
    isFull: true,
  };
}