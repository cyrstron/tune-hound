import {
  SpotifyTrackSourceItemFull,
  SpotifyTrackSourceItemShort,
} from '@app/features/search/state/types';

export function fetchTrackDetails(track: SpotifyTrackSourceItemShort): SpotifyTrackSourceItemFull {
  const result: SpotifyTrackSourceItemFull = {
    ...track,
    isFull: true,
  };

  return result;
}
