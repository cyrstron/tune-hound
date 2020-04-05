import {getContext, all} from 'redux-saga/effects';
import { SearchResult } from "../../../types";
import { DeezerService } from "@app/state/deezer";
import { DEEZER_SERVICE_CTX_KEY } from '@app/consts';
import {
  DeezerTrackSearchResult, 
  DeezerTrack,
  DeezerAlbumSearchResult, 
  DeezerAlbum,
  DeezerArtistSearchResult,
} from '@app/state/deezer/types';

export function* searchSimilarWithDeezer(item: SearchResult) {
  const deezerService: DeezerService = yield getContext(DEEZER_SERVICE_CTX_KEY);
  
  if (item.type === 'track') {
    const {name, album, artists} = item;

    const results: DeezerTrackSearchResult[] = yield all(
      artists.map((artist) => deezerService.search({
        namespace: 'track',
        query: {
          track: name,
          album,
          artist,
        },
        strict: true,
      }))
    );

    return results.reduce<DeezerTrack[]>((tracks, {data}) => {
      tracks.push(...data.filter(({id}) => !tracks.some((item) => item.id === id)));

      return tracks;
    }, []);
  } else if (item.type === 'album') {
    const {title, artists} = item;

    const results: DeezerAlbumSearchResult[] = yield all(
      artists.map((artist) => deezerService.search({
        namespace: 'album',
        query: {album: title, artist: artist},
        strict: true,
      }))
    );

    return results.reduce<DeezerAlbum[]>((albums, {data}) => {
      albums.push(...data.filter(({id}) => !albums.some((item) => item.id === id)));

      return albums;
    }, []);
  } else if (item.type === 'artist') {
    const {name} = item;

    const {data}: DeezerArtistSearchResult = yield deezerService.search({
      namespace: 'artist',
      query: {artist: name},
      strict: true,
    });

    return data;
  } else {
    return [];
  }
}