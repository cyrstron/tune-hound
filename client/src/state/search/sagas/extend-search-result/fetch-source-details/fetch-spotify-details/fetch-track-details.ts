export function* fetchTrackDetails(track: SpotifyApi.TrackObjectFull) {
  return {
    ...track, 
    isFull: true
  };
}