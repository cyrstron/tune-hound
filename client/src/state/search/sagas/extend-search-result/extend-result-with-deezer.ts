import {getContext} from 'redux-saga/effects';
import { SearchResult, DeezerSearchItem } from "../../types";
import { DeezerService } from "@app/state/deezer";
import { DEEZER_SERVICE_CTX_KEY } from '@app/consts';
import { DeezerTrackSearchResult } from '@app/state/deezer/types';

export function* extendResultWithDeezer(item: SearchResult) {
  const deezerService: DeezerService = yield getContext(DEEZER_SERVICE_CTX_KEY);

  let result: DeezerSearchItem | null = null;
  
  if (item.type === 'track') {
    const {name, album, artists} = item;

    for (let artist of artists) {
      const {data}: DeezerTrackSearchResult = yield deezerService.search({
        namespace: 'track',
        query: {
          track: name,
          album,
          artist,
        },
        strict: true,
      });
  
      result = data[0] || null;

      if (result) break;
    }    
  } else if (item.type === 'album') {
    const {title} = item;

    const {data}: DeezerTrackSearchResult = yield deezerService.search({
      namespace: 'album',
      query: {album: title},
      strict: true,
    });

    result = data[0] || null;
  } else if (item.type === 'artist') {
    const {name} = item;

    const {data}: DeezerTrackSearchResult = yield deezerService.search({
      namespace: 'artist',
      query: {artist: name},
      strict: true,
    });

    result = data[0] || null;
  } else {
    result = null;
  }

  return result;
}