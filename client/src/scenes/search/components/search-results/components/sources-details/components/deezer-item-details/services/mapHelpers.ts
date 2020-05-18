import {DeezerTrack, DeezerAlbum} from '@app/state/deezer/types';
import {TrackShort} from '@app/components/tracks';
import {AlbumShort} from '@app/components/albums';

export function mapDeezerTracks(tracks: Omit<DeezerTrack, 'album'>[]): TrackShort[] {
  return tracks.map(({
    title,
    artist: {name: artist},
    id,
  }) => ({
    id,
    title,
    artists: [artist],
  }));
}

export function mapDeezerAlbums(albums: DeezerAlbum[]): AlbumShort[] {
  return albums.map(({id, title, 'cover_medium': coverUrl}) => ({
    id,
    title,
    coverUrl,
    source: 'deezer',
  }));
}
