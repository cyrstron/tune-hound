import {SearchSource} from '@app/state/search/types';
import {getContext, call, select} from 'redux-saga/effects';
import {SPOTIFY_SERVICE_CTX_KEY, DEEZER_SERVICE_CTX_KEY} from '@app/consts';
import {SpotifyService} from '@app/state/spotify/services/spotify-service';
import {retrieveAccessToken} from '@app/state/spotify/sagas/retrieve-access-token';
import {DeezerService, selectCanDeezerPlay} from '@app/state/deezer';
import {DeezerTrackFull} from '@app/state/deezer/types';
import {selectCanSpotifyPlay} from '@app/state/spotify';
import {mapPlayerTrackFromDeezer, mapPlayerTrackFromSpotify} from './services';

export function* getPlaylistByTrackId(id: string | number, source: SearchSource): any {
  if (source === 'spotify') {
    const canPlay = yield select(selectCanSpotifyPlay);
    const spotifyService: SpotifyService = yield getContext(SPOTIFY_SERVICE_CTX_KEY);

    const accessToken = yield call(retrieveAccessToken);

    const track: SpotifyApi.TrackObjectFull = yield spotifyService.api
      .getTrack(id as string, accessToken);

    const playerTrack = mapPlayerTrackFromSpotify(track, canPlay);

    return [playerTrack];
  } else if (source === 'deezer') {
    const canPlay = yield select(selectCanDeezerPlay);
    const deezerService: DeezerService = yield getContext(DEEZER_SERVICE_CTX_KEY);

    const track: DeezerTrackFull = yield deezerService.api.getTrack(id as number);

    const playerTrack = mapPlayerTrackFromDeezer(track, canPlay);

    return [playerTrack];
  }
}
