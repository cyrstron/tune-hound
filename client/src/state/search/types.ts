import { DeezerTrack, DeezerSearchOptions, DeezerAlbum, DeezerArtist } from "../deezer/types";
import { SpotifySearchOptions } from "../spotify/types";

export type SearchOptions = DeezerSearchOptions | SpotifySearchOptions;

export type SearchSource = 'deezer' | 'spotify';

export interface SearchedTrack {
  id: string;
  type: 'track';
  name: string;
  artists: string[];
  album: string;
  duration: number;
  coverUrl: string;
  sources: {
    deezer?: DeezerTrack | null;
    spotify?: SpotifyApi.TrackObjectFull | null;
  }
}

export interface SearchedAlbum {
  id: string;
  type: 'album';
  artists: string[];
  title: string;
  // tracks: Array<{
  //   name: string;
  //   duration: number;
  // }>;
  coverUrl: string;
  sources: {
    deezer?: DeezerAlbum | null;
    spotify?: SpotifyApi.AlbumObjectSimplified | null;
  }
}

export interface SearchedArtist {
  id: string;
  type: 'artist';
  name: string;
  coverUrl: string;
  sources: {
    deezer?: DeezerArtist | null;
    spotify?: SpotifyApi.ArtistObjectSimplified | null;
  }
}

export interface SearchedPlaylist {
  id: string;
  type: 'playlist';
  title: string;
  // tracks: Array<{
  //   name: string;
  //   duration: number;
  //   artist: string;
  //   coverUrl: string;
  //   album: string;
  // }>;
  sources: {
    deezer?: any | null;
    spotify?: SpotifyApi.PlaylistObjectSimplified | null;
  }
}

export type DeezerSearchItem = DeezerTrack | DeezerAlbum | DeezerArtist;

export type SpotifySearchItem = SpotifyApi.TrackObjectFull | 
  SpotifyApi.AlbumObjectSimplified | 
  SpotifyApi.ArtistObjectSimplified | 
  SpotifyApi.PlaylistObjectSimplified;

export type SearchItem = DeezerSearchItem | SpotifySearchItem;

export type SearchResult = SearchedTrack | SearchedAlbum | SearchedArtist | SearchedPlaylist;
