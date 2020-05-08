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

export const noRepeatMode = 'NO_REPEAT';
export const repeatAllMode = 'REPEAT_ALL';
export const repeatOneMode = 'REPEAT_ONE';

export type RepeatMode = typeof noRepeatMode | typeof repeatAllMode | typeof repeatOneMode;

export type PlaylistType = 'track' | 'album' | 'playlist';