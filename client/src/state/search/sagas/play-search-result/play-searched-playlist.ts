import { SearchSource, SearchedPlaylist } from "../../types";
import { selectIsPlaylistActive, selectPlayingSource, selectCurrentIndex, selectPlaylist } from "@app/state/player/selectors";
import { select, put, all } from "redux-saga/effects";
import { play, playPlaylist, setCurrentTrack } from "@app/state/player/actions";
import { PlayerTrack, PlayerSource } from "@app/state/player/types";
import { mapPlaylistFromDeezer, mapPlaylistFromSpotify } from "./services";

export function* playSearchedPlaylistSaga(
  playlist: SearchedPlaylist, 
  source: SearchSource, 
  index: number | undefined, 
  canPlay: boolean,
) {
  const [isPlaylistActive, playingSource, currentIndex]: [boolean, PlayerSource, number | undefined] = yield all([
    select(selectIsPlaylistActive, playlist.id),
    select(selectPlayingSource),
    select(selectCurrentIndex),
  ]);

  const isActive = isPlaylistActive && (source === playingSource || (!canPlay && playingSource === 'url'));
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
    tracks = mapPlaylistFromSpotify(playlist, canPlay)
  } else if (source === 'deezer') {
    tracks = mapPlaylistFromDeezer(playlist, canPlay)
  } else {
    throw new Error('Source is not supported');
  };

  const action = playPlaylist(playlist.id, tracks, playlist.sources[source]!.id);

  yield put(action);
}