import { SpotifyService } from "@app/state/spotify/services/spotify-service";
import { getContext, call, all } from "redux-saga/effects";
import { SPOTIFY_SERVICE_CTX_KEY } from "@app/consts";
import { retrieveAccessToken } from "@app/state/spotify/sagas/retrieve-access-token";

export function* fetchPlaylistDetails(playlist: SpotifyApi.PlaylistObjectSimplified) {
  const spotifyService: SpotifyService = yield getContext(SPOTIFY_SERVICE_CTX_KEY);

  const accessToken: string = yield call(retrieveAccessToken);

  const fullPlaylist: SpotifyApi.PlaylistObjectFull = yield spotifyService.api.getPlaylist(playlist.id, accessToken);

  return {
    ...fullPlaylist,
    isFull: true,
  };
}