import { AppState } from "..";

export const selectIsMuted = (state: AppState) => {
  return state.player.isMuted;
}

export const selectVolume = (state: AppState) => {
  return state.player.volume;
}