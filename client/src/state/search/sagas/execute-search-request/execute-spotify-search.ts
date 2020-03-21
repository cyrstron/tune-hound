import {call, select} from 'redux-saga/effects';
import {v4 as uuid} from 'uuid';
import { getContext } from "redux-saga/effects";
import { SPOTIFY_SERVICE_CTX_KEY } from "@app/consts";
import { checkSpotifyTokenSaga } from "@app/state/spotify/sagas/check-token";
import { SpotifySearchOptions } from '@app/state/spotify/types';
import { SpotifyService } from '@app/state/spotify/services/spotify-service';
import { selectSpotifyAccessToken } from '@app/state/spotify';
import { SearchResult } from '../../types';

export function* executeSpotifySearchSaga(options: SpotifySearchOptions, pageIndex: number, pageSize: number) {
  const spotifySearch: SpotifyService = yield getContext(SPOTIFY_SERVICE_CTX_KEY);

  yield call(checkSpotifyTokenSaga);

  const accessToken: string = yield select(selectSpotifyAccessToken);

  const {
    tracks, 
    albums, 
    playlists, 
    artists
  }: SpotifyApi.SearchResponse = yield spotifySearch.search({
    ...options,
    limit: pageSize,
    offset: pageSize * pageIndex,
  }, accessToken);

  let results: SearchResult[] = [];
  let totalNumber = 0;

  if (tracks) {
    const {items, total} = tracks;

    results = items.map((item) => ({
      id: uuid(),
      type: 'track',
      name: item.name,
      artists: item.artists.map(({name}) => name),
      album: item.album.name,
      coverUrl: item.album.images[0]?.url,
      duration: item.duration_ms / 1000,
      sources: {
        spotify: item,
      }
    }));

    totalNumber = total;
  } else if (albums) {
    const {items, total} = albums;

    results = items.map((item) => ({
      id: uuid(),
      type: 'album',
      title: item.name,
      artists: item.artists.map(({name}) => name),
      coverUrl: item.images[0]?.url,
      year: item.release_date,
      sources: {
        spotify: item,
      }
    }));

    totalNumber = total;
  } else if (playlists) {
    const {items, total} = playlists;

    results = items.map((item) => ({
      id: uuid(),
      type: 'playlist',
      title: item.name,
      coverUrl: item.images[0]?.url,
      sources: {
        spotify: item,
      }
    }));

    totalNumber = total;
  } else if (artists) {
    const {items, total} = artists;

    results = items.map((item) => ({
      id: uuid(),
      type: 'artist',
      name: item.name,
      coverUrl: item.images[0]?.url,
      sources: {
        spotify: item,
      }
    }));

    totalNumber = total;
  }

  return {
    results,
    total: totalNumber,
  }
};