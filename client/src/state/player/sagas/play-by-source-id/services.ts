import { PlayerTrack } from "@app/state/player/types";
import { DeezerPlaylistFull, DeezerTrack, DeezerAlbumFull } from "@app/state/deezer/types";

export const mapPlayerTrackFromDeezer = (track: DeezerTrack, canPlay: boolean): PlayerTrack => {
  return {
    source: canPlay ? 'deezer' : 'url',
    name: track.title,
    artists: [track.artist.name],
    albumTitle: track.album.title,
    duration: track.duration,
    trackSource: canPlay ? {id: track.id} : {url: track.preview},
  } as PlayerTrack;

};

export const mapPlayerTrackFromSpotify = (
  track: SpotifyApi.TrackObjectSimplified & {album: SpotifyApi.AlbumObjectSimplified}, 
  canPlay: boolean
): PlayerTrack => {
  return {
    source: canPlay ? 'spotify' : 'url',
    name: track.name,
    artists: track.artists.map(({name}) => name),
    albumTitle: track.album.name,
    duration: track.duration_ms / 1000,
    trackSource: canPlay ? {id: track.id} : {url: track.preview_url},
  } as PlayerTrack;
};

export const mapPlayerAlbumFromDeezer = (album: DeezerAlbumFull, canPlay: boolean): PlayerTrack[] => {
  return album.tracks.data.map((track) => mapPlayerTrackFromDeezer({...track, album}, canPlay));
};

export const mapPlayerAlbumFromSpotify = (album: SpotifyApi.AlbumObjectFull, canPlay: boolean): PlayerTrack[] => {
  return album.tracks.items.map((track) => mapPlayerTrackFromSpotify({...track, album}, canPlay));

};

export const mapPlaylistFromDeezer = (playlist: DeezerPlaylistFull, canPlay: boolean): PlayerTrack[] => {
  return playlist.tracks.data.map((track) => mapPlayerTrackFromDeezer(track, canPlay));
};

export const mapPlaylistFromSpotify = (tracks: SpotifyApi.PlaylistTrackResponse, canPlay: boolean): PlayerTrack[] => {
  return tracks.items.map(({track}) => mapPlayerTrackFromSpotify(track, canPlay));
};

