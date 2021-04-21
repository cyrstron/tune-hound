import { SearchSource, SearchedArtist } from '../../../../../state/search/types';
import { select, all, put } from 'redux-saga/effects';
import {
  createIsPlaylistActiveSelector,
  selectPlayingSource,
  selectCurrentIndex,
  selectPlaylist,
} from '@app/state/player/selectors';
import { PlayerSource, PlayerTrack } from '@app/state/player/types';
import { play, playPlaylist, setCurrentTrack } from '@app/state/player/actions';
import { mapPlaylistFromSpotifyArtist, mapPlaylistFromDeezerArtist } from './services';

export function* playSearchedArtistSaga(
  artist: SearchedArtist,
  source: SearchSource,
  index: number | undefined,
  canPlay: boolean,
): any {
  const [isPlaylistActive, playingSource, currentIndex]: [
    boolean,
    PlayerSource,
    number | undefined,
  ] = yield all([
    select(createIsPlaylistActiveSelector(artist.id)),
    select(selectPlayingSource),
    select(selectCurrentIndex),
  ]);

  const isActive =
    isPlaylistActive && (source === playingSource || (!canPlay && playingSource === 'url'));
  const isTrackActive = isActive && (index === currentIndex || index === undefined);

  if (isTrackActive) {
    yield put(play());

    return;
  } else if (isActive) {
    const tracks: PlayerTrack[] = yield select(selectPlaylist);

    const action = setCurrentTrack(tracks[index!], index, true);

    yield put(action);

    return;
  }

  let tracks: PlayerTrack[];

  if (source === 'spotify') {
    tracks = mapPlaylistFromSpotifyArtist(artist, canPlay);
  } else if (source === 'deezer') {
    tracks = mapPlaylistFromDeezerArtist(artist, canPlay);
  } else {
    throw new Error('Source is not supported');
  }

  const action = playPlaylist(artist.id, tracks, artist.sources[source]!.id, index);

  yield put(action);
}
