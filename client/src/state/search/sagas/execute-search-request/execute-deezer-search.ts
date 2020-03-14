import {v4 as uuid} from 'uuid';
import { DeezerSearchOptions, DeezerSearchResult } from "@app/state/deezer/types";
import { getContext } from "redux-saga/effects";
import { DEEZER_SERVICE_CTX_KEY } from "@app/consts";
import { DeezerService } from "@app/state/deezer";
import { SearchResult } from '../../types';

export function* executeDeezerSearchSaga(options: DeezerSearchOptions, pageIndex: number, pageSize: number) {
  const deezerService: DeezerService = yield getContext(DEEZER_SERVICE_CTX_KEY);

    const {data, total}: DeezerSearchResult = yield deezerService.search({
      ...options,
      limit: pageSize,
      index: pageIndex * pageSize,
    });

    let results: SearchResult[] = [];

    const type = data[0]?.type;

    if (type === 'track') {
      results = data.map((item) => ({
        id: uuid(),
        type: 'track',
        name: item.title,
        artists: [item.artist.name],
        album: item.album.title,
        coverUrl: item.album.cover,
        duration: item.duration,
        sources: {
          deezer: item,
        }
      }));
    }

    return {
      results,
      total,
    }
};