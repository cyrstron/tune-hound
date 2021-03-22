import { select, put, fork } from "redux-saga/effects";
import { watchPlayerErrors } from "./player-errors";
import { watchPlayerReady } from "./player-ready";
import { SpotifyService } from "@app/state/spotify/services/spotify-service";
import { selectIsSpotifyPlayerInited } from "@app/state/spotify/selectors";
import { initSpotifyPlayerService } from "./player-service-init";
import { setSpotifyPlayerInited } from "@app/state/spotify/actions";

export function* initSpotifyPlayer(spotifyService: SpotifyService) {    
  const isInited: boolean = yield select(selectIsSpotifyPlayerInited);

  if (!isInited) {
    yield fork(initSpotifyPlayerService, spotifyService);

    const initedAction = setSpotifyPlayerInited(true);

    yield put(initedAction);
  }

  yield fork(watchPlayerReady, spotifyService);
  yield fork(watchPlayerErrors, spotifyService);
}
