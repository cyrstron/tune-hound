export interface DeezerApiError {
  type: string;
  message: string;
  code: number;
}

export type DeezerApiResponse<TResult = any> = {error: DeezerApiError} | TResult;

export type DeezerExplicitLevel = 'explicit_display' | 'explicit_no_recommendation' | 'explicit_hide';

export interface DeezerUser {
  id: number;
  name: string;
  lastname: string;
  firstname: string;
  email: string;
  status: 0 | 1 | 2;
  birthday: string;
  inscription_date: string;
  gender: "F" | "M" | "";
  link: string;
  picture: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;  
  picture_xl: string;
  country: string;
  lang: string;
  is_kid: boolean;
  explicit_content_level: DeezerExplicitLevel;
  explicit_content_levels_available: DeezerExplicitLevel[];
  tracklist: string;
  type: "user";
}

export interface DeezerTrack {
  id: number;
  readable: boolean;
  title: string;
  title_short: string;
  title_version: string;
  link: string;
  duration: number;
  rank: number;
  explicit_lyrics: boolean;
  explicit_content_lyrics: number;
  explicit_content_cover: number;
  preview: string;
  artist: {
    id: number;
    name: string;
    link: string;
    picture: string;
    picture_small: string;
    picture_medium: string;
    picture_big: string;
    picture_xl: string;
    tracklist: string;
    type: 'artist';
  };
  album: {
    id: number;
    title: string;
    cover: string;
    cover_small: string;
    cover_medium: string;
    cover_big: string;
    cover_xl: string;
    tracklist: string;
    type: 'album';
  };
  type: 'track';
}

export interface DeezerAlbum {
  type: "album";
  id: number;
  title: string;
  link: string;
  cover: string;
  cover_small: string;
  cover_medium: string;
  cover_big: string;
  cover_xl: string;
  genre_id: number;
  nb_tracks: number;
  record_type: "album" | "single";
  tracklist: string;
  explicit_lyrics: boolean;
  artist: {
    id: 689
    name: string;
    link: string;
    picture: string;
    picture_small: string;
    picture_medium: string;
    picture_big: string;
    picture_xl: string;
    tracklist: string;
    type: "artist";
  };
}

export interface DeezerArtist {
  id: number;
  name: string;
  link: string;
  picture: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
  picture_xl: string;
  nb_album: number;
  nb_fan: number;
  radio: boolean;
  tracklist: string;
  type: "artist";
}

export interface DeezerPlaylist {
  id: number;
  title: string;
  public: boolean;
  nb_tracks: number;
  link: string;
  picture: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
  picture_xl: string;
  checksum: string;
  tracklist: string;
  creation_date: string;
  user: {
    id: 1535921546
    name:  string;
    tracklist: string;
    type: "user"
  };
  type: "playlist";
}

export type DeezerResponseType = DeezerUser['type'] | DeezerTrack['type'];

export type DeezerUserResponse = DeezerApiResponse<DeezerUser>;

export interface DeezerTrackSearchResult {
  data: Array<DeezerTrack>,
  total: number;
  next: string;
};

export interface DeezerAlbumSearchResult {
  data: Array<DeezerAlbum>,
  total: number;
  next: string;
};

export interface DeezerArtistSearchResult {
  data: Array<DeezerArtist>,
  total: number;
  next: string;
};

export interface DeezerPlaylistSearchResult {
  data: Array<DeezerPlaylist>,
  total: number;
  next: string;
};

export type DeezerSearchResult = DeezerTrackSearchResult | DeezerAlbumSearchResult | DeezerArtistSearchResult | DeezerPlaylistSearchResult;

export type DeezerTrackResponse = DeezerApiResponse<DeezerTrack>;

export type DeezerTrackSearchResponse = DeezerApiResponse<DeezerTrackSearchResult>;
export type DeezerAlbumSearchResponse = DeezerApiResponse<DeezerAlbumSearchResult>;
export type DeezerArtistSearchResponse = DeezerApiResponse<DeezerArtistSearchResult>;
export type DeezerPlaylistSearchResponse = DeezerApiResponse<DeezerPlaylistSearchResult>;

export type DeezerSearchResponse = DeezerTrackSearchResponse |
  DeezerAlbumSearchResponse |
  DeezerArtistSearchResponse |
  DeezerPlaylistSearchResponse;

export type DeezerSearchNamespace = 'album' |
  'artist' |
  'history' |
  'playlist' |
  'radio' |
  'track' |
  'user';

export type DeezerSearchOrder =  'RANKING' |
  'TRACK_ASC' |
  'TRACK_DESC' | 
  'ARTIST_ASC' | 
  'ARTIST_DESC' | 
  'ALBUM_ASC' | 
  'ALBUM_DESC' | 
  'RATING_ASC' | 
  'RATING_DESC' | 
  'DURATION_ASC' | 
  'DURATION_DESC';

export interface DeezerBasicSearchOptions {
  namespace: DeezerSearchNamespace;
  strict?: boolean;
  order?: DeezerSearchOrder;
  limit?: number;
  index?: number;
}

export interface DeezerAdvancedQueryParams {
  track?: string;
  artist?: string;
  album?: string;
  label?: string;
  durMin?: number;
  durMax?: number;
  bpmMin?: number;
  bpmMax?: number;
  [key: string]: string | number | undefined;
}

export type DeezerNamespaceSearchOptions = DeezerBasicSearchOptions & {query: string} & {
  namespace: 'history' | 'playlist' | 'radio' | 'user';
};

export type DeezerAdvancedTrackQueryParams = DeezerAdvancedQueryParams;

export type DeezerAdvancedTrackSearchOptions = DeezerBasicSearchOptions & 
  {query: DeezerAdvancedTrackQueryParams} & 
  {namespace: 'track'};

export type DeezerAdvancedAlbumQueryParams = Omit<DeezerAdvancedQueryParams, 'track'>;

export type DeezerAdvancedAlbumSearchOptions = DeezerBasicSearchOptions & 
  {query: DeezerAdvancedAlbumQueryParams} & 
  {namespace: 'album'};

export type DeezerAdvancedArtistQueryParams = {artist?: string};

export type DeezerAdvancedArtistSearchOptions = DeezerBasicSearchOptions & 
  {query: DeezerAdvancedArtistQueryParams} & 
  {namespace: 'artist'};

export type DeezerAdvancedSearchOptions = DeezerAdvancedTrackSearchOptions | 
DeezerAdvancedAlbumSearchOptions | 
DeezerAdvancedArtistSearchOptions;

export type DeezerSearchOptions = DeezerNamespaceSearchOptions | DeezerAdvancedSearchOptions;
