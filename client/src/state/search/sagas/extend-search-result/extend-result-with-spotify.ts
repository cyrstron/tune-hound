import {call, getContext, select} from 'redux-saga/effects';
import { SearchResult, SpotifySearchItem } from "../../types";
import { SpotifyService } from '@app/state/spotify/services/spotify-service';
import { checkSpotifyTokenSaga } from '@app/state/spotify/sagas/check-token';
import { SPOTIFY_SERVICE_CTX_KEY } from '@app/consts';
import { selectSpotifyAccessToken } from '@app/state/spotify';

export function* extendResultWithSpotify(item: SearchResult) {
  const spotifyService: SpotifyService = yield getContext(SPOTIFY_SERVICE_CTX_KEY);
  
  yield call(checkSpotifyTokenSaga);

  const accessToken = yield select(selectSpotifyAccessToken);

  let result: SpotifySearchItem | null = null;
  
  if (item.type === 'track') {
    const {name, album, artists} = item;

    for (let artist of artists) {
      const {tracks}: SpotifyApi.SearchResponse = yield spotifyService.search({
        type: 'track',
        query: {
          and: [name],
          album,
          artist: artist,
        }
      }, accessToken);
  
      result = tracks?.items[0] || null;

      if (result) break;
    }    
  } else if (item.type === 'album') {
    const {title, artists} = item;

    for (let artist of artists) {
      const {tracks}: SpotifyApi.SearchResponse = yield spotifyService.search({
        type: 'album',
        query: {
          and: [title],
          artist: artist,
        }
      }, accessToken);
  
      result = tracks?.items[0] || null;

      if (result) break;
    }    
  } else if (item.type === 'artist') {
    result = null;
  } else {
    result = null;
  }

  return result;
}