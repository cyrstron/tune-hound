import { SearchSource } from '@app/features/search/search/types';

export { AlbumTile } from './components/album-tile';
export { AlbumTiles } from './components/album-tiles';

export interface AlbumShort {
  id: string | number;
  source: SearchSource;
  title: string;
  coverUrl: string;
  year?: number;
}
