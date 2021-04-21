import { SearchSource } from '../../features/search/state/types';

export type PlayerSource = SearchSource | 'url';

export type PlayerTrack = {
  name: string;
  artists: string[];
  albumTitle: string;
  duration: number;
} & (
  | { source: 'url'; trackSource: { url: string } }
  | { source: SearchSource.DEEZER; trackSource: { id: number } }
  | { source: SearchSource.SPOTIFY; trackSource: { id: string } }
);

export const noRepeatMode = 'NO_REPEAT';
export const repeatAllMode = 'REPEAT_ALL';
export const repeatOneMode = 'REPEAT_ONE';

export enum RepeatMode {
  NO_REPEAT = 'NO_REPEAT',
  REPEAT_ALL = 'REPEAT_ALL',
  REPEAT_ONE = 'REPEAT_ONE',
}

export enum PlaylistType {
  TRACK = 'track',
  ALBUM = 'album',
  PLAYLIST = 'playlist',
}
