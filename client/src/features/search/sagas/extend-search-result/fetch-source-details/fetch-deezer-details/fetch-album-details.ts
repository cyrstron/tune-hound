import { DeezerAlbumSourceItemShort, DeezerAlbumSourceItemFull } from '@app/features/search/search/types';
import { DeezerAlbumFull } from '@app/state/deezer/types';
import { DeezerService } from '@app/state/deezer';
import { DEEZER_SERVICE_CTX_KEY } from '@app/consts';
import { getContext } from 'redux-saga/effects';

export function* fetchAlbumDetails(album: DeezerAlbumSourceItemShort): any {
  const deezerService: DeezerService = yield getContext(DEEZER_SERVICE_CTX_KEY);

  const fullAlbum: DeezerAlbumFull = yield deezerService.api.getAlbum(album.id);

  const result: DeezerAlbumSourceItemFull = {
    ...fullAlbum,
    isFull: true,
  };

  return result;
}
