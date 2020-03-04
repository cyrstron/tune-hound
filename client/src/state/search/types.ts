import { DeezerTrack, DeezerSearchOptions } from "../deezer/types";
import { SpotifySearchOptions } from "../spotify/types";

export type SearchOptions = DeezerSearchOptions | SpotifySearchOptions;

export type SearchSource = 'deezer' | 'spotify';

export interface SearchResult {
  deezer?: DeezerTrack;
  spotify?: any;
}