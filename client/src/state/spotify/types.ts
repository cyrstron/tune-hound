export type SpotifyItemType = 'album' | 'artist' | 'playlist' | 'track';

// export type SpotifySearchQuery = 

export interface SpotifySearchOptions {
  query: any;
  type: SpotifyItemType[];
  market?: string;
  limit?: number;
  offset?: number;
  include_external?: 'audio';
}