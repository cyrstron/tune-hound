import {getContext, call, select} from 'redux-saga/effects';
import {SearchSource} from '@app/state/search/types';
import {SpotifyService} from '@app/state/spotify/services/spotify-service';
import {SPOTIFY_SERVICE_CTX_KEY, DEEZER_SERVICE_CTX_KEY} from '@app/consts';
import {retrieveAccessToken} from '@app/state/spotify/sagas/retrieve-access-token';
import {DeezerService, selectCanDeezerPlay} from '@app/state/deezer';
import {DeezerPlaylistFull} from '@app/state/deezer/types';
import {selectCanSpotifyPlay} from '@app/state/spotify';
import {mapPlaylistFromSpotify, mapPlaylistFromDeezer} from './services';

export function* getPlaylistById(id: string | number, source: SearchSource): any {
  if (source === 'spotify') {
    const canPlay = yield select(selectCanSpotifyPlay);
    const spotifyService: SpotifyService = yield getContext(SPOTIFY_SERVICE_CTX_KEY);

    const accessToken = yield call(retrieveAccessToken);

    const tracks: SpotifyApi.PlaylistTrackResponse = yield spotifyService.api.getPlaylistTracks(
      id as string,
      accessToken,
    );

    return mapPlaylistFromSpotify(tracks, canPlay);
  } else if (source === 'deezer') {
    const canPlay = yield select(selectCanDeezerPlay);
    const deezerService: DeezerService = yield getContext(DEEZER_SERVICE_CTX_KEY);

    const playlist: DeezerPlaylistFull = yield deezerService.api.getPlaylist(id as number);

    return mapPlaylistFromDeezer(playlist, canPlay);
  }
}
