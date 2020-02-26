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
    links: string;
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

export type DeezerResponseType = DeezerUser['type'] | DeezerTrack['type'];

export type DeezerUserResponse = DeezerApiResponse<DeezerUser>;

export interface DeezerTrackSearchResult {
  data: DeezerTrack[],
  total: number;
  next: string;
};

export type DeezerSearchResult = DeezerTrackSearchResult;

export type DeezerTrackResponse = DeezerApiResponse<DeezerTrack>;
export type DeezerTrackSearchResponse = DeezerApiResponse<DeezerTrackSearchResult>;

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
  query: string;
  strict?: boolean;
  order?: DeezerSearchOrder;
  limit?: number;
  index?: number;
}

export interface DeezerAdvancedSearchOptions {
  artist?: string;
  album?: string;
  label?: string;
  durMin?: number;
  durMax?: number;
  bpmMin?: number;
  bpmMax?: number;
  [key: string]: string | number | undefined;
}

export type DeezerNamespaceSearchOptions = DeezerBasicSearchOptions;

export type DeezerTrackSearchOptions = DeezerBasicSearchOptions & 
  DeezerAdvancedSearchOptions & 
  {namespace: 'track'};

export type DeezerSearchOptions = DeezerNamespaceSearchOptions | DeezerTrackSearchOptions;