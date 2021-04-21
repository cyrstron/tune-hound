import { call } from 'redux-saga/effects';
import { SpotifySourceItemShort, SpotifySourceItem } from '@app/features/search/search/types';

import { fetchTrackDetails } from './fetch-track-details';
import { fetchAlbumDetails } from './fetch-album-details';
import { fetchArtistDetails } from './fetch-artist-details';
import { fetchPlaylistDetails } from './fetch-playlist-details';

export function* fetchSpotifyDetails(spotifyItem: SpotifySourceItemShort): any {
  let result: SpotifySourceItem;

  switch (spotifyItem.type) {
    case 'track':
      result = yield call(fetchTrackDetails, spotifyItem);
      break;
    case 'album':
      result = yield call(fetchAlbumDetails, spotifyItem);
      break;
    case 'artist':
      result = yield call(fetchArtistDetails, spotifyItem);
      break;
    case 'playlist':
      result = yield call(fetchPlaylistDetails, spotifyItem);
      break;
    default:
      result = spotifyItem;
  }

  return result;
}
