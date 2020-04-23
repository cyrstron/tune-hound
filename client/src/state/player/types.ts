import { SearchSource } from "../search/types";

export type PlayerSource = SearchSource | 'url';

export type PlayerTrack = {
  name: string;
  artists: string[];
  albumTitle: string;
  duration: number;
} & (
  {source: 'url', trackSource: {url: string}} |
  {source: 'deezer', trackSource: {id: number}} |
  {source: 'spotify', trackSource: {id: string}}
);