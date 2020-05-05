import { AppState } from "..";
import {PlayerSource, PlayerTrack} from './types';

export const selectIsMuted = (state: AppState) => {
  return state.player.isMuted;
}

export const selectVolume = (state: AppState) => {
  return state.player.volume;
}

export const selectCurrentTrack = (state: AppState): PlayerTrack | undefined => {
  return state.player.currentTrack;
}

export const selectPlayingSource = (state: AppState): PlayerSource | undefined => {
  return selectCurrentTrack(state)?.source;
}


export const selectIsPlaying = (state: AppState): boolean => {
  return state.player.isPlaying;
}
