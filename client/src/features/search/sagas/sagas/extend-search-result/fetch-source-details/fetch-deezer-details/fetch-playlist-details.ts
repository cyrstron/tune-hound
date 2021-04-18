import {
  DeezerPlaylistSourceItemShort,
  DeezerPlaylistSourceItemFull,
} from '@app/state/search/types';
import { DeezerService } from '@app/state/deezer';
import { DEEZER_SERVICE_CTX_KEY } from '@app/consts';
import { DeezerPlaylistFull } from '@app/state/deezer/types';
import { getContext } from 'redux-saga/effects';

export function* fetchPlaylistDetails(playlist: DeezerPlaylistSourceItemShort): any {
  const deezerService: DeezerService = yield getContext(DEEZER_SERVICE_CTX_KEY);

  const fullPlaylist: DeezerPlaylistFull = yield deezerService.api.getPlaylist(playlist.id);

  const result: DeezerPlaylistSourceItemFull = {
    ...fullPlaylist,
    isFull: true,
  };

  return result;
}
