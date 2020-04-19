export type SpotifySearchItemType = 'album' | 'artist' | 'playlist' | 'track';

export type SpotifyYearSearchTag = number | {
  from: number;
  to: number;
};

export interface SpotifyBasicAdvancedSearchQuery {
  and: string[],
  or?: string[],
  not?: string[],
}

export interface SpotifyTrackAdvancedSearchQuery extends SpotifyBasicAdvancedSearchQuery {
  artist?: string;
  album?: string;
  genre?: string;
  year?: SpotifyYearSearchTag;
  isrc?: string;
}

export interface SpotifyArtistAdvancedSearchQuery extends SpotifyBasicAdvancedSearchQuery {
  track?: string;
  album?: string;
  genre?: string;
  year?: SpotifyYearSearchTag;
}

export type SpotifySearchTagType = 'hipster' | 'new';

export interface SpotifyAlbumAdvancedSearchQuery extends SpotifyBasicAdvancedSearchQuery {
  artist?: string;
  track?: string;
  genre?: string;
  year?: SpotifyYearSearchTag;
  tag?: SpotifySearchTagType;
  upc?: string;
}

export interface SpotifyPlaylistAdvancedSearchQuery extends SpotifyBasicAdvancedSearchQuery {
  year?: SpotifyYearSearchTag;
}

export type SpotifyAdvancedSearchQuery = SpotifyTrackAdvancedSearchQuery
  | SpotifyArtistAdvancedSearchQuery
  | SpotifyPlaylistAdvancedSearchQuery
  | SpotifyAlbumAdvancedSearchQuery;

export interface SpotifyGeneralSearchOptions {
  query: string | SpotifyAdvancedSearchQuery;
  type: SpotifySearchItemType;
  market?: string;
  limit?: number;
  offset?: number;
  includeExternal?: boolean;
}

export interface SpotifyTrackSearchOptions extends SpotifyGeneralSearchOptions {
  type: 'track';
  query: string | SpotifyTrackAdvancedSearchQuery;
}

export interface SpotifyArtistSearchOptions extends SpotifyGeneralSearchOptions {
  type: 'artist';
  query: string | SpotifyArtistAdvancedSearchQuery;
}

export interface SpotifyAlbumSearchOptions extends SpotifyGeneralSearchOptions {
  type: 'album';
  query: string | SpotifyAlbumAdvancedSearchQuery;
}

export interface SpotifyPlaylistSearchOptions extends SpotifyGeneralSearchOptions {
  type: 'playlist';
  query: string | SpotifyPlaylistAdvancedSearchQuery;
}

export type SpotifySearchOptions = SpotifyTrackSearchOptions
  | SpotifyArtistSearchOptions
  | SpotifyAlbumSearchOptions
  | SpotifyPlaylistSearchOptions;
