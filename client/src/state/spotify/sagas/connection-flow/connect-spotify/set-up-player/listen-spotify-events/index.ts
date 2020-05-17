import { all, spawn } from "redux-saga/effects";

import { createPlayerErrorsChannel, watchPlayerErrors } from "./player-errors";
import { createPlayerReadyChannel, watchPlayerReady } from "./player-ready";
import { createPlayerStateChannel, watchPlayerStateChange } from "./player-state";
import { SpotifyService } from "@app/state/spotify/services/spotify-service";

export function* listenSpotifyEvents(spotifyService: SpotifyService) {
    const errorsChannel = createPlayerErrorsChannel(spotifyService);
    const readyChannel = createPlayerReadyChannel(spotifyService);
    const stateChannel = createPlayerStateChannel(spotifyService);

    yield all([
      spawn(watchPlayerErrors, errorsChannel),
      spawn(watchPlayerReady, readyChannel),
      spawn(watchPlayerStateChange, stateChannel),
    ]);

    return {
      errorsChannel,
      readyChannel,
      stateChannel,
    };
}
