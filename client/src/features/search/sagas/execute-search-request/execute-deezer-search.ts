import { v4 as uuid } from 'uuid';
import { DeezerSearchOptions, DeezerSearchResult } from '@app/state/deezer/types';
import { getContext } from 'redux-saga/effects';
import { DEEZER_SERVICE_CTX_KEY } from '@app/consts';
import { DeezerService } from '@app/state/deezer';
import {
  DeezerAlbumSourceItemShort,
  DeezerArtistSourceItemShort,
  DeezerPlaylistSourceItemShort,
  DeezerSourceItemShort,
  DeezerTrackSourceItemShort,
  SearchResult,
} from '../../state/types';

function isTrackResponse(data: DeezerSourceItemShort[]): data is DeezerTrackSourceItemShort[] {
  return data[0]?.type === 'track';
}

function isAlbumResponse(data: DeezerSourceItemShort[]): data is DeezerAlbumSourceItemShort[] {
  return data[0]?.type === 'album';
}

function isArtistResponse(data: DeezerSourceItemShort[]): data is DeezerArtistSourceItemShort[] {
  return data[0]?.type === 'artist';
}

function isPlaylistResponse(
  data: DeezerSourceItemShort[],
): data is DeezerPlaylistSourceItemShort[] {
  return data[0]?.type === 'playlist';
}

export function* executeDeezerSearchSaga(
  options: DeezerSearchOptions,
  pageIndex: number,
  pageSize: number,
): any {
  const deezerService: DeezerService = yield getContext(DEEZER_SERVICE_CTX_KEY);

  const { data, total }: DeezerSearchResult = yield deezerService.search({
    ...options,
    limit: pageSize,
    index: pageIndex * pageSize,
  });

  let results: SearchResult[] = [];

  if (isTrackResponse(data)) {
    results = data.map(item => ({
      id: uuid(),
      type: 'track',
      name: item.title,
      artists: [item.artist.name],
      album: item.album.title,
      coverUrl: item.album.cover,
      duration: item.duration,
      isCrossExtendable: true,
      sources: {
        deezer: item,
      },
    }));
  } else if (isAlbumResponse(data)) {
    results = data.map(item => ({
      id: uuid(),
      type: 'album',
      title: item.title,
      artists: [item.artist.name],
      coverUrl: item.cover,
      isCrossExtendable: true,
      sources: {
        deezer: item,
      },
    }));
  } else if (isArtistResponse(data)) {
    results = data.map(item => ({
      id: uuid(),
      type: 'artist',
      name: item.name,
      coverUrl: item.picture,
      isCrossExtendable: true,
      sources: {
        deezer: item,
      },
    }));
  } else if (isPlaylistResponse(data)) {
    results = data.map(item => ({
      id: uuid(),
      type: 'playlist',
      title: item.title,
      coverUrl: item.picture,
      author: {
        name: item.user.name,
      },
      tracksUrl: item.tracklist,
      tracksTotal: item.nb_tracks,
      isCrossExtendable: false,
      sources: {
        deezer: item,
      },
    }));
  }

  return {
    results,
    total,
  };
}
