import { SpotifyTrackSourceItemFull, SpotifyTrackSourceItemShort } from "@app/state/search/types";

export function* fetchTrackDetails(track: SpotifyTrackSourceItemShort) {
  const result: SpotifyTrackSourceItemFull = {
    ...track, 
    isFull: true
  };

  return result;
}