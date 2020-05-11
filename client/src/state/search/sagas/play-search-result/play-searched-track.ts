import { SearchedTrack, SearchSource } from "../../types";
import { select, all, put } from "redux-saga/effects";
import { selectIsTrackActive, selectPlayingSource } from "@app/state/player/selectors";
import { PlayerSource, PlayerTrack } from "@app/state/player/types";
import { play } from "@app/state/player/actions";
import { playTrack } from "@app/state/player/actions";
import { mapPlayerTrackFromSpotify, mapPlayerTrackFromDeezer } from "./services";

export function* playSearchedTrackSaga(track: SearchedTrack, source: SearchSource, canPlay: boolean) {
  const [isTrackActive, playingSource]: [boolean, PlayerSource] = yield all([
    select(selectIsTrackActive, track.id),
    select(selectPlayingSource),
  ]);

  if (isTrackActive && (source === playingSource || (!canPlay && playingSource === 'url'))) {
    yield put(play());

    return;
  }

  let playerTrack: PlayerTrack;
  
  if (source === 'spotify') {
    playerTrack = mapPlayerTrackFromSpotify(track, canPlay);
  } else if (source === 'deezer') {
    playerTrack = mapPlayerTrackFromDeezer(track, canPlay);
  } else {
    throw new Error('Source is not supported');
  };

  const action = playTrack(track.id, playerTrack, track.sources[source]!.id);

  yield put(action);
}