import { SpotifyTrackSourceItemFull, SpotifyTrackSourceItemShort } from '@app/features/search/search/types';

export function fetchTrackDetails(track: SpotifyTrackSourceItemShort): SpotifyTrackSourceItemFull {
  const result: SpotifyTrackSourceItemFull = {
    ...track,
    isFull: true,
  };

  return result;
}
