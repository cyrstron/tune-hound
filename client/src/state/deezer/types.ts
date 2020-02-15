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
  status: number;
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

export type DeezerResponseType = DeezerUser['type'];

export type DeezerUserResponse = DeezerApiResponse<DeezerUser>;