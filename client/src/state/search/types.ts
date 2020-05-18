import {DeezerTrack, DeezerSearchOptions, DeezerAlbum, DeezerArtist, DeezerPlaylist, DeezerTrackFull, DeezerAlbumFull, DeezerArtistFull, DeezerPlaylistFull} from '../deezer/types';
import {SpotifySearchOptions} from '../spotify/types';

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
  isCrossExtendable: true;
  isrc?: string;
  sources: {
    deezer?: DeezerTrackSourceItemShort | DeezerTrackSourceItemFull | null;
    spotify?: SpotifyTrackSourceItemShort | SpotifyTrackSourceItemFull | null;
  };
}

export interface SpotifyTrackSourceItemShort extends SpotifyApi.TrackObjectFull {
  isFull?: false;
}

export interface SpotifyTrackSourceItemFull extends SpotifyApi.TrackObjectFull {
  isFull: true;
}

export interface DeezerTrackSourceItemShort extends DeezerTrack {
  isFull?: false;
}

export interface DeezerTrackSourceItemFull extends DeezerTrackFull {
  isFull: true;
}

export interface SearchedAlbum {
  id: string;
  type: 'album';
  artists: string[];
  title: string;
  coverUrl: string;
  isCrossExtendable: true;
  upc?: string;
  sources: {
    deezer?: DeezerAlbumSourceItemShort | DeezerAlbumSourceItemFull | null;
    spotify?: SpotifyAlbumSourceItemShort | SpotifyAlbumSourceItemFull | null;
  };
}

export interface SpotifyAlbumSourceItemShort extends SpotifyApi.AlbumObjectSimplified {
  isFull?: false;
}

export interface SpotifyAlbumSourceItemFull extends SpotifyApi.AlbumObjectFull {
  isFull: true;
}

export interface DeezerAlbumSourceItemShort extends DeezerAlbum {
  isFull?: false;
}

export interface DeezerAlbumSourceItemFull extends DeezerAlbumFull {
  isFull: true;
}

export interface SearchedArtist {
  id: string;
  type: 'artist';
  name: string;
  coverUrl: string;
  isCrossExtendable: true;
  sources: {
    deezer?: DeezerArtistSourceItemShort | DeezerArtistSourceItemFull | null;
    spotify?: SpotifyArtistSourceItemShort | SpotifyArtistSourceItemFull | null;
  };
}

export interface SpotifyArtistSourceItemShort extends SpotifyApi.ArtistObjectFull {
  isFull?: false;
}

export interface SpotifyArtistSourceItemFull extends SpotifyApi.ArtistObjectFull {
  albums: SpotifyApi.AlbumObjectSimplified[];
  topTracks: SpotifyApi.TrackObjectFull[];
  isFull: true;
}

export interface DeezerArtistSourceItemShort extends DeezerArtist {
  isFull?: false;
}

export interface DeezerArtistSourceItemFull extends DeezerArtistFull {
  albums: {
    data: DeezerAlbum[];
    total: number;
  };
  topTracks: {
    data: DeezerTrack[];
    total: number;
  };
  isFull: true;
}

export interface SearchedPlaylist {
  id: string;
  type: 'playlist';
  title: string;
  coverUrl: string;
  author: {
    name: string;
  };
  tracksUrl: string;
  tracksTotal: number;
  isCrossExtendable: false;
  sources: {
    deezer?: DeezerPlaylistSourceItemShort | DeezerPlaylistSourceItemFull | null;
    spotify?: SpotifyPlaylistSourceItemShort | SpotifyPlaylistSourceItemFull | null;
  };
}


export interface SpotifyPlaylistSourceItemShort extends SpotifyApi.PlaylistObjectSimplified {
  isFull?: false;
}

export interface SpotifyPlaylistSourceItemFull extends SpotifyApi.PlaylistObjectFull {
  isFull: true;
}

export interface DeezerPlaylistSourceItemShort extends DeezerPlaylist {
  isFull?: false;
}

export interface DeezerPlaylistSourceItemFull extends DeezerPlaylistFull {
  isFull: true;
}

export type DeezerSourceItemShort = DeezerTrackSourceItemShort |
  DeezerAlbumSourceItemShort |
  DeezerArtistSourceItemShort |
  DeezerPlaylistSourceItemShort;

export type DeezerSourceItemFull = DeezerTrackSourceItemFull |
  DeezerAlbumSourceItemFull |
  DeezerArtistSourceItemFull |
  DeezerPlaylistSourceItemFull;

export type SpotifySourceItemShort = SpotifyTrackSourceItemShort |
  SpotifyAlbumSourceItemShort |
  SpotifyArtistSourceItemShort |
  SpotifyPlaylistSourceItemShort;

export type SpotifySourceItemFull = SpotifyTrackSourceItemFull |
  SpotifyAlbumSourceItemFull |
  SpotifyArtistSourceItemFull |
  SpotifyPlaylistSourceItemFull;

export type SourceItemShort = SpotifySourceItemShort | DeezerSourceItemShort;
export type SourceItemFull = SpotifySourceItemFull | DeezerSourceItemFull;

export type DeezerSourceItem = DeezerSourceItemShort | DeezerSourceItemFull;
export type SpotifySourceItem = SpotifySourceItemShort | SpotifySourceItemFull;

export type SourceItem = DeezerSourceItem | SpotifySourceItem;

export type SearchResult = SearchedTrack | SearchedAlbum | SearchedArtist | SearchedPlaylist;

export type SearchResultType = SearchResult['type'];
