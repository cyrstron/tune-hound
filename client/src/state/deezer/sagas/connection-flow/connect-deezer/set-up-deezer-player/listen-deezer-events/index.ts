import { all, spawn } from "redux-saga/effects";
import { DeezerService } from "@app/state/deezer/services";
import { createPlayerPlayChannel, watchPlayerPlayChange } from "./listen-player-play";
import { createCurrentTrackChannel, watchCurrentTrackChange } from "./listen-current-track";
import { createMuteChangeChannel, watchMuteChange } from "./listen-mute-change";
import { createPlayerBufferingChannel, watchPlayerBufferingChange } from "./listen-player-buffering";
import { createPlayerLoadedChannel, watchPlayerLoadedChange } from "./listen-player-loaded";
import { createPlayerPauseChannel, watchPlayerPauseChange } from "./listen-player-pause";
import { createPlayerPositionChannel, watchPlayerPositionChange } from "./listen-player-position";
import { createRepeatModeChangeChannel, watchRepeatModeChange } from "./listen-repeat-change";
import { createShuffleModeChannel, watchShuffleModeChange } from "./listen-shuffle-change";
import { createTrackEndChannel, watchTrackEnd } from "./listen-track-end";
import { createTrackListChannel, watchTrackListChange } from "./listen-tracklist-change";
import { createPlayerVolumeChannel, watchPlayerVolumeChange } from "./listen-volume-change";

export function* listenDeezerEvents(deezerService: DeezerService) {
  const playChannel = createPlayerPlayChannel(deezerService);
  const currentTrackChannel = createCurrentTrackChannel(deezerService);
  const muteChannel = createMuteChangeChannel(deezerService);
  const bufferingChannel = createPlayerBufferingChannel(deezerService);
  const loadedChannel = createPlayerLoadedChannel(deezerService);
  const pauseChannel = createPlayerPauseChannel(deezerService);
  const positionChannel = createPlayerPositionChannel(deezerService);
  const repeatModeChannel = createRepeatModeChangeChannel(deezerService);
  const shuffleChannel = createShuffleModeChannel(deezerService);
  const trackEndChannel = createTrackEndChannel(deezerService);
  const trackListChangeChannel = createTrackListChannel(deezerService);
  const volumeChannel = createPlayerVolumeChannel(deezerService)

  yield all([
    spawn(watchPlayerPlayChange, playChannel),
    spawn(watchCurrentTrackChange, deezerService, currentTrackChannel),
    spawn(watchMuteChange, deezerService, muteChannel),
    spawn(watchPlayerBufferingChange, bufferingChannel),
    spawn(watchPlayerLoadedChange, loadedChannel),
    spawn(watchPlayerPauseChange, pauseChannel),
    spawn(watchPlayerPositionChange, positionChannel),
    spawn(watchRepeatModeChange, deezerService, repeatModeChannel),
    spawn(watchShuffleModeChange, deezerService, shuffleChannel),
    spawn(watchTrackEnd, trackEndChannel),
    spawn(watchTrackListChange, deezerService, trackListChangeChannel),
    spawn(watchPlayerVolumeChange, deezerService, volumeChannel),
  ]);

  return {
    playChannel,
    currentTrackChannel,
    muteChannel,
    bufferingChannel,
    loadedChannel,
    pauseChannel,
    repeatModeChannel,
    shuffleChannel,
    trackEndChannel,
    trackListChangeChannel,
    volumeChannel,
  };
}
