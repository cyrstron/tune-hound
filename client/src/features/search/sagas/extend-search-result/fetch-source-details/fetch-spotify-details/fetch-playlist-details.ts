import { SpotifyService } from '@app/state/spotify/services/spotify-service';
import { getContext, call } from 'redux-saga/effects';
import { SPOTIFY_SERVICE_CTX_KEY } from '@app/consts';
import { retrieveAccessToken } from '@app/state/spotify/sagas/retrieve-access-token';
import {
  SpotifyPlaylistSourceItemFull,
  SpotifyPlaylistSourceItemShort,
} from '@app/features/search/state/types';

export function* fetchPlaylistDetails(playlist: SpotifyPlaylistSourceItemShort): any {
  const spotifyService: SpotifyService = yield getContext(SPOTIFY_SERVICE_CTX_KEY);

  const accessToken: string = yield call(retrieveAccessToken);

  const fullPlaylist: SpotifyApi.PlaylistObjectFull = yield spotifyService.api.getPlaylist(
    playlist.id,
    accessToken,
  );

  const result: SpotifyPlaylistSourceItemFull = {
    ...fullPlaylist,
    isFull: true,
  };

  return result;
}
