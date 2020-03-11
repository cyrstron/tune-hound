import { DeezerTrack, DeezerSearchOptions } from "../deezer/types";
import { SpotifySearchOptions } from "../spotify/types";

export type SearchOptions = DeezerSearchOptions | SpotifySearchOptions;

export type SearchSource = 'deezer' | 'spotify';

export interface SearchedTrack {
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
