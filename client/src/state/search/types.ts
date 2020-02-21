import { DeezerTrack } from "../deezer/types";

export type SearchSource = 'deezer' | 'spotify';

export interface SearchResult {
  deezer?: DeezerTrack;
  spotify?: any;
}