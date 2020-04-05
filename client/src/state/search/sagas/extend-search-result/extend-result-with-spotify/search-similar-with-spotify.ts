import {call, getContext, select, all} from 'redux-saga/effects';
import { SearchResult } from "../../../types";
import { SpotifyService } from '@app/state/spotify/services/spotify-service';
import { checkSpotifyTokenSaga } from '@app/state/spotify/sagas/check-token';
import { SPOTIFY_SERVICE_CTX_KEY } from '@app/consts';
import { selectSpotifyAccessToken } from '@app/state/spotify';

export function* searchSimilarWithSpotify(item: SearchResult) {
  const spotifyService: SpotifyService = yield getContext(SPOTIFY_SERVICE_CTX_KEY);
  
  yield call(checkSpotifyTokenSaga);

  const accessToken = yield select(selectSpotifyAccessToken);
  
  if (item.type === 'track') {
    const {name, album, artists} = item;

    const results: SpotifyApi.SearchResponse[] = yield all(artists.map(artist => spotifyService.search({
      type: 'track',
      query: {
        and: [name],
        album,
        artist,
      }
    }, accessToken)));

    return results.reduce<SpotifyApi.TrackObjectFull[]>((result, {tracks}) => {
      if (tracks) {
        result.push(...tracks.items.filter(({id}) => !result.some((item) => item.id === id)));
      }

      return result;
    }, []);
  } else if (item.type === 'album') {
    const {title, artists} = item;

    const results: SpotifyApi.SearchResponse[] = yield all(artists.map(artist => spotifyService.search({
      type: 'album',
      query: {
        and: [title],
        artist,
      }
    }, accessToken)));

    return results.reduce<SpotifyApi.AlbumObjectSimplified[]>((result, {albums}) => {
      if (albums) {
        result.push(...albums.items.filter(({id}) => !result.some((item) => item.id === id)));
      }

      return result;
    }, []);
  } else if (item.type === 'artist') {
    const {name} = item;

    const {artists}: SpotifyApi.SearchResponse = yield spotifyService.search({
      type: 'artist',
      query: {
        and: [name],
      }
    }, accessToken);
  
    return artists?.items || [];
  } else {
    return [];
  }
}