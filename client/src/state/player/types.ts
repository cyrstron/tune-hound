import { SearchSource } from "../search/types";

export type PlayerSource = SearchSource | 'url';

export interface PlayerTrack {
  source: PlayerSource,
  name: string;
  artists: string[];
  albumTitle: string[];
  duration: number;
  trackSource: {id: string | number} | {url: string};
}