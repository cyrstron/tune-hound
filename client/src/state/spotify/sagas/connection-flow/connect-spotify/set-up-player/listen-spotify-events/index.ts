import { all, spawn, select, put } from "redux-saga/effects";
import { createPlayerErrorsChannel, watchPlayerErrors } from "./player-errors";
import { createPlayerReadyChannel, watchPlayerReady } from "./player-ready";
import { createPlayerStateChannel, watchPlayerStateChange } from "./listen-player-state";
import { SpotifyService } from "@app/state/spotify/services/spotify-service";
import { selectIsSpotifyPlayerInited } from "@app/state/spotify/selectors";
import { initSpotifyPlayer } from "./player-init";
import { setSpotifyPlayerInited } from "@app/state/spotify/actions";

export function* listenSpotifyEvents(spotifyService: SpotifyService) {    
  const isInited: boolean = yield select(selectIsSpotifyPlayerInited);

  if (!isInited) {
    yield spawn(initSpotifyPlayer, spotifyService);

    const initedAction = setSpotifyPlayerInited(true);

    yield put(initedAction);
  }
  const errorsChannel = createPlayerErrorsChannel(spotifyService);
  const readyChannel = createPlayerReadyChannel(spotifyService);
  const stateChannel = createPlayerStateChannel(spotifyService);

  yield all([
    spawn(watchPlayerErrors, errorsChannel),
    spawn(watchPlayerReady, readyChannel),
    spawn(watchPlayerStateChange, stateChannel, spotifyService),
  ]);

  return {
    errorsChannel,
    readyChannel,
    stateChannel,
  };
}
