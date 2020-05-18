import {call, all, getContext, select} from 'redux-saga/effects';
import {SearchSource, SearchOptions, SourceItemShort} from '../../../types';
import {DeezerSearchOptions, DeezerSearchResult} from '@app/state/deezer/types';
import {SpotifySearchOptions} from '@app/state/spotify/types';
import {DEEZER_SERVICE_CTX_KEY, SPOTIFY_SERVICE_CTX_KEY} from '@app/consts';
import {SpotifyService} from '@app/state/spotify/services/spotify-service';
import {DeezerService} from '@app/state/deezer';
import {updateSpotifyTokenSaga} from '@app/state/spotify/sagas/update-token';
import {selectSpotifyAccessToken} from '@app/state/spotify';

export function* fetchSearchItems(
  source: SearchSource,
  searchOptions: SearchOptions,
  limit: number,
  offset: number,
): any {
  const [deezerService, spotifyService]: [DeezerService, SpotifyService] = yield all([
    getContext(DEEZER_SERVICE_CTX_KEY),
    getContext(SPOTIFY_SERVICE_CTX_KEY),
  ]);

  let response: {
    total: number;
    results: SourceItemShort[];
  } = {total: 0, results: []};

  if (source === 'deezer') {
    const {data, total}: DeezerSearchResult = yield deezerService.search({
      ...(searchOptions as DeezerSearchOptions),
      limit,
      index: offset,
    });

    response = {results: data, total};
  } else if (source === 'spotify') {
    yield call(updateSpotifyTokenSaga);

    const accessToken = yield select(selectSpotifyAccessToken);

    const {
      tracks,
      albums,
      artists,
      playlists,
    }: SpotifyApi.SearchResponse = yield spotifyService.search({
      ...(searchOptions as SpotifySearchOptions),
      limit,
      offset,
    }, accessToken);

    const {
      total = 0,
      items = [],
    } = tracks || albums || artists || playlists || {};

    response = {results: items, total};
  }

  return response;
}
