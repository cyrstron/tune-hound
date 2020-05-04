import { PlayerAction } from "./actions";
import { PlayerTrack } from "./types";
import { SET_PLAYLIST, SET_IS_MUTED, SET_VOLUME } from "./consts";

export interface PlayerState {
  isPlaying: boolean;
  currentTrack?: PlayerTrack;
  isPending: boolean;
  playlist: PlayerTrack[];
  volume: number;
  isMuted: boolean;
  error?: Error;
}

const initialPlayerState: PlayerState = {
  isPlaying: false,
  isPending: false,
  volume: 50,
  isMuted: false,
  playlist: [],
};

export function playerReducer(
  state: PlayerState = initialPlayerState,
  action: PlayerAction,
): PlayerState {
  switch (action.type) {
    case SET_PLAYLIST:
      return {
        ...state,
        playlist: action.payload.tracks,
      };
    case SET_IS_MUTED:
      return {
        ...state,
        isMuted: action.payload.isMuted,
      };
    case SET_VOLUME:
      return {
        ...state,
        volume: action.payload.volume,
      };
    default:
      return state;
  }
}