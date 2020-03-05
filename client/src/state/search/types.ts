import { DeezerTrack, DeezerSearchOptions } from "../deezer/types";
import { SpotifySearchOptions } from "../spotify/types";

export type SearchOptions = DeezerSearchOptions | SpotifySearchOptions;

export type SearchSource = 'deezer' | 'spotify';

export interface SearchedTrack {
  type: 'track';
  name: string;
  artist: string;
  album: string;
  year: string;
  coverUrl: string;
  duration: number;
  sources: {
    deezer?: DeezerTrack;
    spotify?: SpotifyApi.TrackSearchResponse;
  }
}

export interface SearchedAlbum {
  type: 'album';
  artist: string;
  title: string;
  year: string;
  tracks: Array<{
    name: string;
    duration: number;
  }>;
  coverUrl: string;
  sources: {
    deezer?: any;
    spotify?: SpotifyApi.AlbumSearchResponse;
  }
}

export interface SearchedArtist {
  type: 'artist';
  artist: string;
  title: string;
  year: string;
  tracks: Array<{
    name: string;
    duration: number;
    coverUrl: string;
  }>;
  albums: Array<{
    title: string;
    coverUrl: string;
  }>;
  sources: {
    deezer?: any;
    spotify?: SpotifyApi.ArtistSearchResponse;
  }
}

export interface SearchedPlaylist {
  type: 'playlist';
  title: string;
  year: string;
  tracks: Array<{
    name: string;
    duration: number;
    artist: string;
    coverUrl: string;
    album: string;
  }>;
  sources: {
    deezer?: any;
    spotify?: SpotifyApi.PlaylistSearchResponse;
  }
}

export type SearchResult = SearchedTrack | SearchedAlbum | SearchedArtist | SearchedPlaylist;
