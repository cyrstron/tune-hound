import { PlayerAction } from "./actions";
import { PlayerTrack } from "./types";
import { 
  SET_PLAYLIST, 
  SET_IS_MUTED, 
  SET_VOLUME, 
  SET_IS_PLAYING, 
  SET_CURRENT_TRACK,
  RESET_CURRENT_TRACK,
  SET_POSITION,
} from "./consts";

export interface PlayerState {
  isPlaying: boolean;
  currentTrack?: PlayerTrack;
  currentTrackIndex?: number;
  position?: number;
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
    case SET_POSITION:
      return {
        ...state,
        position: action.payload.position,
      };
    case SET_CURRENT_TRACK:
      return {
        ...state,
        currentTrack: action.payload.track,
        currentTrackIndex: action.payload.index,
        position: 0,
      };
    case RESET_CURRENT_TRACK:
      return {
        ...state,
        currentTrack: undefined,
        currentTrackIndex: undefined,
        position: undefined,
      };
    case SET_IS_PLAYING:
      return {
        ...state,
        isPlaying: action.payload.isPlaying,
      };
    default:
      return state;
  }
}