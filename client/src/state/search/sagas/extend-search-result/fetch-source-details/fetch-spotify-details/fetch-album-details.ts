import { SpotifyService } from '@app/state/spotify/services/spotify-service';
import { getContext, call } from 'redux-saga/effects';
import { SPOTIFY_SERVICE_CTX_KEY } from '@app/consts';
import { retrieveAccessToken } from '@app/state/spotify/sagas/retrieve-access-token';
import { SpotifyAlbumSourceItemShort, SpotifyAlbumSourceItemFull } from '@app/state/search/types';

export function* fetchAlbumDetails(album: SpotifyAlbumSourceItemShort): any {
  const spotifyService: SpotifyService = yield getContext(SPOTIFY_SERVICE_CTX_KEY);

  const accessToken: string = yield call(retrieveAccessToken);

  const fullAlbum: SpotifyApi.AlbumObjectFull = yield spotifyService.api.getAlbum(
    album.id,
    accessToken,
  );

  const result: SpotifyAlbumSourceItemFull = {
    ...fullAlbum,
    isFull: true,
  };

  return result;
}
