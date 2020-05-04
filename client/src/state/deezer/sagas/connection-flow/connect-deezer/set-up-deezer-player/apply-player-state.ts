import { all, select } from "redux-saga/effects";
import { DeezerService } from "../../../../services";
import { selectIsMuted, selectVolume } from "@app/state/player/selectors";

export function* applyPlayerState(deezerService: DeezerService) {
  const [isMuted, volume]: [
    boolean,
    number,
  ] = yield all([
    select(selectIsMuted),
    select(selectVolume),
  ]);

  deezerService.player.setMute(isMuted);  
  deezerService.player.setVolume(volume);  
}
