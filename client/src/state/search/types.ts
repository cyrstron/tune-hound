import { DeezerTrack, DeezerSearchOptions, DeezerAlbum, DeezerArtist, DeezerPlaylist } from "../deezer/types";
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
    deezer?: DeezerTrackSourceItemShort | DeezerTrackSourceItemFull | null;
    spotify?: SpotifyTrackSourceItemShort | SpotifyTrackSourceItemFull | null;
  }
}

export type SpotifyTrackSourceItemShort = SpotifyApi.TrackObjectFull;

export interface SpotifyTrackSourceItemFull extends SpotifyApi.TrackObjectFull {
  isFull: true;
};

export type DeezerTrackSourceItemShort = DeezerTrack;

export interface DeezerTrackSourceItemFull extends DeezerTrack {
  isFull: true;
}

export interface SearchedAlbum {
  id: string;
  type: 'album';
  artists: string[];
  title: string;
  coverUrl: string;
  sources: {
    deezer?: DeezerAlbumSourceItemShort | DeezerAlbumSourceItemFull | null;
    spotify?: SpotifyAlbumSourceItemShort | SpotifyAlbumSourceItemFull | null;
  }
}

export type SpotifyAlbumSourceItemShort = SpotifyApi.AlbumObjectSimplified;

export interface SpotifyAlbumSourceItemFull extends SpotifyApi.AlbumObjectFull {
  isFull: true;
};

export type DeezerAlbumSourceItemShort = DeezerAlbum;

export interface DeezerAlbumSourceItemFull extends DeezerAlbum {
  isFull: true;
}

export interface SearchedArtist {
  id: string;
  type: 'artist';
  name: string;
  coverUrl: string;
  sources: {
    deezer?: DeezerArtistSourceItemShort | DeezerArtistSourceItemFull | null;
    spotify?: SpotifyArtistSourceItemShort | SpotifyArtistSourceItemFull | null;
  }
}

export type SpotifyArtistSourceItemShort = SpotifyApi.ArtistObjectFull;

export interface SpotifyArtistSourceItemFull extends SpotifyApi.ArtistObjectFull {
  albums: SpotifyApi.AlbumObjectSimplified[];
  topTracks: SpotifyApi.TrackObjectFull[];
  isFull: true;
};

export type DeezerArtistSourceItemShort = DeezerArtist;

export interface DeezerArtistSourceItemFull extends DeezerArtist {
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
  sources: {
    deezer?: DeezerPlaylistSourceItemShort | DeezerPlaylistSourceItemFull | null;
    spotify?: SpotifyPlaylistSourceItemShort | SpotifyArtistSourceItemFull | null;
  }
}


export type SpotifyPlaylistSourceItemShort = SpotifyApi.PlaylistObjectSimplified;

export interface SpotifyPlaylistSourceItemFull extends SpotifyApi.PlaylistObjectFull {
  isFull: true;
};

export type DeezerPlaylistSourceItemShort = DeezerPlaylist;

export interface DeezerPlaylistSourceItemFull extends DeezerPlaylist {
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
