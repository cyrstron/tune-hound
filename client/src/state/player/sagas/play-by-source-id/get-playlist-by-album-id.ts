import {getContext, call, select} from 'redux-saga/effects';
import { SearchSource } from "@app/state/search/types";
import { SpotifyService } from "@app/state/spotify/services/spotify-service";
import { SPOTIFY_SERVICE_CTX_KEY, DEEZER_SERVICE_CTX_KEY } from "@app/consts";
import { retrieveAccessToken } from "@app/state/spotify/sagas/retrieve-access-token";
import { DeezerService, selectCanDeezerPlay } from "@app/state/deezer";
import { DeezerAlbumFull } from '@app/state/deezer/types';
import { selectCanSpotifyPlay } from '@app/state/spotify';
import { mapPlayerAlbumFromDeezer, mapPlayerAlbumFromSpotify } from './services';

export function* getPlaylistByAlbumId(id: string | number, source: SearchSource) {
  if (source === 'spotify') {
    const canPlay = yield select(selectCanSpotifyPlay);
    const spotifyService: SpotifyService = yield getContext(SPOTIFY_SERVICE_CTX_KEY);

    const accessToken = yield call(retrieveAccessToken);

    const album: SpotifyApi.AlbumObjectFull = yield spotifyService.api.getAlbum(
      id as string, 
      accessToken
    );
    
    return mapPlayerAlbumFromSpotify(album, canPlay);
  } else if (source === 'deezer') {
    const canPlay = yield select(selectCanDeezerPlay);
    const deezerService: DeezerService = yield getContext(DEEZER_SERVICE_CTX_KEY);

    const album: DeezerAlbumFull = yield deezerService.api.getAlbum(id as number);

    return mapPlayerAlbumFromDeezer(album, canPlay);
  }
}