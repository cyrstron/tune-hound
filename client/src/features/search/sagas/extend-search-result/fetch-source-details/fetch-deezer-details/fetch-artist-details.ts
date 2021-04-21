import {
  DeezerArtistSourceItemShort,
  DeezerArtistSourceItemFull,
} from '@app/features/search/state/types';
import { DEEZER_SERVICE_CTX_KEY } from '@app/consts';
import { DeezerService } from '@app/state/deezer';
import { getContext, all } from 'redux-saga/effects';
import { DeezerTrack, DeezerAlbum } from '@app/state/deezer/types';

export function* fetchArtistDetails(artist: DeezerArtistSourceItemShort): any {
  const deezerService: DeezerService = yield getContext(DEEZER_SERVICE_CTX_KEY);

  const [topTracks, albums]: [
    { data: DeezerTrack[]; total: number },
    { data: DeezerAlbum[]; total: number },
  ] = yield all([
    deezerService.api.getArtistTopTracks(artist.id),
    deezerService.api.getArtistAlbums(artist.id),
  ]);

  const result: DeezerArtistSourceItemFull = {
    ...artist,
    topTracks,
    albums,
    isFull: true,
  };

  return result;
}
