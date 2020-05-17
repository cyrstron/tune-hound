import { all, select } from "redux-saga/effects";
import { selectIsMuted, selectVolume } from "@app/state/player/selectors";
import { AudioService } from "../../services/audio-service";

export function* applyPlayerState(audioService: AudioService) {
  const [isMuted, volume]: [
    boolean,
    number,
  ] = yield all([
    select(selectIsMuted),
    select(selectVolume),
  ]);

  audioService.setMute(isMuted);  
  audioService.setVolume(volume / 100);  
}
