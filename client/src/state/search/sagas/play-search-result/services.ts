import {
  SearchedTrack,
  SearchedAlbum,
  DeezerAlbumSourceItemFull,
  SpotifyAlbumSourceItemFull,
  SearchedArtist,
  DeezerArtistSourceItemFull,
  SpotifyArtistSourceItemFull,
  SearchedPlaylist,
  SpotifyPlaylistSourceItemFull,
  DeezerPlaylistSourceItemFull,
} from '../../types';
import {PlayerTrack} from '@app/state/player/types';

export const mapPlayerTrackFromDeezer = (track: SearchedTrack, canPlay: boolean): PlayerTrack => {
  const sourceObject = track.sources.deezer!;

  return {
    source: canPlay ? 'deezer' : 'url',
    name: track.name,
    artists: track.artists,
    albumTitle: track.album,
    duration: canPlay ? track.duration : 30,
    trackSource: canPlay ? {id: sourceObject.id} : {url: sourceObject.preview},
  } as PlayerTrack;
};

export const mapPlayerTrackFromSpotify = (track: SearchedTrack, canPlay: boolean): PlayerTrack => {
  const sourceObject = track.sources.spotify!;

  return {
    source: canPlay ? 'spotify' : 'url',
    name: track.name,
    artists: track.artists,
    albumTitle: track.album,
    duration: canPlay ? track.duration : 30,
    trackSource: canPlay ? {id: sourceObject.id} : {url: sourceObject.preview_url},
  } as PlayerTrack;
};

export const mapPlayerAlbumFromDeezer = (album: SearchedAlbum, canPlay: boolean): PlayerTrack[] => {
  const sourceObject = album.sources.deezer! as DeezerAlbumSourceItemFull;

  return sourceObject.tracks.data.map((track) => ({
    source: canPlay ? 'deezer' : 'url',
    name: track.title,
    artists: [track.artist.name],
    albumTitle: album.title,
    duration: canPlay ? track.duration : 30,
    trackSource: canPlay ? {id: track.id} : {url: track.preview},
  }) as PlayerTrack);
};

export const mapPlayerAlbumFromSpotify = (
  album: SearchedAlbum,
  canPlay: boolean,
): PlayerTrack[] => {
  const sourceObject = album.sources.spotify! as SpotifyAlbumSourceItemFull;

  return sourceObject.tracks.items.map((track) => ({
    source: canPlay ? 'spotify' : 'url',
    name: track.name,
    artists: track.artists.map(({name}) => name),
    albumTitle: album.title,
    duration: canPlay ? track.duration_ms / 1000 : 30,
    trackSource: canPlay ? {id: track.id} : {url: track.preview_url},
  }) as PlayerTrack);
};

export const mapPlaylistFromDeezerArtist = (
  artist: SearchedArtist,
  canPlay: boolean,
): PlayerTrack[] => {
  const sourceObject = artist.sources.deezer! as DeezerArtistSourceItemFull;

  return sourceObject.topTracks.data.map((track) => ({
    source: canPlay ? 'deezer' : 'url',
    name: track.title,
    artists: [track.artist.name],
    albumTitle: track.album.title,
    duration: canPlay ? track.duration : 30,
    trackSource: canPlay ? {id: track.id} : {url: track.preview},
  }) as PlayerTrack);
};

export const mapPlaylistFromSpotifyArtist = (
  artist: SearchedArtist,
  canPlay: boolean,
): PlayerTrack[] => {
  const sourceObject = artist.sources.spotify! as SpotifyArtistSourceItemFull;

  return sourceObject.topTracks.map((track) => ({
    source: canPlay ? 'spotify' : 'url',
    name: track.name,
    artists: track.artists.map(({name}) => name),
    albumTitle: track.album.name,
    duration: canPlay ? track.duration_ms / 1000 : 30,
    trackSource: canPlay ? {id: track.id} : {url: track.preview_url},
  }) as PlayerTrack);
};
export const mapPlaylistFromDeezer = (
  playlist: SearchedPlaylist,
  canPlay: boolean,
): PlayerTrack[] => {
  const sourceObject = playlist.sources.deezer! as DeezerPlaylistSourceItemFull;

  return sourceObject.tracks.data.map((track) => ({
    source: canPlay ? 'deezer' : 'url',
    name: track.title,
    artists: [track.artist.name],
    albumTitle: track.album.title,
    duration: canPlay ? track.duration : 30,
    trackSource: canPlay ? {id: track.id} : {url: track.preview},
  }) as PlayerTrack);
};

export const mapPlaylistFromSpotify = (
  playlist: SearchedPlaylist,
  canPlay: boolean,
): PlayerTrack[] => {
  const sourceObject = playlist.sources.spotify! as SpotifyPlaylistSourceItemFull;

  return sourceObject.tracks.items.map(({track}) => ({
    source: canPlay ? 'spotify' : 'url',
    name: track.name,
    artists: track.artists.map(({name}) => name),
    albumTitle: track.album.name,
    duration: canPlay ? track.duration_ms / 1000 : 30,
    trackSource: canPlay ? {id: track.id} : {url: track.preview_url},
  }) as PlayerTrack);
};

