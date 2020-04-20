import { PLAY_TRACK } from "./consts";
import { PlayerTrack } from "./types";

export interface PlayTrackAction {
  type: typeof PLAY_TRACK;
  payload: {
    track: PlayerTrack;
  };
}

export const playTrack = (track: PlayerTrack): PlayTrackAction => ({
  type: PLAY_TRACK,
  payload: {track},
});

export type PlayerAction = PlayTrackAction;