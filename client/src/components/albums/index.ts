export {AlbumTile} from './components/album-tile';
export {AlbumTiles} from './components/album-tiles';

export interface AlbumShort {
  id: string | number;
  title: string;
  coverUrl: string;
  year?: number;
}