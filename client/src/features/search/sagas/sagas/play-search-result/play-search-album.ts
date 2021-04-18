import { SearchSource, SearchedAlbum } from '../../types';
import {
  createIsAlbumActiveSelector,
  selectPlayingSource,
  selectCurrentIndex,
  selectPlaylist,
} from '@app/state/player/selectors';
import { select, all, put } from 'redux-saga/effects';
import { PlayerSource, PlayerTrack } from '@app/state/player/types';
import { play, playAlbum } from '@app/state/player/actions';
import { mapPlayerAlbumFromDeezer, mapPlayerAlbumFromSpotify } from './services';
import { setCurrentTrack } from '@app/state/player/actions';

export function* playSearchedAlbumSaga(
  album: SearchedAlbum,
  source: SearchSource,
  index: number | undefined,
  canPlay: boolean,
): any {
  const [isAlbumActive, playingSource, currentIndex]: [
    boolean,
    PlayerSource,
    number | undefined,
  ] = yield all([
    select(createIsAlbumActiveSelector(album.id)),
    select(selectPlayingSource),
    select(selectCurrentIndex),
  ]);

  const isPlaylistActive =
    isAlbumActive && (source === playingSource || (!canPlay && playingSource === 'url'));
  const isTrackActive = isPlaylistActive && (index === currentIndex || index === undefined);

  if (isTrackActive) {
    yield put(play());

    return;
  } else if (isPlaylistActive) {
    const tracks: PlayerTrack[] = yield select(selectPlaylist);

    const action = setCurrentTrack(tracks[index!], index, true);

    yield put(action);

    return;
  }

  let tracks: PlayerTrack[];

  if (source === 'spotify') {
    tracks = mapPlayerAlbumFromSpotify(album, canPlay);
  } else if (source === 'deezer') {
    tracks = mapPlayerAlbumFromDeezer(album, canPlay);
  } else {
    throw new Error('Source is not supported');
  }

  const action = playAlbum(album.id, tracks, album.sources[source]!.id, index);

  yield put(action);
}
