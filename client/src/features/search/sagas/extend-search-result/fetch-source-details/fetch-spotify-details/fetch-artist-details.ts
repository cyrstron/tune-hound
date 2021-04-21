import { SpotifyService } from '@app/state/spotify/services/spotify-service';
import { SPOTIFY_SERVICE_CTX_KEY } from '@app/consts';
import { call, getContext, all } from 'redux-saga/effects';
import { retrieveAccessToken } from '@app/state/spotify/sagas/retrieve-access-token';
import { SpotifyArtistSourceItemShort, SpotifyArtistSourceItemFull } from '@app/features/search/search/types';

export function* fetchArtistDetails(artist: SpotifyArtistSourceItemShort): any {
  const spotifyService: SpotifyService = yield getContext(SPOTIFY_SERVICE_CTX_KEY);

  const accessToken: string = yield call(retrieveAccessToken);

  const [{ items: albums }, { tracks: topTracks }]: [
    SpotifyApi.ArtistsAlbumsResponse,
    SpotifyApi.ArtistsTopTracksResponse,
  ] = yield all([
    spotifyService.api.getArtistAlbums(artist.id, accessToken),
    spotifyService.api.getArtistTopTracks(artist.id, accessToken),
  ]);

  const result: SpotifyArtistSourceItemFull = {
    ...artist,
    albums,
    topTracks,
    isFull: true,
  };

  return result;
}
