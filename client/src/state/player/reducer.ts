import { PlayerAction } from "./actions";
import { PlayerTrack } from "./types";

export interface PlayerState {
  isPlaying: boolean;
  currentTrack?: PlayerTrack;
  isPending: boolean;
  trackList: PlayerTrack[];
  error?: Error;
}

const initialPlayerState: PlayerState = {
  isPlaying: false,
  isPending: false,
  trackList: [],
};

export function playerReducer(
  state: PlayerState = initialPlayerState,
  action: PlayerAction,
): PlayerState {
  switch (action.type) {
    default:
      return state;
  }
}