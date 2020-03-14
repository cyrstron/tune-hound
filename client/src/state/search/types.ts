import { DeezerTrack, DeezerSearchOptions } from "../deezer/types";
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
    deezer?: DeezerTrack;
    spotify?: SpotifyApi.TrackObjectFull;
  }
}

export interface SearchedAlbum {
  id: string;
  type: 'album';
  artists: string[];
  title: string;
  year: string;
  // tracks: Array<{
  //   name: string;
  //   duration: number;
  // }>;
  coverUrl: string;
  sources: {
    deezer?: any;
    spotify?: SpotifyApi.AlbumObjectSimplified;
  }
}

export interface SearchedArtist {
  id: string;
  type: 'artist';
  name: string;
  // tracks: Array<{
  //   name: string;
  //   duration: number;
  //   coverUrl: string;
  // }>;
  coverUrl: string;
  // albums: Array<{
  //   title: string;
  //   coverUrl: string;
  // }>;
  sources: {
    deezer?: any;
    spotify?: SpotifyApi.ArtistObjectFull;
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
    deezer?: any;
    spotify?: SpotifyApi.PlaylistObjectSimplified;
  }
}

export type SearchResult = SearchedTrack | SearchedAlbum | SearchedArtist | SearchedPlaylist;
