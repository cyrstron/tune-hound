import { PlayerAction } from "./actions";
import { PlayerTrack, RepeatMode, noRepeatMode, PlaylistType } from "./types";
import { 
  SET_PLAYLIST, 
  SET_IS_MUTED, 
  SET_VOLUME, 
  SET_IS_PLAYING, 
  SET_CURRENT_TRACK,
  RESET_CURRENT_TRACK,
  SET_POSITION,
  SEEK,
  SET_IS_SHUFFLED,
  RESET_PLAY_HISTORY,
  RESET_PLAYED_INDEXES,
  PLAY,
  SET_REPEAT_MODE,
  SET_PLAYER_HISTORY,
  SET_IS_PENDING,
} from "./consts";

export interface PlayerState {
  isPlaying: boolean;
  currentTrack?: PlayerTrack;
  currentTrackIndex?: number;
  position?: number;
  isPending: boolean;
  playlist: PlayerTrack[];
  playlistType?: PlaylistType;
  playlistId?: string;
  nativePlaylistId?: string | number;
  volume: number;
  isMuted: boolean;
  isShuffled: boolean;
  error?: Error;
  repeatMode: RepeatMode;
  history: number[];
  playedIndexes: number[];
}

const initialPlayerState: PlayerState = {
  isPlaying: false,
  isPending: false,
  volume: 50,
  isMuted: false,
  isShuffled: false,
  playlist: [],
  repeatMode: noRepeatMode,
  history: [],
  playedIndexes: [],
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
        playlistType: action.payload.type,
        playlistId: action.payload.id,
        nativePlaylistId: action.payload.nativeId,
        repeatMode: noRepeatMode,
        history: [],
        playedIndexes: [],
        isShuffled: false,
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
    case SET_REPEAT_MODE:
      return {
        ...state,
        repeatMode: action.payload.repeatMode,
      };
    case SET_IS_SHUFFLED:
      return {
        ...state,
        isShuffled: action.payload.isShuffled,
      };
    case SEEK:
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
        history: [...state.history, action.payload.index],
        playedIndexes: [...state.playedIndexes, action.payload.index],
        isPending: action.payload.isAutoplay,
      };
    case RESET_CURRENT_TRACK:
      return {
        ...state,
        currentTrack: undefined,
        currentTrackIndex: undefined,
        position: undefined,
      };
    case SET_PLAYER_HISTORY:
      return {
        ...state,
        history: action.payload.history,
      };
    case RESET_PLAY_HISTORY:
      return {
        ...state,
        history: [],
      };
    case RESET_PLAYED_INDEXES:
      return {
        ...state,
        playedIndexes: [],
      };
    case PLAY:
      return {
        ...state,
        isPending: !state.isPlaying,
      };
    case SET_IS_PLAYING:
      return {
        ...state,
        isPlaying: action.payload.isPlaying,
        isPending: false,
      };
    case SET_IS_PENDING:
      return {
        ...state,
        isPending: action.payload.isPending,
      };
    default:
      return state;
  }
}