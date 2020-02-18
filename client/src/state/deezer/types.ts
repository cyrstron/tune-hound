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

}

export type DeezerResponseType = DeezerUser['type'];

export type DeezerUserResponse = DeezerApiResponse<DeezerUser>;
export type DeezerTrackResponse = DeezerApiResponse<DeezerTrack>;
export type DeezerTrackSearchResponse = DeezerApiResponse<{
  data: DeezerTrack[],
}>;

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
  strict?: boolean;
  order?: DeezerSearchOrder;
  namespace: DeezerSearchNamespace;
  query: string;
  limit?: number;
  index?: number;
}

export interface DeezerAdvancedSearchOptions {
  artist?: string;
  album?: string;
  track?: string;
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