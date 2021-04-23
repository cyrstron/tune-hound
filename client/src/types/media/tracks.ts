import { MediaType } from './media';
import { MediaSource } from './sources';

export interface TrackShort {
  type: MediaType.TRACK;
  id: string;
  title: string;
  artists: string[];
  sourceIds: {
    [MediaSource.DEEZER]?: number;
    [MediaSource.SPOTIFY]?: string;
  };
  isExplicit?: boolean;
  urls?: {
    [MediaSource.DEEZER]?: string;
    [MediaSource.SPOTIFY]?: string;
  };
  duration?: number;
  playable?: {
    [MediaSource.DEEZER]?: boolean;
    [MediaSource.SPOTIFY]?: boolean;
  };
  previewUrls?: {
    [MediaSource.DEEZER]?: string;
    [MediaSource.SPOTIFY]?: string;
  };
}
