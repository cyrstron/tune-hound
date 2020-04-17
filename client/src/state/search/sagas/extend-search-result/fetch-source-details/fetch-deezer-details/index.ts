import {call} from 'redux-saga/effects';
import { DeezerSourceItemShort, DeezerSourceItemFull } from "@app/state/search/types";
import {fetchTrackDetails} from './fetch-track-details';
import {fetchAlbumDetails} from './fetch-album-details';
import {fetchArtistDetails} from './fetch-artist-details';
import {fetchPlaylistDetails} from './fetch-playlist-details';

export function* fetchDeezerDetails(deezerItem: DeezerSourceItemShort) {
  let result: DeezerSourceItemFull;

  switch(deezerItem.type) {
    case 'track':
      result = yield call(fetchTrackDetails, deezerItem);
      break;
    case 'album':
      result = yield call(fetchAlbumDetails, deezerItem);
      break;    
    case 'artist':
      result = yield call(fetchArtistDetails, deezerItem);
      break;
    case 'playlist':
      result = yield call(fetchPlaylistDetails, deezerItem);
      break;
    default:
      result = deezerItem;
  }

  return result;
}
